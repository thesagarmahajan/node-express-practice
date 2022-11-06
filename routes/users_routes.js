let user = require('express').Router()
let mysql = require('mysql2')
require("dotenv").config()

let multipart = require('connect-multiparty')
const multipartMiddleware  =  multipart({ uploadDir:  process.cwd()+'/uploads' });
console.log({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})
// let con = mysql.createConnection({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_NAME
// })
let con = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

con.getConnection((err, connection)=>{
    err?console.log(err):console.log(connection)
})

// con.connect((err)=>{
//     err ? console.log(err) : console.log("Connection Successful")
// })
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
        err ? res.status(500).json({"error":err}) : res.status(200).json({"success":"ONE_USER_ADDED"})
    })
})

user.put("/update", (req,res)=>{
    let ud = req.body
    con.query(`UPDATE users SET name='${ud.name}', email='${ud.email}', phone='${ud.phone}', password='${ud.password}'WHERE id=${ud.id}`, (err, rows, fields)=>{
        err ? res.status(500).json({"error":err}) : res.status(200).json({"success":"ONE_USER_UPDATED"})
    })
})

user.delete("/delete/:id", (req,res)=>{
    con.query(`DELETE FROM users WHERE id=${req.params.id}`, (err, rows, fields)=>{
        err ? res.status(500).json({"error":err}) : res.status(200).json({"success":"ONE_USER_DELETED"})
    })
})

user.put("/uploadavatar/:id", multipartMiddleware, (req, res)=>{
    
    let path = req.files.avatar.path;
    let splitted = path.split("\\") 
    console.log(path)
    let filename = "uploads/"+splitted[splitted.length-1]
    
    con.query(`UPDATE users SET avatar='${filename}' WHERE id=${req.params.id}`, (err, rows, fields)=>{
        err ? res.send("SOME ERROR") : res.send("FILE UPLOADED SUCCESSFULLY")
    })
})

user.get("/avatar/:id", (req,res)=>{
    con.query(`SELECT avatar FROM users WHERE id=${req.params.id}`, (err, rows, fields)=>{
        if (rows.length==0) {
            res.send("NO AVATAR FOUND")
        }  
        let avatarPath = rows[0].avatar
        res.sendFile(`${process.cwd()}/${avatarPath}`)
    })
})


module.exports = user