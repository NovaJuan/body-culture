const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Get all users
//@route    GET /api/v1/user/
//@access   Private/admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc     Get single user
//@route    GET /api/v1/user/:id
//@access   Private/admin
exports.getUser = asyncHandler(async (req, res, next) => {
  let query = User.find({
    _id: req.params.id
  });

  query = query.populate('orders');

  const user = await query;

  if (!user) {
    return next(new ErrorResponse(`No user with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc     Create user
//@route    POST /api/v1/user/
//@access   Private/admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user
  });
});

//@desc     Update user
//@route    PUT /api/v1/user/:id
//@access   Private/admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`No user with id of ${req.params.id}`, 404));
  }

  user.set({
    ...req.body
  });

  user = await user.save();

  res.status(201).json({
    success: true,
    data: user
  });
});

//@desc     Delete user
//@route    DELETE /api/v1/user/:id
//@access   Private/admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`No user with id of ${req.params.id}`, 404));
  }

  await user.remove();

  res.status(201).json({
    success: true,
    data: {}
  });
});