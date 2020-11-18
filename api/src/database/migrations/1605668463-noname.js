'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Push", deps: []
 *
 **/

var info = {
    "revision": 1605668463,
    "name": "noname",
    "created": "2020-11-18T03:01:03.702Z",
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
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "TargetId": {
                "type": Sequelize.STRING,
                "field": "TargetId",
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
}];

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
