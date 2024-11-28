import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authentication = async (req, res, next) => {
    try {
        const token = req.cookies["linkedinclone"]
        if(!token) return res.status(401).json({message: "Unauthenticated - No token is provided"})

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifiedToken) return res.status(401).json({message: "Unauthenticated - Invalid token"})

        const user = await User.findById(verifiedToken.userId).select("-password")
        if(!user) return res.status(401).json({message: "Unauthenticated - No user found"})
        
        req.user = user
        next()
    } catch (error) {
        console.error(error.message)
    }
}

export const authorization = async (req, res, next) => {
    
}