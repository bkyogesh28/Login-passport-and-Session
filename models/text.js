const mongoose=require('mongoose')
const schema=mongoose.Schema({
    
    blog:{
        type:String,
        required:true,
    },
 
    value:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
})
module.exports=mongoose.model("blog",schema)
