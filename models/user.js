'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            email: DataTypes.STRING,
            ethereumAddress: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            hooks: {
                beforeValidate: function(user) {
                    const salt = bcrypt.genSaltSync(12);
                    const hash = bcrypt.hashSync(user.password, salt);
                    user.password = hash;
                },
            },
        }
    );
    User.associate = function(models) {
        // associations can be defined here
    };

    User.prototype.validPassword = function(candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) {
                return callback(err);
            }
            callback(null, isMatch);
        });
    };
    return User;
};
