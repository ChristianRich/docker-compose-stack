const Promise = require('bluebird')
    , fs = Promise.promisifyAll(require('fs'));

module.exports = function(req, res){

    fs.readFileAsync(
        process.cwd() + '/docker-compose.yaml', 'utf-8'
    )

    .then(function(file){

        res.render('home/index', {
            dockerCompose: file,
            env: JSON.stringify(process.env, null, 4)
        });
    })

    .catch(function(err){
        throw err;
    });
};
