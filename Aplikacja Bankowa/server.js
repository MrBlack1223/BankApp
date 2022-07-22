if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const config = require('config')
const express = require('express')
const app = express()
const PORT = 3000
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const mongoose = require('mongoose')
const cors = require('cors')
const methodOverride = require('method-override')
const home = require('./Routes/home')
const login = require('./Routes/login')
const registration = require('./Routes/registration')
const dbConfig = config.get('Users.dbConfig.dbname')


app.set('view-engine','ejs')

app.use(methodOverride('_method'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/public', express.static('public'));

//db connect

mongoose.connect(dbConfig).then((res)=>{
    console.log("database connected succesfully")
}).catch((error)=>{
    console.log(error);
});

//homePage
app.use('/',home)
app.use('/logout',home)
app.use('/withdraw',home)
app.use('/transfer',home)

//login
app.use('/login',login)

//registration
app.use('/register',registration)

app.listen(PORT);
