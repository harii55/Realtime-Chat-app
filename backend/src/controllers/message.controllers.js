import User from "../models/user.model.js";
import Message from "../models/message.model.js"

export const getUsersForSidebar = async (req, res) => { 
    try {
    
        const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request object
        // Fetch all users except the logged-in user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
            "-password -__v"
        );

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const getMessagesForChat = async (req, res) => {
    try {
        const { id: userToChatId } = req.params; //from the url chat id
        const myId = req.user._id;  

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
                
            ]
        })
        
        //$or operator is used to match documents where at least one of the conditions inside the $or array is true.
        //i.e fetch all the messages in both the cases 

        
    }catch (error) {
        console.error("Error fetching messages for chat:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }   
}

export const sendMessage = async (req, res) => {
    try {

        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageurl;

        if (image) {
            //Upload base64 image to Cloudinary
            const uploadResponse = await clodinary.uploader(image);
            imageurl = uploadResponse.secure_url;

        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageurl,
        });

        await newMessage.save();

        //todo: functionality for real time => socket.io
        
        res.status(201).json(newMessage);
        
    } catch (err) {
        console.log(err.message);
    }
}