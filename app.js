const express = require('express')
const bodyParser= require('body-parser')
const Content = require('./models/posts')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require("path")
const router = require('./routes/app_routes')
const login = require('./routes/user_routes')

mongoose.connect("mongodb+srv://constantine:"+process.env.MONGO_ATLAS+"@cluster0.eodnll5.mongodb.net/db1?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{console.log('connected to DB Success!!')})
.catch(()=>{console.log('connection to DB failed!!')})


app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*")//where domain takes access will be given access
    res.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept,Authorization")//domain allowed if only sent requested header restricting certain clients
    res.setHeader('Access-Control-Allow-Methods',"GET,POST,PATCH,DELETE,OPTIONS,PUT")//rules allowed 
    next()
}
)
app.use('/images',express.static(path.join("back/images")))
app.use((req,res,next)=>{
    console.log('first middleware',req.body)
    next()
})

app.use('/apis',router)
app.use('/apis/user',login)
module.exports = app