const Content = require('../models/posts')

const express = require('express')

const multer = require('multer')
const checktoken = require('../middleware/check-token')
const router = express.Router()
const appControl = require('../controllers/app_control')
const MIME_TYPE = {
    'image/jpeg':'jpg',
    'image/png':'png',
    'image/jpg':'jpg'


}
const storage = multer.diskStorage({            //multer here act as a middleware function
    destination: (req,file,cbfunction)=>{
        const isvalid = MIME_TYPE[file.mimetype]
        let error;
        if(isvalid){
            error = null
        }
        else{
            error = new Error('Invalid MIME Type')
        }
        cbfunction(error,'images')
    },
    filename: (req,file,cbfunction)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-')
        const extension = MIME_TYPE[file.mimetype]
        cbfunction(error,name+'-'+Date.now()+'-'+extension)

    }
})
//post request
//POST
router.post("/add/content",checktoken,multer({storage:storage}).single("image"),appControl.addContent)
//GET
router.use('/get1/content',appControl.getContent)
//DELETE
router.delete('/del1/content/:id',checktoken,appControl.delContent)
//UPDATE WE HAVE PUT FOR REPLACING OLD WITH NEW RESOURCE AND PATCH TO UPDATE CURRENT RESOURCE WITH NEW VALUES
router.put('/update/content/:id',checktoken,multer({storage:storage}).single("image"),appControl.updateContent)
module.exports=router