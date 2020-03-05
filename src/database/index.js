import Sequelize from 'sequelize';

import User from '~models/User';
import Recipient from '~models/Recipient';
import Courier from '~models/Courier';
import File from '~models/File';

import databaseConfig from '~config/database';

const models = [User, Recipient, Courier, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
