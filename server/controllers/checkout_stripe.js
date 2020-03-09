const stripe = require('stripe')(process.env.STRIPE_SECRET);
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const mailSender = require('../utils/mailSender');
const Order = require('../models/Order');

//@desc     Create checkout with stripe using card
//@route    POST /api/v1/checkout/stripe
//@access   Public
exports.createCheckout_stripe = asyncHandler(async (req, res, next) => {

  if (!req.body.stripeToken) {
    return next(new ErrorResponse(`Need stripe checkout token`, 400));
  }

  const cart = await req.cart.getCart();

  const charge = await stripe.charges.create({
    amount: cart.totalWithShipping,
    currency: 'usd',
    description: 'Body Culture Purchase',
    source: req.body.stripeToken,
  });

  if (charge.status !== 'succeeded') {
    return next(new ErrorResponse(`Something went wrong with the payment`, 500));
  }

  try {
    const order = new Order({
      items: cart.items,
      user: req.user._id,
      orderStatus: 'On Process',
      totalPay: cart.totalPrice,
      shipping: cart.shipping,
      totalWithShipping: cart.totalWithShipping,
      pay_method: 'stripe',
      pay_id: charge.id
    });

    if (req.body.customAddress) {
      order.address = req.body.customAddress;
    } else {
      order.address = req.user.location
    }

    await order.save();

    mailSender({
      to: req.user.email,
      subject: 'Purchase completed!',
      message: 'Thanks for buying in our store! your order have been placed'
    })

    res.status(200).json({
      success: true,
      data: order
    });

    await req.cart.remove();
  } catch (err) {
    console.log(err);
    await stripe.refunds.create({
      charge: charge.id
    });
    return next(new ErrorResponse(`Something went wrong, charge have been refunded`, 500))
  }
});