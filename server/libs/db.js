import mongoose from "mongoose"

const MongoDBConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default MongoDBConnect