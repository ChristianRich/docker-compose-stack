const mongo = require('./mongo')
    , redis = require('./redis')
    , createCustomerRecords = require('./createCustomerRecords')
    , async = require('async');

exports.run = function(app){

    return new Promise(function(resolve, reject){

        const tasks = [
            mongo.init,
            redis.init,
            createCustomerRecords.init
        ];

        async.series(tasks, function(err){

            if(err){
                return reject(err);
            }

            resolve();
        });
    })
};
