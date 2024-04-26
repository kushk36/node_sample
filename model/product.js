const mongoose = require('mongoose');
const { Schema } = require('mongoose')

const ProductSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: String,
    price: { type: Number, min: [0, 'Wrong min price'], required: true },
    discountPercentage: { type: Number, min: [0, 'Wrong min discount'], max: [50, 'Wrong max discount'] },
    rating: { type: Number, min: [0, 'Wrong min rating'], max: [6, 'wrong Max rating'], default: 0 },
    stock: Number,
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [String]
});
// const opts = { runValidators: true, context : 'query' };

exports.Product = mongoose.model('Product', ProductSchema);