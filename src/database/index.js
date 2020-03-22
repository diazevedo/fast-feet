import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '~models/User';
import Recipient from '~models/Recipient';
import Courier from '~models/Courier';
import File from '~models/File';
import Parcel from '~models/Parcel';
import ParcelProblem from '~models/ParcelProblem';

import databaseConfig from '~config/database';

const models = [User, Recipient, Courier, File, Parcel, ParcelProblem];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
