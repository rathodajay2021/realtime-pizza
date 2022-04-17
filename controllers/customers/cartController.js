const index = (req,res) => {
    res.render('./customers/cart')
}

const updateCart = (req,res) => {
    if(!req.session.cart){  //checking if it is frist time then add basic structure of cart in session
        req.session.cart = {
            items: {},
            totalQty: 0,
            totalPrice: 0
        }
    }
    let cart = req.session.cart
    //now check item does not exist in cart
    if(!cart.items[req.body._id]){
        cart.items[req.body._id] = {
            item: req.body,
            qty: 1
        }
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
    }else{
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
    }
    console.log('session',req.session)
    return res.json({totalQty: req.session.cart.totalQty})
    // let cart = {
    //     items: {
    //         pizzaId: {item: pizzObject, qty: 0}
    //     },
    //     totalQty: 0,
    //     totalPrice: 0
    // }
}

module.exports = {
    index,
    updateCart
}