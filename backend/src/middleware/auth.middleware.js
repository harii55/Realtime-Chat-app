import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const protectRoute = async (req, res, next) => {
    try {
        
        // Get the JWT token from the cookies(jwt is the name of the cookie that gave before)
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized -No token provided" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized -Invalid token" });
        }

        // Find the user from DB by ID from the decoded token
        const user = await User.findById(decoded.userId).select("-password"); // Exclude the password from sharing back to the client

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach the user to the request object for use in the next middleware or route handler
        next(); // Call the next fn (middleware or route handler whatever in the parameter)


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}