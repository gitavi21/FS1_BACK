const Content = require('../models/posts')

const express = require('express')

const multer = require('multer')
const checktoken = require('../middleware/check-token')
exports.addContent = (req,res,next)=>{ //multer and checktoken here act as a middleware function
    // const post= req.body
    const url=req.protocol + '://' + req.get('host')
    const c1 = new Content({
        title: req.body.title,
        message: req.body.message,
        imgpath: url+'/images/'+req.file.filename,
        author:req.userData.id
    })
    console.log('incoming req',c1)
    c1.save().then((result)=>{
        console.log('post result',result)
        res.status(201).json({
            message:"content added successfully",
            returnContent:{
                id:result._id,
                title:result.title,
                message:result.message,
                imgpath:result.imgpath,
                author: req.userData.id//added author which will save user id that ensure genuine user is updating content
            }
        })
    })//add db schema to the database
    

}
exports.getContent = (req,res,next)=>{
    console.log(req.query)
    const pageSize= Number(req.query.pagesize)//items requested
    const currentPage = Number(req.query.page)//current page
    const postQuery = Content.find()
    let fetchcontent;
    if(pageSize && currentPage){
        postQuery
        .skip(pageSize * (currentPage-1))
        .limit(pageSize)
    }
    postQuery.then((documents)=>{
        console.log('docs retrived',documents)
        fetchcontent = documents
        return Content.countDocuments()
    }).then((count)=>{
                
        res.status(200).json({
            message:'success',
            response:fetchcontent,
            maxContent:count
        })
    })
    // res.send("Return From express")
   
}
exports.delContent = (req,res,next)=>{
    console.log('deleting id',req.params.id)
    Content.deleteOne({
        _id: req.params.id,
        author: req.userData.id
    }).then(result=>{
        console.log(result)
        if(result.deletedCount>0){//modifiedCount it checks entries are found or not by given user id in author field
            res.status(200).json({message:"update success"})

        }
        else{
            res.status(401).json({message:"unauthorized deletion"})

        }
    })

}
exports.updateContent = (req,res,next)=>{
    const newcontent = Content({
        _id: req.body.id,
        title: req.body.title,
        message: req.body.message,
        imgpath: req.body.imgpath,
        author:req.userData.id
        
    })
    Content.updateOne({_id: req.params.id, author: req.userData.id}, newcontent).then(result=>{//here author will be id of author who created the content if match is found gud otherwise no Updation
        console.log(result)
        if(result.modifiedCount>0){//modifiedCount it checks entries are found or not by given user id in author field
            res.status(200).json({message:"update success"})

        }
        else{
            res.status(401).json({message:"unauthorized modification"})

        }
    })
}