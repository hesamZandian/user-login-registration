const express = require('express')
const app = express()
const port = 3000
const userRoutes = require("./routes/routes")
const bodyParser = require("body-parser")

// mongoDB connection
const mongoose = require('mongoose')
const URL = 'mongodb://user:user123@ds119650.mlab.com:19650/sam_db'
mongoose.connect(URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('open', () => {
    console.log("connected")
})



const bodyParserJSON = bodyParser.json()
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: false })

// configure app.use()
app.use(bodyParserJSON)
app.use(bodyParserURLEncoded)
app.use('/users', userRoutes)

app.listen(port,() =>{
    console.log(`server running on port ${port}`)
})