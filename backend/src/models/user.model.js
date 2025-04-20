import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            miniLength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
    },

    {
        timestamps: true
    });   


const User = mongoose.model("User", userSchema);
//User is the name that we pass from here,but the name of the collection in the database will be users
// mongoose will automatically create a collection named "users" in the database


export default User;
// The user model is used to create a new user in the database with the required fields
// and the timestamps option is used to automatically add createdAt and updatedAt fields to the user document.
