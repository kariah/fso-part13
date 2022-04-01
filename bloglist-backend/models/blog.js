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
            customValidator(value) {
                if (value < 1991 || value > sequelize.fn('YEAR', sequelize.fn('NOW'))) {
                    throw new Error("Validation of year failed (must be > 1991 and < current year");
                }
            }
        },
        //defaultValue: 1991
        // validate: {
        //     min: 1991,
        //     max: 2022,
        //     // max: sequelize.fn('YEAR', sequelize.fn('NOW')),
        //     // "error": [
        //     //     "Validation of year failed (must be > 1991 and < current year)"
        //     // ]
        // }
    },
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
})

module.exports = Blog
