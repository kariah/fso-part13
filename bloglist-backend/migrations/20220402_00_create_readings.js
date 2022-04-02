const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('readings', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'blogs', key: 'id' },
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            is_read: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            created_at: { 
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('NOW')
            },
            updated_at: { 
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('NOW')
            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('readings')
    },
}