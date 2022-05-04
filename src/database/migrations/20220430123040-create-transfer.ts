module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .createTable('Transactions', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        fromWallet: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        toWallet: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        block: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        value: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      })
      .then(() =>
        queryInterface.addIndex('Transactions', [
          'fromWallet',
          'toWallet',
          'block',
        ]),
      );
  },

  async down(queryInterface) {
    return queryInterface
      .dropTable('Transactions')
      .then(() =>
        queryInterface.removeIndex('Transactions', [
          'fromWallet',
          'toWallet',
          'block',
        ]),
      );
  },
};
