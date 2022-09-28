let express = require('express')
let routes = require('./routes')
const app = express()
const port = 8080

app.use("/", routes)

app.get("/", (req, res)=>{
    res.send("This is home page")
})

app.get("/about", (req, res)=>{
    res.send("This is about page")
})

app.get("/contact", (req, res)=>{
    res.send("This is contact page")
})

app.get("/sample-json", (req, res)=>{
    res.status(200).json({"samplekey":"samplevalue"})
})

app.use((req, res, next)=>{
    res.status(404).send("PAGE NOT FOUND!")
})

app.listen(port, ()=>{
    console.log(`HTTP server running on port ${port}`)
})
