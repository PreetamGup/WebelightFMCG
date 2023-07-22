import * as mongoose from 'mongoose';

import {Model} from 'mongoose';


type userType= UserModel & mongoose.Document

export interface UserModel{
    name: {
        type:String,
        required:true,
    };

    email: {
        type:String,
        required:true,
    };

    password: {
        type:String,
        required:true,
    },

    isAdmin:{
        type:Boolean,
        default:false,
    }

}

const UserSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },
    
    isAdmin:{
        type:Boolean,
        default:false,
    }
  
})

const User: Model<userType> = mongoose.model<userType>('users', UserSchema)

export default User
