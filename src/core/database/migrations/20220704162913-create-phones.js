'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Phones', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['mobile', 'home', 'office', 'other'],
        defaultValue: 'mobile'
      },
      phoneable_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      phoneable_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
          queryInterface.dropTable('Phones'),
          queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Phones_type";'),
      ]);
    });
  }
};
