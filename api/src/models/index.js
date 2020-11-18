'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/database.js');
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

const mapping = (folder) => {
  fs
  .readdirSync(folder ? __dirname + `/${folder}`: __dirname)
  .forEach(file => {
    if((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')){
      const model = require(path.join(folder ? __dirname + `/${folder}`: __dirname, file))(sequelize, Sequelize.DataTypes, Sequelize.Model);
      db[model.name] = model;
    }else{
      if(file !== basename){
        mapping(file)
      }
    }    
  });
  return;
}
mapping();

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
