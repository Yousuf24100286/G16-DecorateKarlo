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
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      total: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        defaultValue: 0.00
      },
      delivery_address_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'delivery_addresses',
          key: 'id'
        }
      },
      payment_method: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Cash on Delivery'
      },
      payment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'payments',
          key: 'id'
        }
      },
      order_status: {
        allowNull: false,
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