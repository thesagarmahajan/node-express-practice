let product = require('express').Router()

product.get("/all", (req, res)=>{
    res.send("/product/all")
})

module.exports = product