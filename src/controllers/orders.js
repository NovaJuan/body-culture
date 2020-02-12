const Order = require('../models/Order');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const mailSender = require('../utils/mailSender');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

//@desc     Get all orders
//@route    GET /api/v1/order
//@access   Private/admin
exports.getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc     Get single order
//@route    GET /api/v1/order/:id
//@access   Private/admin
exports.getOrder = asyncHandler(async (req, res, next) => {
  let query = Order.findById(req.params.id);

  query = query.populate({
    path: 'user',
    select: 'firstname lastname email address'
  });

  const order = await query;

  if (!order) {
    return next(new ErrorResponse(`No order with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

//@desc     Create order
//@route    POST /api/v1/order
//@access   Private/admin
exports.createOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body);

  res.status(200).json({
    success: true,
    data: order
  });
});

//@desc     Update order
//@route    PUT /api/v1/order
//@access   Private/admin
exports.updateOrder = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`No order with id of ${req.params.id}`, 404));
  }

  order.set({
    ...req.body
  });

  order = await order.save()

  res.status(200).json({
    success: true,
    data: order
  });
});

//@desc     Delete order
//@route    DELETE /api/v1/order
//@access   Private/admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`No order with id of ${req.params.id}`, 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

//@desc     Make a refund
//@route    POST /api/v1/order/refund/:id
//@access   Private/admin
exports.refund = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (req.body.amount) {
    req.body.amount = req.body.amount * 100;
  }

  if (!order) {
    return next(new ErrorResponse(`No order with id of ${req.params.id}`, 404));
  }

  let refund;
  if (order.pay_method === 'stripe') {
    const options = {
      charge: order.pay_id
    }

    if (req.body.amount) {
      options.amount = req.body.amount;
    }

    refund = await stripe.refunds.create(options);

    if (!order.refund) {
      order.refund = options.amount;
    } else {
      order.refund += options.amount;
    }

    if (!options.amount || options.amount >= order.totalPay || order.refund >= order.totalPay) {
      await order.remove();
      mailSender({
        to: req.user.email,
        subject: 'Purchase refunded',
        message: 'We refunded your purchase and removed your order'
      })
      order = {};
    } else {

      await order.save();
      mailSender({
        to: req.user.email,
        subject: 'Purchase refunded',
        message: `We refunded $${order.refund} from your order.`
      })
    }
  }

  res.status(200).json({
    success: true,
    data: order
  })
});