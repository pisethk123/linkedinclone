import User from "../models/User.js"
import cloudinary from "../libs/cloudinary.js"

export const getCurrentUser = async(req, res) => {
    try {
        const users = req.user
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getSuggestedConnections = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id).select("connections")
        const suggestionsUsers = await User.find({
            _id: {$ne: req.user._id, $nin: currentUser.connections}
        }).select("name username profilePicture headline").limit(3)
        res.status(200).json(suggestionsUsers)
    } catch (error) {
        console.error(error.message)
    }
}

export const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username}).select("-password")
        if(!user) return res.status(404).json({message: "User not found"})
        res.status(200).json(user)
    } catch (error) {
        console.error(error.message)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")

        user.name = req.body.name || user.name
        user.headline = req.body.headline || user.headline
        user.about = req.body.about || user.about
        user.location = req.body.location || user.location
        user.skill = req.body.skill || user.skill
        user.experience = req.body.experience || user.experience
        user.education = req.body.education || user.education

        if(req.file.profilePicture) {
            const result = await cloudinary.uploader.upload(req.body.profilePicture)
            user.profilePicture = result.secure_url
        }

        if(req.body.bannerImage) {
            const result = await cloudinary.uploader.upload(req.body.bannerImage)
            user.bannerImage = result.secure_url
        }

        user.save()
        res.status(200).json(user)
    } catch (error) {
        console.error(error.message)
    }
}