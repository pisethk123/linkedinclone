import express from 'express'
import { authentication } from '../middlewares/authMiddleware.js';
import { 
    acceptConnection, 
    getConnections, 
    getConnectionStatus, 
    getUserConnections, 
    rejectConnection, 
    removeConnection, 
    sendConnection 
} from '../controllers/connectionController.js';

const router = express.Router()

router.post("/request/:userId", authentication, sendConnection);
router.put("/accept/:requestId", authentication, acceptConnection);
router.put("/reject/:requestId", authentication, rejectConnection);
// Get all connection requests for the current user
router.get("/requests", authentication, getConnections);
// Get all connections for a user
router.get("/", authentication, getUserConnections);
router.delete("/:userId", authentication, removeConnection);
router.get("/status/:userId", authentication, getConnectionStatus);

export default router