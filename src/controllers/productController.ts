import Product from "../models/productModel"
import { Response, Request } from "express"

const getAllProduct= async(req:Request, res:Response)=>{
  try {
    const allProduct = await Product.find({})

    return res.status(200).json({
      message:"All product fetched succefully",
      success:true,
      allProduct, 
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Fetching all Product failed ${error}`,
    })
    
  }

}


const getProductDetails= async(req:Request, res:Response)=>{
  try {
    const customerId=req.params.id
    const customerDetails = await Product.findById(customerId)

    return res.status(200).json({
      message:"product detail fetched succefully",
      customerDetails,
      success:true,
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Fetching Product detail failed ${error}`,
    })
    
  }

}



const addNewProduct = async (req:Request, res:Response)=>{

  try {

    const existedProduct = await Product.findOne({ productName: req.body.productName});
    if (existedProduct) {
      return res.status(200).send({
        message: "Proudct already exists",
        success: false,
      });
    }


    const newProduct = new Product(req.body)
    await newProduct.save();

   return res.status(201).json({
      message: "New Producg Added Successfully",
      success: true,
    })

  } catch (error) {
    console.log(error)

  return res.status(400).json({
      success: false,
      message: `Product creation is failed ${error}`,
    })
  }
}


const updateProduct = async(req:Request, res:Response)=>{

  try {
   const productId= req.params.id
   const response= await Product.updateOne({_id:productId}, req.body)
   if(response.modifiedCount===1){

    return  res.status(200).json({
      message:"Product Update Successfully",
      success: true
    })
   }
   else{

    return res.status(400).json({
      message:"Product Not Exists",
      success: false
    })

   }
    
  } catch (error) {
    console.log(`Update error ${error}`)
    return res.status(500).json({
      message:`Update Error ${error}`,
      success: false
    })
  }

}

const deleteProduct= async(req:Request, res:Response)=>{
  
  try {
    const cusId= req.params.id
    const response= await Product.deleteOne({_id:cusId})
    
    if(response.deletedCount===1){

      return res.status(200).json({
        message:"Product Details Deleted",
        success: true
      })
    }
    else{

      return res.status(404).json({
        message:"Product Not Exists",
        success: false
      })

    }

  } catch (error) {
    console.log(`Delete error ${error}`)
    return res.status(404).json({
      message:"Deleteing error",
      success: false
    })
  }

}


module.exports={addNewProduct, getProductDetails, getAllProduct, updateProduct, deleteProduct}