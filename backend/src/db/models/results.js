const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const results = sequelize.define(
    'results',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

total_correct: {
        type: DataTypes.INTEGER,

      },

total_incorrect: {
        type: DataTypes.INTEGER,

      },

total_score: {
        type: DataTypes.DECIMAL,

      },

completed_at: {
        type: DataTypes.DATE,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  results.associate = (db) => {

    db.results.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.results.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return results;
};

