const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors');
const fileupload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

// Config env vars
dotenv.config({
	path: path.join(__dirname, 'config/config.env')
});

// Connect To Database
require('./database')();

// Create application
const app = express();

/*****MIDDLEWARES*****/

// Logging requests
app.use(morgan('dev'));

// Setting requests limit
if (process.env.NODE_ENV === 'production') {
	app.use(
		rateLimiter({
			windowMs: 5 * 60 * 1000, // 5 minutes
			max: 300 // limit each IP to 100 requests per windowMs
		})
	);
}

// File upload handler
app.use(
	fileupload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, 'public/temp')
	})
);

// Parsing JSONs
app.use(express.json());

// Parsing Body
app.use(
	express.urlencoded({
		extended: false
	})
);

// Cleaning XSS
app.use(xss());

// Prevent NoSQL injection
app.use(mongoSanitize());

// Setting other protections
app.use(helmet());

// CORS usage
app.use(cors());

// Cookie parser
app.use(cookieParser());

/*****END OF MIDDLEWARES*****/

/*****ROUTES*****/
//Static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Setting API routes
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/cart', require('./routes/cart'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/checkout', require('./routes/checkout'));
app.use('/api/v1/order', require('./routes/orders'));
/*****END OF API ROUTES*****/

// Error handler
app.use(errorHandler);

// Setting Admin routes;
app.use('/admin/*', express.static(path.join(__dirname, 'admin/build')));

// Setting Client routes;
app.use('/*', express.static(path.join(__dirname, 'client/build')));

// Setting Port
const PORT = process.env.PORT || 5000;

// Starting Server
const server = app.listen(
	PORT,
	console.log(
		`Server mode ${process.env.NODE_ENV} started on port ${PORT}`.magenta.bold
	)
);

//handle unhandled promise ejections
process.on('unhandleRejections', (err, promise) => {
	console.log(`Unhandled Error: ${err.stack}`.red);

	// Close server and exit app
	server.close(() => process.exit(1));
});
