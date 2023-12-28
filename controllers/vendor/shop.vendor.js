const { Category } = require("../../models/Categories.model")

exports.getCategory= async (req,res)=>{
    try {
         const resp  = await Category.find({})
       res.status(200).json(resp)
    } catch (error) {
        
        res.status(500).json({message:"Server error !"})
    }
}

exports.postProduct = async (req,res)=>{
    try {
        // const resp= await 
    } catch (error) {
        
        res.status(500).json({message:"Server error !"})
    }
}