const { Category } = require("../../models/Categories.model");
const { Product } = require("../../models/Product.model");
const cloudinary = require("../../helpers/cloudinary.helper");

// get all cetegories
exports.getCategory = async (req, res) => {
  try {
    const resp = await Category.find({});
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ message: "Server error !" });
  }
};

// add product
exports.createProduct = async (req, res) => {
  try {
    const { description, name, price, stock, category, owner } = req.body;
    console.log(req.body);
    if (!description || !name || !category || !owner) {
      return res
        .status(400)
        .json({
          message: "Description or Name or category or owner is missing ",
        });
    }
    const productImage = req.file.path;
    const imageUploadResult = await cloudinary.uploader.upload(productImage);
console.log(imageUploadResult.public_id);
    const respProductData = await Product.create({
      description,
      name,
      price,
      stock,
      category,
      owner,
    image_id:imageUploadResult.public_id,
      productImage: imageUploadResult?.secure_url,
    });
    res.status(201).json({message: `${respProductData.name} uploaded successfully ! `,data: {
    name:  respProductData.name,
    price:  respProductData.price,
    stock:  respProductData.stock,
    vendorDetail:{
      category:  respProductData.category,
      owner:  respProductData.owner

    },
},image:{
      imageUrl : respProductData.productImage,
      image_id : respProductData.image_id
    }});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//get all products

exports.getProduct = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const resp = await Product.find({ owner: ownerId });
    if (resp.length === 0 || !resp) {
      return res.status(200).json({ message: "No Products available " });
    }
    res.status(201).json({ data: resp });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// delete  product

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(200).json({ message: "Data unavailable to delete!" });
    }
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
console.log(product);
    const publicId = product.image_id
    console.log(publicId);
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    });

    const deletedProduct = await Product.findOneAndDelete({ _id: productId });

    return res.status(200).json({ message: "Product deleted successfully!", data: deletedProduct });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


exports.getCategoryById=async (req,res)=>{
  try {
    const {categoryId} = req.params
    if (!categoryId) {
      return     res.status(400).json({ message: "Please give a category!"});
    }
    const category = await Category.findOne({_id:categoryId})
    if (!category) {
      return     res.status(400).json({ message: "No category available !"});
      
    }
    res.status(200).json({category:category.category})
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}  

