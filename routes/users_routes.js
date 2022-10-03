let user = require('express').Router()
let mysql = require('mysql')
let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123123",
    database:"node_express"
})

con.connect((err)=>{
    err ? console.log(err) : console.log("Connection Successful")
})
// MySQL CRUD

user.get("/all", (req, res)=>{
    con.query("SELECT * FROM users", (err, rows, fields)=>{
        res.send(rows)
    })
})

user.get("/details/:id", (req, res)=>{
    con.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, rows, fields)=>{
        res.send(rows)
    })
    
})

user.post("/new", (req,res)=>{
    let ud = req.body
    con.query(`INSERT INTO users(name, email, phone, password) VALUES('${ud.name}','${ud.email}','${ud.phone}','${ud.password}')`, (err, rows, fields)=>{
        err ? res.send("SOME ERROR") : res.send("ONE ROW INSERTED")
    })
})

user.put("/update", (req,res)=>{
    let ud = req.body
    con.query(`UPDATE users SET name='${ud.name}', email='${ud.email}', phone='${ud.phone}', password='${ud.password}'WHERE id=${ud.id}`, (err, rows, fields)=>{
        err ? res.send("SOME ERROR") : res.send("ONE ROW UPDATED")
    })
})

user.delete("/delete/:id", (req,res)=>{
    con.query(`DELETE FROM users WHERE id=${req.params.id}`, (err, rows, fields)=>{
        err ? res.send("SOME ERROR") : res.send("ONE ROW DELETED")
    })
})

module.exports = user