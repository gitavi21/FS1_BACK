const express = require('express')

const User = require('../models/user')

const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userControl = require('../controllers/user_control')
router.post("/signin",userControl.createUser)
router.post('/login',userControl.loginUser)
module.exports = router