'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      total: {
        type: Sequelize.DECIMAL
      },
      delivery_address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'delivery_addresses',
          key: 'id'
        }
      },
      payment_method: {
        type: Sequelize.STRING
      },
      payment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'payments',
          key: 'id'
        }
      },
      order_status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_details');
  }
};