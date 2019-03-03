import path from 'path';
import compression from 'compression';
import bPromise from 'bluebird';
import expressValidator from 'express-validator';
import cryptoJs from 'crypto-js';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import expressHBS from 'express-hbs';
import expressSession from 'express-session';
import aws from 'aws-sdk';
import bunyan from 'bunyan';
import routes from './routes';
import apiRoutes from './apiRoutes';

export default (app, express, config) => {


    function reqSerializer(req) {
        return {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req.body,
            user: req.user
        };
    }

    let logErrorPath = '';

    if(process.platform === 'darwin' || process.platform === 'linux') {
        // this is a linux system
        logErrorPath = '/var/log/ctemps-app/ctemps-error.log';
    } else {
        logErrorPath = 'C:\\log\\ctemps-app\\ctemps-error.log';
    }

    const logger = bunyan.createLogger({
        name: "ctemps-app",
        serializers: {
            req: reqSerializer
        },
        streams: [
            {
                level: 'info',
                stream: process.stdout
            },
            {
                level: 'error',
                path: logErrorPath
            }
        ]
    });

    const dbPromise = require('pg-promise')({ promiseLib: bPromise })(config.dbConnectionString);

    // initialize AWS
    aws.config.update({
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
        signatureVersion: config.aws.signatureVersion
    });
    aws.config.update({region:'us-east-1'});

    /******************************************  UTILITIES  ******************************************/

    const responseUtility = require('../services/utilities/responseUtility').default(logger);
    const secureUtility = require('../services/utilities/secureUtility').default(cryptoJs, config, crypto);
    const authUtility = require('./authUtility').default();

    /******************************************  REPOSITORIES  ******************************************/

    
    const configRepository = require('../repositories/configRepository').default(dbPromise);

    /******************************************  SERVICES  ******************************************/
    
    const configService = require('../services/configService').default(configRepository,secureUtility,responseUtility);
    /******************************************  CONTROLLERS  ******************************************/

    const controllers = {
        home: require('../controllers/homeController').default(),
        auth: require('../controllers/authController').default(responseUtility)
    };
 /******************************************  APIS  ******************************************/
 const apis = {
    configApis: require('../apis/configApis').default(configService)
};
    app.engine('hbs', expressHBS.express4({
        partialsDir: path.resolve('./src/server/views/partials'),
        layoutsDir: path.resolve('./src/server/views/layouts')
    }));

    app.set('view engine', 'hbs');
    app.set('views', path.resolve('./src/server/views'));
    app.use(expressValidator());
    app.use(require('cookie-parser')());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
    require('./passport').default(app,configService ,responseUtility);

    app.use((req, res, next) => {
        res.locals.user = req.user;
        res.locals.isAuthenticated = req.isAuthenticated();
        next();
    });

    let router = express.Router();
    routes(router, controllers, authUtility);
    apiRoutes(router, apis, controllers,authUtility);
    app.use((req, res, next) => {
        req.responseUtility = responseUtility;
        req.config = config;
        next();
    });
    app.use(router);

};
