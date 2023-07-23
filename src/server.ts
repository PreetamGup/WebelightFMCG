import express from 'express';
import bodyParser from 'body-parser';
import connectDb from './config/dbConnection';
import userRoutes  from './routes/userRoutes';
import productRoutes from './routes/productRoutes'
import dotenv from 'dotenv'
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
dotenv.config();

connectDb();



app.use("/users", userRoutes)
app.use("/products", productRoutes)

const swaggerOptions = require('../src/swagger.json');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions));




app.listen(3000,()=>{
    console.log("sever running.....")
})
