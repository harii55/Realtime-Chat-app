import express from "express";
import { signup, logout, login } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateProfilePic } from "../controllers/auth.controllers.js";
import { checkAuth } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

//allow user to update only their profile pic

router.put('/update-profile', protectRoute , updateProfilePic);

//to be able to update the profile pic, we need to protect the route first
//that make sure that the user is logged in and has a valid JWT token
//and then we can use the next fn to update the profile pic

router.get('/check-auth', protectRoute, checkAuth);





export default router;

// here router is getteing imported as authRoutes in index.js file
// and then used in app.use() method



