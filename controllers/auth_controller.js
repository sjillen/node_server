const jwt = require('jwt-simple');
const { passportSecret } = require('../config/keys');
const { User, Auth, sequelize } = require('../models');

function tokenForUser(auth) {
    const timestamp = new Date().getTime();

    return jwt.encode(
        {
            sub: auth.id,
            iat: timestamp,
        },
        passportSecret
    );
}

module.exports = {
    async signup(req, res) {
        const { email, password } = req.body;
        try {
            const auth = await sequelize.transaction(t => {
                return User.create({ email }, { transaction: t }).then(user => {
                    return Auth.create({ password, userId: user.id }, { transaction: t });
                });
            });
            return res.status(201).json({ token: tokenForUser(auth) });
        } catch (e) {
            Logger.error(e);
            return res.status(400).json({ message: e.message });
        }
    },

    async signin(req, res) {
        res.status(200).json({ token: tokenForUser(req.auth) });
    },

    async logout(req, res) {
        req.logout();
        res.redirect('/');
    },
};
