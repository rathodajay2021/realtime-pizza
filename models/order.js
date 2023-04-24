const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    phone : {type: String, required: true},
    address : {type: String, required: true},
    customerId : {type: mongoose.Schema.Types.ObjectId, ref:'User' , required: true},
    items: {type: Object, required: true},
    paymentType: { type: String, default: 'COD'},
    status: {type: String ,default: 'order_placed'}
},{timestamps: true})

const orderModel  = mongoose.model('Order', orderSchema)
module.exports = orderModel