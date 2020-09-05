
const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/login-pass',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
},()=>{
    console.log("Mongodb connected")
})

