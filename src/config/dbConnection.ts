import db from 'mongoose'


async function connectDb (){
    try {
        await db.connect("mongodb://127.0.0.1:27017/Webelight")
        console.log("Database Connected")
    } catch (error) {
      console.log(error)  
    }
}

export= connectDb