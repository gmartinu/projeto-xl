'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "InitId" from table "Push"
 * addColumn "DeviceId" to table "Push"
 *
 **/

var info = {
    "revision": 1605670595,
    "name": "noname",
    "created": "2020-11-18T03:36:35.789Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Push", "InitId"]
    },
    {
        fn: "addColumn",
        params: [
            "Push",
            "DeviceId",
            {
                "type": Sequelize.STRING,
                "field": "DeviceId",
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
