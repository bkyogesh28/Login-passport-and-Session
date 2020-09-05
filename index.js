const express=require("express")
const expresslayouts=require('express-ejs-layouts')
const ejs=require('ejs')
const passport=require('passport')
require('./config/passport')(passport)
const flash=require('connect-flash')
const session=require('express-session')
const db=require('./db/mongoose')
const port=process.env.PORT||3000
const app=express()
//app.use(expresslayouts)
app.set('view engine','ejs')
app.use(express.static("public"))
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash())
app.use(session({
    secret:"login",
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize())
app.use(passport.session())
app.use((req,res,next)=>{
    res.locals.succes_msg=req.flash("succes_msg")
    res.locals.error_msg=req.flash("error_msg")
    res.locals.error=req.flash("error")
    next()
});
app.use('/',require('./routes/welcome'))
app.use('/register',require('./routes/user'))




app.listen(port,()=>{
    console.log("Server running at"+" "+port)
})