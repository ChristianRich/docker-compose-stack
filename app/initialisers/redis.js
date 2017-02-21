const redis = require('redis')
    , bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

exports.init = function(cb){

    // Ignore Redis on localhost
    if(!process.env.REDIS_PORT){
        return cb();
    }

    let client = redis.createClient(process.env.REDIS_PORT, 'redis');

    client.on('error', function(err){
        cb(err);
    });

    client.on('ready', function(){
        console.log('Redis: ready');
        cb();
    });
};
