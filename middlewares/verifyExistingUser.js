const { User } = require('../models');

module.exports = async (req, res, next) => {
    let existingUser = null;
    try {
        existingUser = await User.findOne({ where: { email: req.body.email } });
    } catch (e) {
        Logger.error(e);
        return res.status(500).json({ message: e.message });
    }

    if (existingUser) {
        return res.status(422).json({ message: 'user already exists' });
    }

    next();
};
