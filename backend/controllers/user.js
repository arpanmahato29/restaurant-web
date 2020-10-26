const User = require('../models/user');
const Order = require('../models/order');
const { request } = require('express');

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
  User.findByIdAndUpdate(
    {_id:req.profile._id},
    {$set: req.body},
    {new:true, useFindAndModify: false},
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
  Order.find(
    {user: request.profile._id}
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
