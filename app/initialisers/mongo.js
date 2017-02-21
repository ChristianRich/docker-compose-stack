const mongoose = require('mongoose')
    , Promise = require('bluebird')
    , URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';

exports.init = new Promise(function(resolve, reject){

    const options = {

        db: {
            native_parser: true
        },

        promiseLibrary: Promise,

        // This block gets run for a non replica set connection string (eg. localhost)
        server: {
            auto_reconnect: false,
            poolSize: 5,
            reconnectTries: Number.MAX_VALUE,
            ssl: false,
            sslValidate: false,
            socketOptions: {
                keepAlive: 1000,
                connectTimeoutMS: 30000
            }
        },

        // This block gets run when the connection string indicates a replica set (comma seperated connections)
        replset: {
            poolSize: 10,
            connectWithNoPrimary: true,
            ssl: false,
            sslValidate: false,
            socketOptions: {
                keepAlive: 1000,
                connectTimeoutMS: 30000
            }
        }
    };

    mongoose.connection.on('open', function(){
        console.log('Mongo conn open ' + URL);
        resolve();
    });

    mongoose.connection.on('error', function(err){
        reject(err);
    });

    mongoose.connect(
        URL,
        options
    );
});
