module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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

  down: queryInterface => {
    return queryInterface.dropTable('files');
  },
};

[
  {
    jsonrpc: '2.0',
    result: {
      appName: 'DiBetfair',
      appId: 87767,
      appVersions: [
        {
          owner: 'diazevedo',
          versionId: 79929,
          version: '1.0-DELAY',
          applicationKey: 'xsBfHRJofSUU3yfR',
          delayData: true,
          subscriptionRequired: true,
          ownerManaged: false,
          active: true,
        },
        {
          owner: 'diazevedo',
          versionId: 79928,
          version: '1.0',
          applicationKey: 'gxa2IogtFUAFzBzp',
          delayData: false,
          subscriptionRequired: true,
          ownerManaged: false,
          active: false,
        },
      ],
    },
    id: 1,
  },
];
