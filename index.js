const express = require('express')
const bodyParser = require('body-parser')
//const { request, response } = require('express')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

//midelware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/products', (request, response) => {
    Product.find({}, (err, products) => {
        if (!products) return response.status(404).send({ menssage: 'no existen productos' })
        if (err) return response.status(500).send({ menssage: 'error al realizar la peticion de los productos ' })
        response.status(200).send({ products })
    })
})
app.get('/api/product/:productId', (request, response) => {
    let productId = request.params.productId
    console.log(`GET /api/product/${productId}`)
    Product.findById(productId, (err, product) => {
        if (!product) return response.status(404).send({ menssage: 'el producto no existe' })
        if (err) return response.status(500).send({ menssage: 'error al realizar la peticion del producto' })

        response.status(200).send({ product })
    })
})

app.post('/api/product', (request, response) => {
    console.log('POST /api/product')
    console.log(request.body)

    let product = new Product()
    product.name = request.body.name
    product.picture = request.body.picture
    product.price = request.body.price
    product.category = request.body.category
    product.description = request.body.description

    product.save((err, productStored) => {
        if (err) response.status(500).send({ message: 'Error al salvar en la base de datos' })

        response.status(200).send({ product: productStored })
    })
})

app.put('/api/product/:productId', (request, response) => {

})


app.delete('/api/product/:productId', (request, response) => {

})

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, resp) => {
    if (err) throw err
    console.log('conexion a la base de datos establecida....')
    app.listen(port, () => {
        console.log(`Api rest corriendo en localHost puerto ${port}`)
    })

})



