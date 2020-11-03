const User = require('../models/user');
const Order = require('../models/order');
const formidable = require('formidable');
const _  = require('lodash');
const fs = require('fs');

exports.getUserById = (req,res,next,id) => {
  User.findById(id)
  .exec((error,user) => {
    if(error || !user){
      return res.status(400).json({
        error: "No such User found in DB"
      });
    }
    user.salt = undefined;
    user.encry_password = undefined;
    user.photo = undefined;
    req.profile = user;
    next();
  })
}

exports.getUser = (req,res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
}

exports.updateUser = (req,res) => {
  console.log(req.body)
  User.findByIdAndUpdate(
    {_id:req.profile._id},
    {$set: req.body},
    {new:true, useFindAndModify: true},
    (error, user) => {
      if(error){
        return res.status(400).json({
          error: "Not Authorized to Update this USER"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  )
}

exports.removeUser = (req,res,next) => {
  User.findOneAndRemove(
    {_id: req.profile._id},
    (error,user) => {
      if(error){
        return res.status(400).json({
          error: "Cannot delete user"
        })
      }
      next();
    }
  )

}

exports.userPurchaseList = (req,res) => {
  console.log()
  Order.find(
    {user: req.profile._id}
  ).exec((error, orders) => {
    if(error){
      return res.status(400).json({
        error: 'No order in this account'
      })
    }
    return res.json(orders);
  })
}

exports.pushIntoUserOrderList = (req,res,next) =>{
  User.findOneAndUpdate(
    {_id:req.profile._id},
    {$push:{orders:req.body.order}},
    {new:true},
    (error,purchases) => {
      if(error){
        return res.status(400).json({
          error: 'Unable to save purchase list'
        })
      }
    }
  )
  res.json(req.body.order);
}

exports.updateProfileImage = (req,res)=>{
  
}

exports.getUserAddress = (req,res) => {
  User.findOne({_id:req.profile.id})
  .exec((error,user) =>{
    if(error){
      return res.status(400).json({
        error: 'Cannot get the address at this time. Try again later'
      })
    }
    res.json(user.address);
  })
}
