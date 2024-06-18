const jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
    try{
    const token = req.headers.authorization.split(" ")[1]
    //token might come as 'Bearer 1234zfq' so split
    if(token){
        const decoded_token = jwt.verify(token, process.env.JWT_K)
        req.userData = { email: decoded_token?.email,id:decoded_token?.id }
        next()//if verified move it along to next mw function
    }
    }
    catch (err){
        res.status(401).json({
            message:"fail"
        })
    }
}