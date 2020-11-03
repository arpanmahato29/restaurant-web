const Product = require('../models/product');
const formidable = require('formidable');
const _  = require('lodash');
const fs = require('fs');

exports.getProductById = (req,res,next,id) => {
  Product.findById(id)
  .populate("category restaurant")
  .exec((error,product) => {
    if(error){
      return res.status(400).json({
        error: "Product not found"
      });
      
    }
    req.product = product;
    next();
  })
}

exports.createProduct = (req,res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (error,fields,file) => {
    if(error) {
      return res.status(400).json({
        error: 'problem with image'
      })
    }
    const {name, description, price, category,stock} = fields;

    if(!name ||
      !description ||
      !price ||
      !category ||
      !stock
      ) {
        return res.status(400).json({
          error: "Please provide all the data mentioned"
        });
      }

      let product = new Product(fields);
      product.owner = req.profile._id;
      product.restaurant = req.restaurant._id;

      //handle file
      if(file.photo) {
        if(file.photo.size > 3000000){
          return res.status(400).json({
            error: "File size too big. File should be less than 3MB"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }

      //save to datatbase;
      product.save((error,product) => {
        if(error) {
          return res.status(400).json({
            error: "Cannot save in database"
          })
        }
        res.json(product);
      })
  })
}

exports.getProduct = (req,res) => {
  req.product.photo = undefined;
  return res.json(req.product);
}

//middleware
exports.photo = (req,res,next) => {
  if(req.product.photo.data) {
    res.set("Content-Type",req.profile.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
}

exports.removeProduct = (req,res) => {  
  const _userId = req.profile._id + '';
  const owner = req.product.owner + '';

  if(owner !== _userId){
    return res.status(400).json({
      error: "You dont have access"
    })
  }

  Product.findByIdAndRemove(
    {_id: req.product._id},
    (error, product) =>{
      if(error){
        return res.status(400).json({
          error: "Cannot delete product"
        });
      }
      res.json({
        msg: "Successfully deleted"
      })
    }
  )
}

exports.updateProduct = (req,res) => {
  const _userId = req.profile._id + '';
  const owner = req.product.owner + '';
  if(_userId !== owner){
    return res.status(400).json({
      error: 'No Access to change'
    })
  }

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (error, fields, file) => {
    if(error){
      return res.status(400).json({
        error: 'problem with image'
      });
    }
    //fields updation
    let product = req.product;
    product = _.extend(product,fields);

    //handle file 
    if(file.photo){
      if(file.photo.size > 3000000){
        return res.status(400).json({
          error: 'File size too big. File should be less than 3MB'
        })
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;

    }

    product.save((error,product) => {
      if(error){
        return res.status(400).json({
          error: 'PRODUCT UPDATION FAILED'
        });
      }
      res.json(product);
    })
  })
}

exports.getAllProducts = (req,res) => {
  //TODO: add sort method to sort by category 
  Product.find(
    {restaurant: req.restaurant._id}
  )
  .select('-photo')
  .populate('category restaurant')
  .exec((error,products) => {
    if(error){
      return res.status(400).json({
        error: 'NO PRODUCTS FOUND'
      });
    }
    res.json(products);
  })
}

exports.updateStock = (req,res,next) => {
  let bulkWriteOperataion = req.body.order.product.map(product =>{
    return{
      updateOne:{
        filter:{_id:product._id},
        update:{$inc:{stock:-product.count, sold:+product.count}}
      }
    }
  })
  Product.bulkWrite(bulkWriteOperataion,
    {},
    (error, products) => {
      if(error){
        return res.status(400).json({
          error: 'Bulk operation failed'
        })
      }
      next();
    } )
}



//TODO: add product search code here

