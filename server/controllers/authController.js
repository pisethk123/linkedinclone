import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { loginEmail, sendWelcomeEmail } from "../libs/mailtrap.js"

const signup = async(req, res) => {
    try {
        const {name, username, email, password} = req.body

        if(!name, !username, !email, !password) return res.status(400).json({message: "all fields is required"})

        const emailExist = await User.findOne({email})
        if(emailExist) return res.status(400).json({message: "email already exist"})

        const usernameExist = await User.findOne({username})
        if(usernameExist) return res.status(400).json({message: "username already exist"})

        if(password.length < 6) return res.status(400).json({message: "password must be at least 6 characters"})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({name, email, password: hashedPassword, username})
        await  user.save()

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '3d'
        })

        res.cookie("linkedinclone", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 100,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json(user)

        const profileUrl = "http://localhost:5173/profile" + user.username
        
        try {
            await sendWelcomeEmail(user.email, user.name, profileUrl)
        } catch (error) {
            console.log(error.message)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body 
        if(!email, !password) return res.status(400).json({message: "all fields are required"})

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "invalid email"})

        const passwordVerified = await bcrypt.compare(password, user.password)
        if(!passwordVerified) return res.status(400).json({message: "Invalid password"}) 

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '3d'
        })

        res.cookie("linkedinclone", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 100,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json(user)

        const profileUrl = "http://localhost:5173/profile" + user.username
        
        try {
            await loginEmail(email, user.name, profileUrl)
        } catch (error) {
            console.error(error.message)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const logout = async(req, res) => {
    res.clearCookie("linkedinclone")
    res.json({message: "Logged out successfully"})
}

export {
    signup,
    login,
    logout,
}