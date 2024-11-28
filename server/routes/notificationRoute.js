import express from "express";
import { authentication } from "../middlewares/authMiddleware.js";
import { deleteNotification, getUserNotification, markNotificationAsRead } from "../controllers/notificationController.js";

const router = express.Router()

router.get("/", authentication, getUserNotification)
router.put("/:id/read", authentication, markNotificationAsRead)
router.delete("/:id", authentication, deleteNotification)

export default router