let routes = require('express').Router()
let user = require("./users_routes")
let product = require("./products_routes")


routes.use("/user", user)
routes.use("/product", product)
module.exports = routes;