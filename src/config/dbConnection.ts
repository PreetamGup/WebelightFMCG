import db from 'mongoose'

const connectionURL= process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/Webelight"

async function connectDb (){
    try {
        await db.connect(connectionURL)
        console.log("Database Connected")
    } catch (error) {
      console.log(error)  
    }
}

export= connectDb