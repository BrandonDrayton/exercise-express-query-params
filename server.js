const http = require('http');
const express = require('express')

const port = 3000
const hostname = 'localhost'

const app = express()
const server = http.createServer(app)

const productsService = require('./services/products');
const res = require('express/lib/response');

app.get('/', (req, res) => res.send('Build the API!'))

// Build Routes
// app.get('/api/v1/products', (req, res) => {
//   const products = productsService.findAll()
//   res.json(products)
// })

// app.get('/api/v1/products/:id', (req, res) => {
//   const productId = parseInt((req.params.id))
//   if (productId) res.status(404).json({ error: 'could not find productId' + productId })
//   else res.json(productsService.findOneById(productId))
// })

app.get('/api/v1/products:id, order', (req, res) => {
  const sort = ~~req.query.id
  console.log(sort)
  const direction = req.query.order
  const productsSorted = productsService.sortBy(productsService, sort, direction)
  console.log(productsSorted)
  return res.json(productsSorted)
})

// app.get('/api/v1/products', (req, res) => {
//   const searchKey = req.query.key
//   const searchValue = req.query.value
//   console.log(searchKey, searchValue)
// })

app.get('*', (req, res) => res.status(404).send('Page not found'))

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})