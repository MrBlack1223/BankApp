
const User = require('../Schema/userSchema')
const bcrypt = require('bcrypt')

async function addUser(name,surname,email,password){
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name: name,
            surname: surname,
            email: email,
            password: hashedPassword,
            balance: 0
        })
    }catch(e){
        console.log(e)
    }
}
async function register(name,surname,mail,password){
    const emailCount = await (await User.find({email:mail})).length;
    console.log(emailCount)
    if(emailCount === 0){
        addUser(name,surname,mail,password);
    }
    else{
        req.flash('error',"Podany email juz istnieje")
        return res.redirect('/register')
    }
}


module.exports = {
    registration: async (req,res)=>{
        const errorMsg = req.flash('error')
        res.render('register.ejs',{errorMessage: errorMsg})
    },
    
    registrationPost:  async (req,res)=>{
        try{
            await register(req.body.name,req.body.surname,req.body.email,req.body.password)
            res.redirect('/login')
        }catch(e){
            req.flash('error',"Podany email juz istnieje")
            res.redirect('/register')
        } 
    }
        
        

}