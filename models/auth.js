'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define(
        'Auth',
        {
            userId: DataTypes.INTEGER,
            password: DataTypes.STRING,
        },
        {
            hooks: {
                beforeValidate: function(auth) {
                    const salt = bcrypt.genSaltSync(12);
                    const hash = bcrypt.hashSync(auth.password, salt);
                    auth.password = hash;
                },
            },
        }
    );
    Auth.associate = function(models) {
        // associations can be defined here
        Auth.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    Auth.prototype.validPassword = function(candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) {
                return callback(err);
            }
            callback(null, isMatch);
        });
    };
    return Auth;
};
