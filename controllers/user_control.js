const express = require('express')

const User = require('../models/user')

const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser =(req,res,next)=>{
    //cannot directly store passwrod so will use bcrypt
    bcrypt.hash(req.body.password,10).then(hash=>{
        const user = User({
            email: req.body.email,
            password:hash
        })
        user.save().then(result=>{
            console.log('user signin',result)
            res.status(201).json({
                message:'User Created',
                result: result
            })
        }).catch(err=>{
            console.log(err,'sing')
            res.status(500).json({
                message:'Invalid Auth Credentials',
                err: err
            })
        })
    })
    
}
exports.loginUser = (req,res,next)=>{
    let newuser;
    User.findOne({
        email:req.body.email
    }).then(user=>{
        console.log("login user",user)
        if(!user){
            return res.status(401).json({
                message:"Auth Failed"
            })
        }
        newuser = user
        return bcrypt.compare(req.body.password, user.password) //promise return
    })
    .then(result=>{
        console.log('result login',result)

        if(!result){
            return  res.status(401).json({
                message:"Auth Failed"
            })
        }
        const token = jwt.sign({
            email:newuser.email,
            id:newuser._id
        },process.env.JWT_K,{
            expiresIn:'1h'
        })
        res.status(200).json({
            token:token,
            expiresIn:3600,
            userid:newuser._id
        })
    })
    .catch(err=>{
        res.status(401).json({
            message:"Auth Failed"
        })
    })
}