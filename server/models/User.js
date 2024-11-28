import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    bannerImage: {
        type: String,
        default: "" 
    },
    headline: {
        type: String,
        default: "Linkedin user"
    },
    location: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: ""
    },
    skill: [String],
    experience: [
        {
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String
        }
    ],
    education: [
        {
            school: String,
            fieldOfStudy: String,
            startYear: Number,
            endYear: Number
        }
    ],
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {timestamps: true})

export default mongoose.model("User", userSchema)