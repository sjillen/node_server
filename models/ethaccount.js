'use strict';
module.exports = (sequelize, DataTypes) => {
    const EthAccount = sequelize.define(
        'EthAccount',
        {
            address: DataTypes.STRING,
            userId: DataTypes.INTEGER,
        },
        {}
    );
    EthAccount.associate = function(models) {
        // associations can be defined here
        EthAccount.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
    return EthAccount;
};
