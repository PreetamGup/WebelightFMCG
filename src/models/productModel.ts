import * as mongoose from 'mongoose';

import {Model} from 'mongoose';


type productType= ProductModel & mongoose.Document

export interface ProductModel{
    productName: {
        type:String,
        required:true,
    };

    price: {
        type:Number,
        required:true,
    };

    category: {
        type:String,
        required:true,
    },

   

}

const ProductSchema= new mongoose.Schema({
    productName:{
        type: String,
        required: true,
    },

    price:{
        type: Number,
        required: true,
    },

    category:{
        type: String,
        enum:["Drinks", "Personal care", "Home care","Confectionery","Tobacco Product","Cosmetics","Bakery Products", "Fresh food"],
        default:"Home care",
        required: true,
        
    },
  
})

const Product: Model<productType> = mongoose.model<productType>('products', ProductSchema)

export default Product
