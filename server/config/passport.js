const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const dotenv = require('dotenv');
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;


passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    async function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        try {
            const user = await User.findOne({ email, password });
            if (!user) {
                return cb(null, false, { message: 'Incorrect email or password.' });
            }
            return cb(null, user, { message: 'Logged In Successfully' });
        }
        catch (err) {
            return cb(err);
        }
    }
));
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : jwtSecret
},
function (jwtPayload, cb) {
    console.log(`jwtpayload: ${jwtPayload.id}`)
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findById(jwtPayload.id)
        .then(user => {
            console.log(user);
            return cb(null, user);
        })
        .catch(err => {
            console.log(user);
            return cb(err);
        });
}
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());