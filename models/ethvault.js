'use strict';
module.exports = (sequelize, DataTypes) => {
    const EthVault = sequelize.define(
        'EthVault',
        {
            secret: DataTypes.STRING,
            accountId: DataTypes.INTEGER,
        },
        {}
    );
    EthVault.associate = function(models) {
        // associations can be defined here
        EthVault.belongsTo(models.EthAccount, { foreignKey: 'accountId', as: 'account' });
    };
    return EthVault;
};
