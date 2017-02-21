const express = require('express')
    , app = express()
    , config = require('./app/config')
    , env = process.env.NODE_ENV || 'development'
    , exphbs = require('express-handlebars')
    , assembleHbsHelpers = require('handlebars-helpers')()
    , Initialisers = require('./app/initialisers')
    , hbsHelpers = require('./hbsHelpers')
    , _ = require('lodash')
    , path = require('path')
    , hbs = exphbs.create({
        extname: '.hbs',
        defaultLayout: 'default',
        layoutsDir: './app/views/layouts',
        partialsDir: './app/views/partials',
        helpers:  _.merge(
            hbsHelpers,
            assembleHbsHelpers
        )
    });

config.configure(env);

app.engine('hbs', hbs.engine);
app.set('view cache', false);
app.set('view engine', 'hbs');
app.set('views', path.join( __dirname, './app/views'));
app.set('trust proxy', true);
app.disable('x-powered-by');

require('./app/middleware/index.js')(app);
require('./app/routes')(app);
require('./app/middleware/errorHandler')(app);

const PORT = process.env.PORT || 3000;

app.set('port', PORT);

new Initialisers(app, function(err){

    if(err){
        console.log(err);
    }

    const server = app.listen(PORT, function() {
        console.info('env: ' + PORT);
        console.info('server running: ' + JSON.stringify(server.address()));
    });
});

module.exports = app;
