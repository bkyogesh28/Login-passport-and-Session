const localstrat=require('passport-local').Strategy
const mongoose=require('mongoose')
const bcrypt=require("bcryptjs")
const Usermod=require('../models/user')
module.exports=function(passport){
    passport.use(
        new localstrat({usernameField:'email'},(email,password,done)=>{
            Usermod.findOne({email:email})
              .then(user=>{
                  if(!user){
                      return done(null,false,{message:"User is not regitered"})
                  }
                  
                  bcrypt.compare(password,user.password,(err,isMatch)=>{
                      if(err){
                          throw err
                      }
                      if(isMatch){
                          return done(null,user)
                      }else{
                          return done(null,false,{message:"Password is invalid"})
                      }
                  })
              })
              .catch(err=>{
                  console.log(err)
              });
        })
       );
       passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        Usermod.findById(id,(err, user)=> {
          done(err, user);
        });
      });
}