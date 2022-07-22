

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail,getUserByID){
    const authenticateUser = async (email,password,done)=>{
        const user = await getUserByEmail(email)
        if(user == null)
        {
            return done(null,false,{message:"Nie ma takiego użytkownika, zarejestruj się"})
        }
        try{

            if(await bcrypt.compare(password, user.password ) || password == user.password)
            {
                return done(null,user)
            }else
            {
                return done(null,false,{message: 'Nieprawidłowe hasło'})
            }

        }catch(e){
                return done(e)
        }

    }

    passport.use(new LocalStrategy({
        usernameField : 'email'
    },authenticateUser))
    passport.serializeUser((user,done)=> { done(null,user.id)})
    passport.deserializeUser((id,done)=> { done(null,getUserByID(id))})
}
module.exports = initialize