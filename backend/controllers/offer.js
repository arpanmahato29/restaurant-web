const _ = require('lodash');
const Offer = require('../models/offer');

exports.getOfferById = (req,res,next,id) =>{
  Offer.findById(id)
  .exec((error,offer) => {
    if(error){
      return res.status(400).json({
        error:'No such offer exist'
      })
    }
    req.offer = offer;
    next();
  })
}

exports.createOffer = (req,res) => {
  const offer = new Offer(req.body);
  offer.save((error,offer) => {
    if(error){
      return res.status(400).json({
        error: 'Unable to create offer'
      })
    }
    res.json(offer);
  })
}

exports.getAllOffers = (req,res) =>{
  Offer.find()
  .exec((error, offers) => {
    if(error){
      return res.status(400).json({
        error: 'NO OFFER FOUND'
      })
    }
    res.json(offers);
  })
}

exports.updateOffer = (req,res) => {
  let offer = req.offer;
  offer = _.extend(offer,req.body);

  offer.save((error, updatedOffer) => {
    if(error){
      return res.status(400).json({
        error: 'Failed to update offer'
      })
    }
    res.json(updatedOffer);
  })
}

exports.removeOffer = (req,res) => {
  Offer.findOneAndRemove(
    {_id: req.offer._id},
    (error,offer) => {
      if(error){
        return res.status(400).json({
          error: 'Cannot delete this offer'
        })
      }
      res.json({
        msg: 'Offer deleted'
      })
    }
  )
}