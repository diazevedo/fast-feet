module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('parcel_problems', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      parcel_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'parcels',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNullL: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => queryInterface.dropTable('parcel_problems'),
};
