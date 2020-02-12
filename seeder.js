const fs = require('fs');
const colors = require('colors');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.connect('mongodb://localhost/body-culture', {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Config env vars
dotenv.config({
  path: path.join(__dirname, 'src/config/config.env')
});

// const Product = require('./src/models/Product');
const User = require('./src/models/User');

// const products = JSON.parse(fs.readFileSync(path.join(__dirname, '_data/products.json'), 'utf-8'));
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '_data/users.json'), 'utf-8'));

// console.log(products);

const addData = async () => {
  // await Product.create(products);
  await User.create(users);
  console.log('Data created'.green.inverse);
  process.exit(1);
}

const deleteData = async () => {
  // await Product.deleteMany();
  await User.deleteMany();
  console.log('Data erased'.red.inverse);
  process.exit(1);
}

if (process.argv[2] === '-i') {
  addData();
} else if (process.argv[2] === '-d') {
  deleteData();
}