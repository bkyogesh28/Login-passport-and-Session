const express=require('express')
const Usermod=require('../models/user')
const router=express.Router()
const passport=require('passport')
router.get('/',(req,res)=>{
    res.render("register")
})

router.post('/',(req,res)=>{
    const {name,email,password}=req.body
    let errors=[]
    let success=[]
    if(!name||!email||!password){
        errors.push({msg:"Please fill all fields"})
    }
    if(password.length<6){
        errors.push({msg:"Please provide a valid password"})
    }
    if(password.length==0){
        errors.push({msg:"Please provide a password"})
    }
    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password
        })
    }else{
       Usermod.findOne({email:email})
       .then(user=>{
           if(user){
               errors.push({msg:"User alreay exixts"})
               res.render('register',{
                errors,
                name,
                email,
                password
            })
           }else{
               const user1=new Usermod(req.body)
               try {
                 user1.save()
                req.flash("succes_msg","User saved succesfully")
                 res.redirect('/')

                   
               } catch (e) {
                   res.status(400).send(e)
               }
           }
       })
    }
})


module.exports=router