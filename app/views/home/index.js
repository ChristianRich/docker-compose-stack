const Promise = require('bluebird')
    , fs = Promise.promisifyAll(require('fs'))
    , models = require('../../models')
    , redis = require('redis');

module.exports = function(req, res){

    let dockerFile,
        nginxConf,
        customers;

    fs.readFileAsync(
        process.cwd() + '/docker-compose.yaml', 'utf-8'
    )

    .then(function(file){
        dockerFile = file;

        return fs.readFileAsync(
            process.cwd() + '/nginx/nginx.conf', 'utf-8'
        )
    })

    .then(function(file){
        nginxConf = file;

        return models.customer.find()
            .lean()
    })

    .then(function(response){
        customers = response;

        if(process.env.REDIS_PORT){
            let client = redis.createClient(process.env.REDIS_PORT, 'redis');
            client.set('fox', 'The quick brown fox jumps over the lazy dog', redis.print);

            return client.getAsync('fox');
        }
    })

    .then(function(redisReplies){
        res.render('home/index', {
            dockerCompose: dockerFile,
            nginxConf: nginxConf,
            customers: JSON.stringify(customers, null, 4),
            env: JSON.stringify(process.env, null, 4),
            redis: redisReplies,
        });
    })

    .catch(function(err){
        throw err;
    });
};
