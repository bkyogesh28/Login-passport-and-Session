const express=require('express')
const router=express.Router()
const{ensureAuth}=require('../config/auth')
const passport=require('passport')
router.get('/',(req,res)=>{
    res.render("login")
})
router.get('/dashboard',ensureAuth,(req,res)=>{
    res.render('dashboard',{
        user:req.user
    })
})
router.post('/',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureFlash:true,
        successFlash:true,
        failureRedirect:'/'
    })(req,res,next)
 })
 router.get('/logout',(req,res)=>{
    req.logOut()
    req.flash('succes_msg',"User has logged out the session")
    res.redirect('/')
 })
module.exports=router