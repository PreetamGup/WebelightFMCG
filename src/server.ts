import express from 'express';
import bodyParser from 'body-parser';
import connectDb from './config/dbConnection';
import userRoutes  from './routes/userRoutes';
import productRoutes from './routes/productRoutes'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

connectDb();


app.use("/users", userRoutes)
app.use("/products", productRoutes)



app.listen(3000,()=>{
    console.log("sever running.....")
})
