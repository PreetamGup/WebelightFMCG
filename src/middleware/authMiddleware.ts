import { Response, Request,NextFunction } from "express";
const JWT = require('jsonwebtoken');


const JWT_SECRET:String= "webelight1234564"

const authMiddleware= async(req:Request,res:Response,next:NextFunction)=>{
  
   try {
    const token = req.headers.authorization!.split(" ")[1];
    const decode=JWT.verify(token,JWT_SECRET);
    req.body.user = decode
    next();  
   } 
   catch (error) {
     res.status(401).send({
        message:'Auth Failed',
        success: false
     })
   }
}

export default authMiddleware