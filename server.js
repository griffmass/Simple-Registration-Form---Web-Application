const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express();
app.use(express.static(path.join(__dirname, 'app')))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/students')
const db =mongoose.connection
db.once('open',()=>{
    console.log("connected to database")
})

const userSchema = new mongoose.Schema({
    name:String,
    age:String,
    program:String,
    yearsection:String
})

const Users = mongoose.model("data", userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'app/form.html'))
})

app.post('/post',async(req,res)=>{
    const {name,age,program,yearsection} = req.body
    const user = new Users ({
        name,
        age,
        program,
        yearsection
    })
    await user.save()
    console.log(user)
    res.send("Form Submitted")
})

app.listen(port,()=>{
    console.log("server is running on port")
})