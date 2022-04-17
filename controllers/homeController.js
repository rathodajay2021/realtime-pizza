const Menu = require('../models/menu')

const index = (req,res) => {
    Menu.find()
        .then(pizzas => {res.render('home', {pizzas})})
        .catch(err => console.log('route / err at index method in homeController',err))
}

module.exports = {
    index
}