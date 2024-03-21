const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const createPath = require('./helpers/create-path.js')
const methodOverride = require('method-override')
const postRoutes = require('./routes/post-routes.js')
const postApiRoutes = require('./routes/api-post-routes.js')
const contactRoutes = require('./routes/contact-routes.js')

const app = express()

app.set('view engine', 'ejs')

mongoose
	.connect(process.env.MONGO_URL)
	.then((res) => console.log('Connected to DB'))
	.catch((error) => console.log(error))

app.listen(process.env.PORT, (error) => {
	error ? console.log(error) : console.log(`Listening port ${process.env.PORT}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({ extended: false }))

app.use(express.static('styles'))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
	const title = 'Home'
	res.render(createPath('index'), { title })
})

app.use(postRoutes)
app.use(contactRoutes)
app.use(postApiRoutes)

app.use((req, res) => {
	const title = 'Error Page'
	res.status(404).render(createPath('error'), { title })
})
