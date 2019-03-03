import express from 'express';
import initializers from './server/initializers';
import webpack from 'webpack';

const app = express();

process.env.NODE_ENV = 'loc';
let config = require('config');

// set static stuff
app.use(express.static('src/client'));

// loc environment webpack settings
const webpackLocConfig = require('../webpack.loc').default;
const webpackObj = {
    devMiddleware: require('webpack-dev-middleware'),
    config: webpackLocConfig,
    hotMiddleware: require('webpack-hot-middleware')
};
const compiler = webpack(webpackObj.config);
app.use(webpackObj.devMiddleware(compiler, {
    publicPath: webpackLocConfig.output.publicPath
}));
app.use(webpackObj.hotMiddleware(compiler));

initializers(app, express, config);
app.listen(config.port, (err) => {
    if (!err) {
        console.log('====================================================================='); // eslint-disable-line no-console
        console.log(`Application running on "${process.env.NODE_ENV}" environment`); // eslint-disable-line no-console
        console.log('====================================================================='); // eslint-disable-line no-console
        if (process.env.NODE_ENV === 'loc') {
            console.log(`App is running on http://${config.host}:${config.port}`); // eslint-disable-line no-console
        }
    } else {
        console.log(err); // eslint-disable-line no-console
    }
});
