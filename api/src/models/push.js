'use strict';
module.exports = (sequelize, DataTypes) => {
  const Push = sequelize.define('Push', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    TargetId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    pendente:{
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    DeviceId:{
        allowNull: false,
        type: DataTypes.STRING
    },
  }, {
    freezeTableName: true
  });
  Push.associate = function(models) {
    // associations can be defined here
  };
  return Push;
};