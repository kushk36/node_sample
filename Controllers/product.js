const fs = require('fs')
// const index = fs.readFileSync('./public/index.html', 'utf-8')
// const data = JSON.parse(fs.readFileSync('./public/data.json', 'utf-8'))
// const products = data.products
const model = require('../model/product');
// const { Error } = require('mongoose'); 
const Product = model.Product

exports.getAllProduct = async (req, res) => {
    const products = await Product.find()
    // const products = await Product.find({ price: { $gt: 500 } })
    // by above method you can specify condition in find method so by above condition you only get the products that price is higher than 500
    // console.log(req.params);
    res.json(products)
}
exports.getProduct = async (req, res) => {
    const id = req.params.id
    // const product = products.find(p => p.id === id)
    const product = await Product.findById(id)
    res.json(product)
}

exports.createProduct = async (req, res) => {
    // console.log(req.body)
    // products.push(req.body)
    // res.json(req.body)
    const product = new Product(req.body)
    // product.title = 'PhoneX',
    //     product.price = 999,
    //     product.rating = 5

    // await product.save((err, doc) => {
    //     console.log({ err, doc });
    //     if (err) {
    //         res.status(400).json(doc)
    //     }
    // })
    const response = await product.save()
    // console.log('error', response);
    // const err = response
    // if (err) {
    //     res.status(400).json(err)
    // }
    res.status(201).json(response)
}

// exports.createProduct = async (req, res) => {
//     try {
//         const product = new Product(req.body)
//         const response = await product.save();
//         console.log('save function is called..');
//         console.log('Response:', response);
//         res.status(201).json(req.body);
//     } catch (error) {
//         console.error('Error occurred while saving product:', error);
//         res.status(500).json({ error: 'An error occurred while saving product.' });
//     }
// }

exports.replaceProduct = async (req, res) => {
    // res.json({ type: 'PUT' })
    // console.log(req.body)
    // const id = +req.params.id
    const id = req.params.id
    // const productIndex = products.findIndex(p => p.id === id)
    // products.splice(productIndex, 1, { ...req.body, id: id })
    try {
        // console.log('Updating product with ID:', id);
        // console.log('New product data:', req.body);
        const doc = await Product.findOneAndReplace({ _id: id }, req.body, { new: true, runValidators: true })
        // const doc = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
        res.status(201).json(doc)
    } catch (err) {
        console.log('err rating', err.errors.rating.message)
        res.status(400).json(err)
    }
    // res.status(201).json(req.body)
}

exports.updateProduct = async (req, res) => {
    // res.json({ type: 'PUT' })
    // console.log(req.body)
    // const id = +req.params.id
    // const productIndex = products.findIndex(p => p.id === id)
    // const product = products[productIndex]
    // products.splice(productIndex, 1, { ...product, ...req.body })
    // // res.status(201).json(req.body)
    // res.status(201).json()
    const id = req.params.id
    try {
        const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true })
        res.status(201).json(product)
    } catch (error) {
        console.log('err message', error.errors);
    }
}

exports.deleteProduct = async (req, res) => {
    // res.json({ type: 'DELETE' })
    // const id = +req.params.id
    // const productIndex = products.findIndex(p => p.id === id)
    // const product = products[productIndex]
    // products.splice(productIndex, 1)
    // res.status(201).json(product)
    const id = req.params.id
    try {
        const product = await Product.findOneAndDelete({ _id: id }, { new: true })
        res.status(201).json(product)
    } catch (error) {
        console.log('err message', err.errors)
    }
}