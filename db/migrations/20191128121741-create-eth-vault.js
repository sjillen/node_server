'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('EthVaults', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            secret: {
                type: Sequelize.STRING,
            },
            accountId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'EthAccounts',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: queryInterface => {
        return queryInterface.dropTable('EthVaults');
    },
};
