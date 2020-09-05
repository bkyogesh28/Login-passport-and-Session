const mongoose=require('mongoose')
const db=require('../config/keys').MongoURI
mongoose.connect(db,{useUnifiedTopology:true,useCreateIndex:true,useNewUrlParser:true})
  .then(()=>{
      console.log("Mongodb connected")
  })
  .catch((err)=>{
      console.log(err)
  })