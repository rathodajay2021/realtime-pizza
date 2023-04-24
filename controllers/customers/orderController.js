const orderModel = require('../../models/order')

const store = (req,res) => {
    const { phone, address} = req.body
    if(!phone || !address){
        req.flash('error', "All fields are required")
        return res.redirect('/cart')
    }
    const order = new orderModel({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone: phone,
        address: address
    })
    // console.log(order)
    order.save()
        .then(result => {
            req.flash('success', 'Order placed successfully')
            return res.redirect('/customers/orders')
        })
        .catch(err => {
            console.log(err)
            req.flash('error', 'Somethng went wrong')
            return res.redirect('/cart')
        })
}

const index = (req,res) => {
    orderModel.find({ customerId: req.user._id})
        .then(orders => {
            res.render('./customers/orders', {orders})
            // console.log(result)
        })
        .catch(err => console.log(err))
}

module.exports = {
    store,
    index
}