const express = require('express')
const ejs = require('ejs')
const expressLayout  = require('express-ejs-layouts')

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running succefully on port no ${PORT}`)
})

app.use((req,res,next)=> {       // set the layout
    expressLayout
    next()
})     
app.set('view engine','ejs')

app.get(`/`,(req, res)=>{
    res.render('home')
})