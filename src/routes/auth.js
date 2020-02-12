const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');

const {
	register,
	login,
	forgotPassword,
	recoveryPassword,
	getMe,
	updateDetails,
	logout,
	changePassword,
	getOrder
} = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/order/:id', protect, getOrder);
router.get('/logout', protect, logout);
router.put('/update', protect, updateDetails);
router.put('/changepass', protect, changePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', recoveryPassword);

module.exports = router;
