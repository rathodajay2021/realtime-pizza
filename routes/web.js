const express = require('express')
router = express.Router()

const homeController = require('../controllers/homeController')
const authController = require('../controllers/authController')
const cartController = require('../controllers/customers/cartController')

//home page
router.get(`/`, homeController.index)

//login and register page
router.get(`/login`, authController.login)
router.get(`/register`, authController.register)

//cart page
router.get(`/cart`, cartController.index)
router.post(`/update-cart`, cartController.updateCart)


module.exports = router