const express = require('express')
const UserController = require('../controllers/user')

const route = express.Router()

route.get("/saleh", UserController.test)

route.get("/", UserController.GetAllUsers)

route.get("/add", UserController.CreateUser)

module.exports = route