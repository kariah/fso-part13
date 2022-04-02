const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Blog extends Model { }
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    year: {
        type: DataTypes.INTEGER,
        validate: {
            isValidYear(value) { 
                const today = new Date();
                const currentYear = today.getFullYear();   
                if (value < 1991 || value > currentYear) { 
                    throw new Error("Validation of year failed (must be greater than 1991 and smaller than current year")
                }
            }
        } 
    },
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
})

module.exports = Blog
