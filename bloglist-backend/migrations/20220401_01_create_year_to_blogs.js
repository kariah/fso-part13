const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER
      // ,
      // validate: {
      //   min: 1991,
      //   max: sequelize.fn('YEAR', sequelize.fn('NOW')),
      //   "error": [
      //     "Validation of year failed (must be > 1991 and < current year)"
      //   ]
      // }
    })

  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}

