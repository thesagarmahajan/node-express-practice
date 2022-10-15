let express = require('express')
let routes = require('./routes')
let cors = require('cors')
const app = express()
const port = 8080


app.use(cors())
app.use(express.json())

app.use(express.static('uploads'))

app.use("/", routes)

app.post("/samplepost", (req,res)=>{
    console.log(req.body)
    res.send("Sample Post")
})

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
    
    res.status(404).send("NOT FOUND!")
})

app.listen(port, ()=>{
    console.log(`HTTP server running on port ${port}`)
})
