import Notification from "../models/Notification.js"

export const getUserNotification = async (req ,res) => {
    try {
        const notifications = await Notification.find({recipient: req.user._id}).sort({createdAt: -1})
            .populate("relatedUser", "name username profilePicture")
            .populate("relatedPost", "content image")
        
        res.status(200).json(notifications)
    } catch (error) {
        console.error(500).json(error.message)
    }
}

export const markNotificationAsRead = async (req ,res) => {
    try {
        const notificationId = req.params.id
        const notification = await Notification.findByIdAndUpdate(
            {_id: notificationId, recipient: req.user._id},
            {read: true}, {new: true}
        )

        res.json(notification)
    } catch (error) {
        console.error(500).json(error.message)
    }
}

export const deleteNotification = async (req ,res) => {
    
}