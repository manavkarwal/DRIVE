//db.js ye config folder  k ander h
const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=> {
        console.log('connected to db')
    })
}

module.exports = connectToDb;