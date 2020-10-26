const Category = require('../models/category');

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

exports.updateCategory = (req,res) => {
  
  Category.findOneAndUpdate(
    {_id: req.category._id},
    {name: req.body.name},
    (error, updatedCategory) => {
      if(error){
        return res.status(400).json({
          error: 'FAILED TO UPDATE CATEGORY'
        });
      }
      res.json(updatedCategory);
    }
  )
  
}

exports.removeCategory = (req,res) => {
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