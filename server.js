const express = require('express')
const ejs = require('ejs')
const expressLayout  = require('express-ejs-layouts')

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running succefully on port no ${PORT}`)
})

app.use(express.static('public'));  //tell server that form where you get static file like css, image, etc...
app.use((req,res,next)=> {       // set the layout
    expressLayout
    next()
})     
app.set('view engine','ejs')    //starting the view engine to read .ejs files.

app.get(`/`,(req, res)=>{
    res.render('home')
})