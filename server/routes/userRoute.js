import express from "express"
import { authentication } from "../middlewares/authMiddleware.js"
import { 
    getCurrentUser,
    getSuggestedConnections,
    getPublicProfile,
    updateProfile
} from "../controllers/userController.js"

const router = express.Router()

router.get("/me", authentication, getCurrentUser)
router.get("/suggestions", authentication, getSuggestedConnections)
router.get("/:username", authentication, getPublicProfile)
router.put("/profile", authentication, updateProfile)

export default router