const express = require('express')
router = express.Router()

const homeController = require('../controllers/homeController')
const authController = require('../controllers/authController')
const cartController = require('../controllers/customers/cartController')
const orderController = require('../controllers/customers/orderController')
const guest = require('../middlewares/guest')

//home page
router.get(`/`, homeController.index)

//login and register page
router.get(`/login`, guest, authController.login)
router.post(`/login`, authController.postLogin)
router.get(`/register`, guest, authController.register)
router.post(`/register`,authController.postRegister)
router.post('/logout', authController.logout)

//cart page
router.get(`/cart`, cartController.index)
router.post(`/update-cart`, cartController.updateCart)

//Customer routes
router.post('/orders', orderController.store)
router.get('/customers/orders', orderController.index)

module.exports = router