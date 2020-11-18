'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Push", deps: []
 * createTable "User", deps: []
 *
 **/

var info = {
    "revision": 1605695061,
    "name": "noname",
    "created": "2020-11-18T10:24:21.681Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Push",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "TargetId": {
                    "type": Sequelize.STRING,
                    "field": "TargetId",
                    "allowNull": false
                },
                "pendente": {
                    "type": Sequelize.BOOLEAN,
                    "field": "pendente",
                    "allowNull": false
                },
                "confirma": {
                    "type": Sequelize.BOOLEAN,
                    "field": "confirma",
                    "allowNull": false
                },
                "DeviceId": {
                    "type": Sequelize.STRING,
                    "field": "DeviceId",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "User",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true,
                    "allowNull": false
                },
                "deviceId": {
                    "type": Sequelize.STRING,
                    "field": "deviceId",
                    "unique": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
