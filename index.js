// const http = require('http')
require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')
const productRouter = require('./routes/product')
const path = require('path')
const { MongoClient, ServerApiVersion } = require('mongodb');
const userRouter = require('./routes/users')
// const uri = "mongodb+srv://kush:kush@12799@cluster0.35liz9g.mongodb.net/ecommerce/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://kush:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.35liz9g.mongodb.net/ecommerce/?retryWrites=true&w=majority&appName=Cluster0`;
// const { type } = require('os')
// const exp = require('constants')
// const morgan = require('morgan')

const server = express()
// console.log('env', process.env.DB_PASSWORD);

// mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
// db connect

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// main().catch(err => console.log(err));
main().catch(console.dir)

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    // await mongoose.connect(`mongodb+srv://kush:${process.env.DB_PASSWORD}@cluster0.35liz9g.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`)
    // await mongoose.connect(`mongodb+srv://kush:${process.env.DB_PASSWORD}@cluster0.35liz9g.mongodb.net/ecommerce`);
    // await mongoose.connect(uri)
    // console.log('database connected..');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("ecommerce").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}


// Body parser
// body parser means when we want to use body we have to use express.json() library
server.use(express.json())
server.use(cors())
// server.use(morgan('dev'))
// server.use(express.static(process.env.PUB_DIRECTORY))  // aa rite pan lakhi sakay and niche ni rite pan lakhi sakay
server.use(express.static(path.resolve(__dirname, process.env.PUB_DIRECTORY)))
server.use('/', productRouter.routes)
server.use('/api', userRouter.routes)
server.use('*', (req, res) => {
    // res.sendFile(__dirname + '/build/index.html')  //tame aa rite pan lakhi sako 6o froentend na root or path module ma pan lakhi sako 6o
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

// when we want to send data by form and url is also encoded in that  then we can use urlencoded middleware
// server.use(express.urlencoded())

// server.use((req, res, next) => {
//     console.log(req.get('User-Agent'), req.method, req.ip, req.hostname);
//     next()
// })


// const auth = (req, res, next) => {
//     // console.log(req.query);
//     if (req.body.password === '123') {
//         next()
//     } else {
//         res.sendStatus(401)
//     }
// }

// server.use(auth)



// // This is the get api to get all the products
// server.get('/products', productController.getAllProduct)

// // This is the get api for particular product
// server.get('/products/:id', productController.getProduct)

// // create post api if you want to push any new data into database you can do it from this way you can push any product by this way
// server.post('/products', productController.createProduct)

// // create update api if you want to update particular data into database you can do it by making this put api and you can easily update particular product but when you use put it overwrite all data of that particular object
// server.put('/products/:id', productController.replaceProduct)

// // but in patch it only update few properties and rest properties are all same 
// server.patch('/products/:id', productController.updateProduct)

// // but in delete by below method you can particularly delete one item from the products.
// server.delete('/products/:id', productController.deleteProduct)

// server.patch('/', (req, res) => {
//     res.json({ type: 'PATCH' })
// })



// server.get('/demo', (req, res) => {
//     // res.send('<h1>hello</h1>')
//     // we can send file directly by these method of express we don't need to write all the http methods of node
//     // res.sendFile('/Users/hp/OneDrive/Desktop/node/index.html')
//     // res.json(products)
//     res.status(201).send('<h1>Hello</h1>')
// })
server.listen(process.env.PORT, () => {
    console.log('server started.. ')
})

// const data = { age: 15 }
// const server = http.createServer((req, res) => {

//     if (req.url.startsWith('/product')) {
//         const id = req.url.split('/')[2];
//         const product = products.find(p => p.id === +id)
//         log(product)
//         res.setHeader('Content-Type', 'text/html')
//         let modifiedIndex = index.replace('**title**', product.title).replace('**price**', product.price).replace('**rating**', product.rating).replace('**url**', product.thumbnail)
//         // let modifiedPrice = index.replace('**price**', product.price)
//         res.end(modifiedIndex)
//         return;

//     }

//     switch (req.url) {
//         case '/':
//             res.setHeader('Content-Type', 'text/html')
//             res.end(index)
//             break;

//         case '/api':
//             res.setHeader('Content-Type', 'application/json')
//             res.end(JSON.stringify(data))
//             break;

//         case '/product':
//             res.setHeader('Content-Type', 'text/html')
//             let modifiedIndex = index.replace('**title**', product.title).replace('**price**', product.price).replace('**rating**', product.rating)
//             // let modifiedPrice = index.replace('**price**', product.price)
//             res.end(modifiedIndex)
//             break;

//         default:
//             res.writeHead(404, 'BT HO')
//             res.end('<h1>Page Not Found</h1>')
//             break;
//     }
//     // console.log(req.url)
//     // console.log('server started...')
//     // log('server')
//     // res.end(index)
// })

// server.listen(8000)