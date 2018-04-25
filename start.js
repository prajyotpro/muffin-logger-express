const express 	= require('express');
const app 		= express();


const PORT 		= 3030;


const Muffin = require('./index');

/*
Muffin.setConfiguration({
	error_log_folder	: __dirname + '/log/', 
	server_log_folder	: __dirname + '/log/', 
	default_log_folder	: __dirname + '/log/', 
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