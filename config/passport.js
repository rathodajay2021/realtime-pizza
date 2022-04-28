const LocalStategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const user = require('../models/user')

function init(passport){
    passport.use(new LocalStategy({usernameField: 'email'}, (email, password, done) => {
        //login logic
        //check if mail exist
        user.findOne({email: email})
            .then(user => {
                //check user 
                if(!user){
                    return done(null, false, {message: 'This email is not register'})
                }
                //check password
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if(match){
                            return done(null, user, {message: 'Logged in succesfully'})
                        }
                        return done(null, false, {message: 'Password is incorrect'})
                    })
                    .catch(err => {return done(null, false, {message: 'Something went wrong'})})
            })
            .catch(err => console.log(err))
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser((id, done) => {
        user.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

module.exports = init