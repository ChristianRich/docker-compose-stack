import { Router } from 'express';
import * as bluebird from 'bluebird';
const fs = bluebird.promisifyAll(require('fs'));
export let router = Router();

router.get('/', async (req, res) => {

    let dockerFile,
        nginxConf;

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
    })

    .then(function(){
        res.render('index', {
            dockerCompose: dockerFile,
            nginxConf: nginxConf,
            env: JSON.stringify(process.env, null, 4)
        });
    })
});
