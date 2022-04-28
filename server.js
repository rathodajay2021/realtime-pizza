const express = require('express')
const ejs = require('ejs')  //to accept the ejs files
const expressLayout  = require('express-ejs-layouts')   //put one layout for all pages like navbar for all pages
const mongoose = require('mongoose')
const session = require('express-session')  //create the session
const flash = require('express-flash')  //create the cookie
const MongoDbStore = require('connect-mongo')   //to store cookie in mongodb database
require('dotenv').config()  //to create dotnev file 
const passport = require('passport')

const webRouter = require('./routes/web')

const app = express()
const PORT = process.env.PORT || 4000
const URL = process.env.DataBase_URL 

// mongoose.connect(URL,{useNewUrlParser: true  , useCreateIndex: true , useUnifiedTopology : true, useFindAndModify: true})
mongoose.connect(URL,{useNewUrlParser: true  , useUnifiedTopology : true})      //connect database
    .then(res => app.listen(PORT, console.log(`server is started on port ${PORT}`)))
    .catch(err => console.log(err))

app.use(express.urlencoded({extended: false})) // to get data when it is coming thorough url encoded method
app.use(express.json())  //to get data at req.body(in post request)

//session store
const mongoStore = MongoDbStore.create({
    // mongooseConnection : mongoose.connection,
    mongoUrl: process.env.DataBase_URL,
    collection: 'sessions'
})

//session config
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24}
}))

//passport config
const passportInit = require('./config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(express.static('public'));  //tell server that form where you get static file like css, image, etc...
app.use(expressLayout) 

app.set('view engine','ejs')    //starting the view engine to read .ejs files.
app.use((req,res,next)=>{   //global middleware(by this you can asscess session anywhere)
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

app.use('/', webRouter)