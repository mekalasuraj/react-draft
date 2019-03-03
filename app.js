import express from 'express';
import initializers from './src/server/initializers';

const app = express();
let config = require('config');

// set static stuff
app.use(express.static('dist'));
app.use(express.static('src/client'));

// Initialize dependencies for your app
initializers(app, express, config);
app.listen(config.port, (err) => {
	if (!err) {
		console.log('==========================================================================================');
		console.log(`Application is running in "${process.env.NODE_ENV}" environment via http://${config.host}:${config.port}`);
		console.log('==========================================================================================');
	} else {
		console.log(err);
	}
});
