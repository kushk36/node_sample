
const fs = require('fs')
// const index = fs.readFileSync('./public/index.html', 'utf-8')
const data = JSON.parse(fs.readFileSync('./public/data.json', 'utf-8'))
const users = data.users
// console.log(users);


exports.getAllUsers = (req, res) => {
    console.log(req.params);
    res.json(users)
}
exports.getUser = (req, res) => {
    const id = +req.params.id
    const product = users.find(p => p.id === id)
    res.json(product)
}

exports.createUser = (req, res) => {
    console.log(req.body)
    users.push(req.body)
    res.json(req.body)
}
exports.replaceUser = (req, res) => {
    // res.json({ type: 'PUT' })
    // console.log(req.body)
    const id = +req.params.id
    const productIndex = users.findIndex(p => p.id === id)
    users.splice(productIndex, 1, { ...req.body, id: id })
    // res.status(201).json(req.body)
    res.status(201).json()
}

exports.updateUser = (req, res) => {
    // res.json({ type: 'PUT' })
    // console.log(req.body)
    const id = +req.params.id
    const productIndex = users.findIndex(p => p.id === id)
    const product = users[productIndex]
    users.splice(productIndex, 1, { ...product, ...req.body })
    // res.status(201).json(req.body)
    res.status(201).json()
}

exports.deleteUser = (req, res) => {
    // res.json({ type: 'DELETE' })
    const id = +req.params.id
    const productIndex = users.findIndex(p => p.id === id)
    const product = users[productIndex]
    users.splice(productIndex, 1)
    res.status(201).json(product)
}