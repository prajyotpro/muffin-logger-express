const express 	= require('express');
const app 		= express();
const path 		= require('path');

const PORT 		= 3030;


const Muffin = require('./index');

/*
Muffin.setConfiguration({
	error_log_folder	: path.resolve('./') + '/log/', 
	server_log_folder	: path.resolve('./') + '/log/', 
	default_log_folder	: path.resolve('./') + '/log/', 
	fields				: ['ip', 'ips', 'method', 'path', 'query', 'params', 'body'], 
	rollbar				: {
	}
});
*/

app.use(Muffin.middleware);


app.get('/', (req, res) => { 
	res.send("Hello World!");
});


app.get('/error', (req, res) => {
	req.error("Error log ...");
	res.send("Logged error!");
});


app.get('/log', (req, res) => {
	req.log("Just a normal log ... ");
	res.send("Logged print!");
});


app.listen(PORT, () => console.log('Muffin logger listening on port %d!', PORT));