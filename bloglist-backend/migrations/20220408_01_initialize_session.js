const { DataTypes } = require('sequelize')
const sequelize = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => { 
        //create sessions
        await queryInterface.createTable('sessions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            createdAt: {
                field: 'created_at',
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('NOW')
            },
            updatedAt : {
                field: 'updated_at',
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('NOW')
            }
        }) 
    },

    down: async ({ context: queryInterface }) => { 
        await queryInterface.dropTable('sessions')
    },
}