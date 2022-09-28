let user = require('express').Router()

user.get("/all", (req, res)=>{
    res.send("/user/all")
})

module.exports = user