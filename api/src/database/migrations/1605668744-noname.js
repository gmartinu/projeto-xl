'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "pendente" to table "Push"
 * addColumn "InitId" to table "Push"
 * changeColumn "TargetId" on table "Push"
 *
 **/

var info = {
    "revision": 1605668744,
    "name": "noname",
    "created": "2020-11-18T03:05:44.103Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Push",
            "pendente",
            {
                "type": Sequelize.BOOLEAN,
                "field": "pendente",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Push",
            "InitId",
            {
                "type": Sequelize.STRING,
                "field": "InitId",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Push",
            "TargetId",
            {
                "type": Sequelize.STRING,
                "field": "TargetId",
                "allowNull": false
            }
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
