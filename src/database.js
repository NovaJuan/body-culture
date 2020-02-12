const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  const db = await mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false
  });
  console.log(`Database ${db.connection.name} connected from host ${db.connection.host}`.cyan.bold);
}

module.exports = connectDB;