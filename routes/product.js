const express = require('express')
const productController = require('../Controllers/product')
const router = express.Router()

router.get('/products', productController.getAllProduct)
    .get('/products/:id', productController.getProduct)
    .post('/products', productController.createProduct)
    .put('/products/:id', productController.replaceProduct)
    .patch('/products/:id', productController.updateProduct)
    .delete('/products/:id', productController.deleteProduct)

exports.routes = router;

