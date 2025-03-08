"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("products", "avgRating", {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    });
    await queryInterface.changeColumn("products", "ratingsNum", {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "avgRating", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.removeColumn("products", "ratingsNum", {
      type: Sequelize.FLOAT,
    });

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
