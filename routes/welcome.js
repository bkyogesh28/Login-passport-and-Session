const express=require('express')
const router=express.Router()
const{ensureAuth}=require('../config/auth')
const passport=require('passport')
const userMod=require('../models/text')
const uuid=require('uuid')
const  adminid="admin_123"
const  adminpass="admin@!!!"
router.get('/',(req,res)=>{
    res.render("login")
})
router.get('/admin',(req,res)=>{
    res.render('admin.ejs')
})
router.post('/admin',(req,res)=>{
    const{adid,adpa}=req.body
     if(adid==adminid && adpa==adminpass){
         res.redirect("/admin/dashboard")
       
     }else{
        res.redirect('/admin/dashboard')
     }
    
})
router.get('/admin/dashboard',(req,res)=>{
    userMod.find({},function(err,val){
        res.render('admindash.ejs',{
             v:val
        })
       
       
})
router.post('/admin/dashbord',(req,res)=>{
    userMod.Update({"value":1},(err,res)=>{
      if(err){
          res.send(err).status(400)
          console.log(err)
      }else{
          res.send(res)
          console.log(res)
      }
    })
     
})
    
    
})
router.get('/dashboard',ensureAuth,(req,res)=>{
    userMod.find({},function(err,val){
        res.render('dashboard.ejs',{
             v:val,
             user:req.user
           
        })
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
router.get('/dashboard/blog',ensureAuth,(req,res)=>{
    res.render("blog",{
        user:req.user
    })
    
})
router.post('/dashboard/blog',async(req,res)=>{
       
        const u= new userMod(req.body)
        try {
            const t=u.save()
            req.flash("succes_msg","Blog submitted Successfully")
            res.redirect('/dashboard')
        } catch (error) {
            res.send(e).status(400)
        }
})
 router.get('/logout',(req,res)=>{
    req.logOut()
    req.flash('succes_msg',"User has logged out the session")
    res.redirect('/')
 })
module.exports=router