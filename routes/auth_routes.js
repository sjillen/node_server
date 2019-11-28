const AuthController = require('../controllers/auth_controller');
const passport = require('passport');
const { verifyExistingUser } = require('../middlewares');

const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
    app.post('/signup', verifyExistingUser, AuthController.signup);

    app.post('/signin', requireSignin, AuthController.signin);

    app.post('/logout', AuthController.logout);
};
