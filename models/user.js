const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userDetails = new Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    role: {type: String, default: 'customer'}
},{timestamps: true})

const UserInfo  = mongoose.model('User', userDetails)
module.exports = UserInfo