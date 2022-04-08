const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'enabled', {
      type: DataTypes.BOOLEAN 
    })

  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'enabled')
  },
}

