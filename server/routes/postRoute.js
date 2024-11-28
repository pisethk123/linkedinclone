import express from 'express'
import { authentication } from '../middlewares/authMiddleware.js'
import { createComment, createPost, deletePost, getFeedPost, getPostById, likePost } from '../controllers/postController.js'

const router = express.Router()

router.get("/", authentication, getFeedPost)
router.post("/create", authentication, createPost)
router.delete("/delete/:id", authentication, deletePost)
router.get("/:id", authentication, getPostById)
router.post("/:id/comment", authentication, createComment)
router.post("/:id/like", authentication, likePost)

export default router