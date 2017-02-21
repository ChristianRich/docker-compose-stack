const mongo = require('./mongo')
    , Promise = require('bluebird');

exports.run = function(app){

    const tasks = [
        mongo.init
    ];

    return Promise.all(
        tasks
    )
};
