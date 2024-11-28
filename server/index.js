import express from 'express'
import env from 'dotenv'
import authRoute from './routes/authRoute.js'
import MongoDBConnect from './libs/db.js'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
import notificationRoute from './routes/notificationRoute.js'
import connectionRoute from './routes/connectionRoute.js'
import cors from "cors"

env.config()
MongoDBConnect()

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_SIDE_URL,
    credentials: true,
}))

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/post", postRoute)
app.use("/api/notification", notificationRoute)
app.use("/api/connection", connectionRoute)

app.listen(port, () => console.log('server is running on port ' + port))
