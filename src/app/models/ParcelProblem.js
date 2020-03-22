import Sequelize, { Model } from 'sequelize';

class ParcelProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        parcel_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Parcel, {
      foreignKey: 'parcel_id',
      as: 'parcel',
    });
  }
}

export default ParcelProblem;
