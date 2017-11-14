const config = require('./server/configs/' + process.env.NODE_ENV);
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

//server config
app.set('server', `${config.server.host}:${config.server.port}`);
app.set('client', `${config.client.host}:${config.client.port}`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', app.get('client'));
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

//routes
app.get('/', (req, res) => {
	res.send(`<h1>Cross | Over (${process.env.NODE_ENV})</h1>`);
});

app.use('/contacts', require('./server/routes/contacts'));

//start the server
app.listen(config.server.port, () => {
	console.log(`Server running on: ${app.get('server')}`);
	console.log(`Allowing CROS from: ${app.get('client')}`);
});