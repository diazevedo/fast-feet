import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        number: Sequelize.STRING,
        address_complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        post_code: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    // this.addHook('beforeSave', recipient => {
    //   recipient.post_code = recipient.post_code.replace(/\D/g, '');
    // });

    return this;
  }
}

export default Recipient;
