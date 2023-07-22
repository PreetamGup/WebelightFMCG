import { Response, Request,NextFunction } from "express";
import User from "../models/userModel";

const isAdminMiddleware= async(req:Request,res:Response,next:NextFunction)=>{
  
   try {
    const id= req.body.user.id
    const user = await User.findById(id)

    if(user?.isAdmin){
        next(); 

    }else{
        res.status(401).json({
            message:'Only admin can access',
            success: false
        })
    }
    
   } 
   catch (error) {
     res.status(401).json({
        message:'Auth Failed',
        success: false
     })
   }
}

export default isAdminMiddleware