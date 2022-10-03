let product = require('express').Router()

// MongoDB CRUD

product.get("/all", (req, res)=>{
    res.send("/product/all")
})

product.post("/new", (req, res)=>{
    res.send("/product/new")
})

product.put("/update", (req, res)=>{
    res.send("/product/update")
})

product.delete("/delete/:id", (req, res)=>{
    console.log(req.method)
    res.send(`/product/delete/${req.params.id}`)
})

product.get("/details/:id", (req, res)=>{
    res.end(`/product/details/${req.params.id}`)
})

module.exports = product