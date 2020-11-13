const User = require('../models/user');
const Order = require('../models/order');
const formidable = require('formidable');
const _  = require('lodash');
const fs = require('fs');
const user = require('../models/user');

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

exports.countUsers = (req,res) => {
  User.find({role:req.body.role})
  .count((error,count) => {
    if(error){
      return res.status(400).json({
        error: 'Cannot fetch the count'
      })
    }
    res.json(count)
  })
}

exports.updateUser = (req,res) => {
  User.findByIdAndUpdate(
    {_id:req.profile._id},
    {$set: req.body},
    {new:true, useFindAndModify: true},
  ).exec((error, user) => {
    if(error){
      return res.status(400).json({
        error: "Not Authorized to Update this USER"
      });
    }
    user.salt = undefined;
    user.encry_password = undefined;
    const {_id, name, email, role, phone, } = user;
    res.status(200).json({_id, name, email, role, phone});
  })
}

exports.upgradeToSeller = (req,res) => {
  console.log(req.body);
  User.findOneAndUpdate(
    {_id:req.body._id},
    {$set:{role:req.body.role}},
    {new:true, useFindAndModify: true}
  ).exec((error, seller) => {
    if(error){
      return res.status(400).json({
        error: 'Cannot upgrade to seller'
      })
    }
    const {_id, name, email, role, phone, } = user;
    res.status(200).json({_id, name, email, role, phone});
  })
}

exports.searchUser = (req,res) => {
  User.findOne(
    {email:req.body.email},
  ).exec((error,user) => {
    if(error || !user){
      return res.status(400).json({
        error:'No such user exist'
      })
    }
    user.salt = undefined;
    user.encry_password = undefined;
    const {_id, name, email, role, phone, } = user;
    res.status(200).json({_id, name, email, role, phone});
  })
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

