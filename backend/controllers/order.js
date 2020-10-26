const {ProductCart,Order} = require('../models/order');

exports.getOrderById = (req,res,next,id) => {
  Order.findById(id)
  .populate('products.product','name price')
  .exec((error,order) => {
    if(error){
      return res.status(400).json({
        error: 'no such order placed'
      })
    }
    req.order = order;
    next();
  })
}

exports.createOrder = (req,res) => {
  const order = new Order(req.body.order);
  order.user = req.profile._id;
  order.restaurant = req.restaurant._id;
  order.save((error, order) => {
    if(error){
      return res.status(400).json({
        error: 'Failed to create the order'
      })
    }
    next();
  })
}

exports.getAllOrdersForRestaurant = (req,res) => {
  Order.find(
    {restaurant: req.restaurant._id}
  ).populate('products.product')
  .exec((error, orders) => {
    if(error){
      return res.status(400).json({
        error: 'cannot fetch orders (Restuarant)'
      })
    }
    res.json(orders);
  })
}

exports.getOrderStatus = (req,res) => {
  res.json(Order.schema.path('status').enumValues);
}

exports.searchOrder = (req,res) => {
  Order.find({_id:req.body.orderId})
  .populate('products.product')
  .populate('user','name email phone address')
  .exec((error, order) => {
    if(error){
      return res.status(400).json({
        error: 'unable to search'
      })
    }
    res.json(order);
  })
}

exports.updateStatus = (req,res) => {
  Order.findOneAndUpdate(
    {_id: req.body.orderId},
    {$set:{status:req.body.status}},
    (error, order) => {
      if(error){
        return res.status(400).json({
          error: 'Cannot update order status'
        })
      }
      res.json(order);
    }
  )
}