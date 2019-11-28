const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwTStrategy = require('passport-jwt').Strategy;
const ExtractJwT = require('passport-jwt').ExtractJwT;
const { Auth } = require('../models');
const { passportSecret } = require('../config/keys');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    Auth.findOne({ where: { userEmail: email } })
        .then(auth => {
            if (!auth) {
                return done(null, false);
            }

            auth.validPassword(password, function(err, isMatch) {
                if (err) {
                    return done(err);
                }

                if (!isMatch) {
                    return done(null, false);
                }
                return done(null, true);
            });
        })
        .catch(e => done(e));
});

const jwtOptions = {
    jwtFromRequest: ExtractJwT.fromAuthHeaderAsBearerToken(),
    secretOrKey: passportSecret,
};
const jwtLogin = new JwTStrategy(jwtOptions, function(payload, done) {
    Auth.findOne({ where: { id: payload.sub } })
        .then(auth => {
            if (auth) {
                return done(null, auth);
            } else {
                return done(null, false);
            }
        })
        .catch(e => done(e));
});

passport.use(jwtLogin);
passport.use(localLogin);
