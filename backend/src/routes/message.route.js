import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessagesForChat } from "../controllers/message.controllers.js";
import { getUsersForSidebar } from "../controllers/message.controllers.js";
import { sendMessage } from "../controllers/message.controllers.js";


const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessagesForChat);
router.post("/send/:id", protectRoute, sendMessage);




export default router;

