const express = require('express')
const mongoose = require('mongoose')

const UserRouter = require('./routes/user')

const server = express()

server.use(express.json())
server.use("/user", UserRouter)

mongoose.connect('mongodb+srv://admin:admin@brico.i9bvv4p.mongodb.net/?retryWrites=true&w=majority&appName=brico').then(()=> server.listen(4000, () => { console.log('server is running on port 4000!!')})).catch((err) => console.log(err))