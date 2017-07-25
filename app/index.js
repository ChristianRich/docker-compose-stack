import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import * as path from 'path'
import * as exphbs from 'express-handlebars'

const app = express();
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: './app/views/layouts',
    partialsDir: './app/views/partials',
    helpers: {}
});

app.server = http.createServer(app);

app.engine('hbs', hbs.engine);
app.set('view cache', false);
app.set('view engine', 'hbs');
app.set('views', path.join( __dirname, './views'));

app.use(express.static(path.join(process.cwd(), './app/public'), {
    maxAge: (60 * 60 * 24 * 7) * 1000 // x 1000 because Express middleware expects miliseconds and not seconds
}));

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', require('./routes').router);

export default app;
