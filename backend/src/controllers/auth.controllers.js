import User from "../models/user.model.js";
import { generateToken } from "../utils/utils.js";
import bcrypt from "bcryptjs";



export const signup = async (req, res) => {

    const { email, fullName, password } = req.body;
    // Validate the input data
    
    try {
        if (!email || !fullName || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        // Check if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        //password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Check if the user already exists
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        // Create a new user
        const newUser = new User({
           email,
           fullName,
           password: hashedPassword
        });
      
        if (newUser) {
            //generate jwt token 
            generateToken(newUser._id, res); //this is how mongodb generate the id for user _id
            console.log("here")
            await newUser.save(); //save the user to the database
          
            // Send the response with the user data (excluding the password)   
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic,
            });
            
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }


}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Check if the user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if the password is correct
        
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // If the user is found and the password is correct, generate a JWT token
        generateToken(user._id, res); 

        // Send the response with the user data (excluding the password)   
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
        });
        
    }catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = (req, res) => {
    // Clear the JWT token by setting the cookie to expire immediately
    
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
        
    } catch (error) {
        console.log("error in logout");
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const updateProfilePic = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Progile pic is required" });
        }

        // Upload the profile picture to Cloudinary (cloudinary will give response with the url of the image)
        const uploadResponse = await cloudinary.uploader.upload(profilePic);


        // Find the user by ID and update the profile picture
        // The `new: true` option returns the updated user's document
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });

        res.status(200).json(updatedUser);
            
    } catch (error) {
        console.log("error in update profile pic");
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });    
    }
 }

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user); //req.user is set in the protectRoute middleware: so while using this fn we will have user in req.user[if it is logged in]
    } catch (error) {
        console.log("error in check auth");
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
