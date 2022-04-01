const { DataTypes } = require('sequelize')
const sequelize = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        //create blogs table
        await queryInterface.createTable('blogs', {
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
        

        //create users
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: {
                        "error": [
                            "Validation isEmail on username failed"
                        ]
                    }
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
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

        //add reference 
        await queryInterface.addColumn('blogs', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        })
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('users')
    },
}