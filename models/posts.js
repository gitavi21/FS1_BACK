const mongoose= require('mongoose')
const postSchema = mongoose.Schema({
    title:{type:String,required:true},
    message:{type:String,required:true},
    imgpath:{type:String,required:true},
    author: { type: mongoose.Schema.Types.ObjectId, ref:"User",required:true}
})
module.exports = mongoose.model('Content',postSchema)//modelname