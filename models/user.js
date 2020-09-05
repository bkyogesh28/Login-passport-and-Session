const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const schema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        
        
    },
    email:{
            type:String,
            required:true,
            unique:true,
          
            
    },
    password:{
            type:String,
            required:true,
           
            
    }
    
})



schema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
       
    }
    console.log('just before saving')
    next()

})

const model=mongoose.model("user",schema)
module.exports=model