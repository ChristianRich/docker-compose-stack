const express = require('express')
    , app = express()
    , exphbs = require('express-handlebars')
    , assembleHbsHelpers = require('handlebars-helpers')()
    , path = require('path')
    , initialisers = require('./initialisers')
    , hbs = exphbs.create({
        extname: '.hbs',
        defaultLayout: 'default',
        layoutsDir: './app/views/layouts',
        partialsDir: './app/views/partials',
        helpers: assembleHbsHelpers
    });

app.engine('hbs', hbs.engine);
app.set('view cache', false);
app.set('view engine', 'hbs');
app.set('views', path.join( __dirname, './views'));
app.use(express.static(path.join(process.cwd(), './app/public'), {
    maxAge: (60 * 60 * 24 * 7) * 1000 // x 1000 because Express middleware expects miliseconds and not seconds
}));

app.get('/', require('./views/home'));

const startServer = function(){
    const server = app.listen(3000, '0.0.0.0', function() {
        console.info('Express server running: ' + JSON.stringify(server.address()));
    });
};

initialisers.run(
    app
)

.then(function(){
    startServer();
})

.catch(function(err){
    throw(err);
});

