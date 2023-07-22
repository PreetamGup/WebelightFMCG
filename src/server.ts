import express from 'express';
import bodyParser from 'body-parser';
import connectDb from './config/dbConnection';
import  userRoutes  from './routes/userRoutes';
import dotenv from 'dotenv'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
dotenv.config()

connectDb();


app.use("/users", userRoutes)


app.listen(3000,()=>{
    console.log("sever running.....")
})
