const mongosse = require('mongoose')
const Schema = mongosse.Schema

const ProductSchema = Schema({
    name: String,
    picture: String,
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['computers', 'phones', 'accesories'] },
    description: String
})

module.exports = mongosse.model('Product', ProductSchema)
