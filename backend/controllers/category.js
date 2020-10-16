const Category = require('../models/category');
const User = require('../models/user')
exports.getCategoryById = (req,res,next,id) => {
  Category.findById(id)
  .exec((error,category) => {
    if(error){
      return res.status(400).json({
        error: "Category not found in DB"
      })
    }
    req.category = category;
    next();
  })
}

exports.createCategory = (req,res) => {
  const category = new Category(req.body);
  //console.log(req)
  category.owner = req.profile._id;
  category.save((error,category) => {
    if(error){
      return res.status(400).json({
        error: "Not able to save category in DB"
      })
    }
    res.json({category});
  })
}

exports.getCategory = (req,res) => {
  return res.json(req.category);
}

exports.getAllCategories = ( req,res) => {
  Category.find()
  .exec((error,categories) => {
    if(error){
      return res.status(400).json({
        error: " No Categories found"
      })
    }
    res.json(categories)
  })
}

exports.getSelectedCategories = (req,res) => {
  Category.find({owner:req.profile._id})
  .exec((error, categories) => {
    if(error){
      return res.status(400).json({
        error: "No Categories found"
      })
    }
    res.json(categories)
  })
}

exports.updateCategory = (req,res) => {
  
  if(req.category.owner !== req.profile._id){
    return res.status(400).json({
      error: "You dont have access"
    })
  }
  category.name = req.body.name;

  category.save((error, updatedCategory) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to update category"
      });
    }
    res.json(updatedCategory);
  });
  
}

exports.removeCategory = (req,res) => {
  if(req.category.owner !== req.profile._id){
    return res.status(400).json({
      error: "You dont have access"
    })
  }
  Category.findOneAndRemove(
    {_id: req.category._id},
    (error,category) => {
      if(error){
        return res.status(400).json({
          error: "Cannot delete category"
        });
      }
      res.json({
        msg: "Successfully deleted"
      })
  })
}