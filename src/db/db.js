const mongoose = require('mongoose');

// console.log(process.env.MONGO_URI);

function connectDB(){
    // mongoose.connect('mongodb://127.0.0.1:27017/node-data')
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongoDB connect to database ")
    })
    .catch((err) => {
        console.log(err)
        console.log(err.message)
    })
    
}

module.exports = connectDB;