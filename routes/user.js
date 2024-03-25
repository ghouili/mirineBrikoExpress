const express = require('express')
const UserController = require('../controllers/user')

const route = express.Router()

route.get("/saleh", UserController.test)

route.get("/", UserController.GetAllUsers)

route.get("/add", UserController.CreateUser)

route.post("/register", UserController.Register)

route.post("/login", UserController.Login)

route.put("/:id", UserController.Update)

route.delete("/:id", UserController.Delete)

module.exports = route