'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    deviceId: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    freezeTableName: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};