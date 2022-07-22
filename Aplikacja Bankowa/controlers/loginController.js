const passport = require('passport')

const initializePassport = require('../passport-config')
const User = require('../Schema/userSchema')


initializePassport(
    passport,
    findByEmail,
    findByID)

async function findByEmail(email){
    return  User.findOne({email:email})
}
async function findByID(id){
    return  User.find({id:id})
}    

module.exports = {
    login: (req,res)=>{
        res.render('login.ejs')
    },
    
    loginAuth: 
        passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
            keepSessionInfo: true})   
        

}