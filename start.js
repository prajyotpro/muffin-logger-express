const express 	= require('express');
const app 		= express();


const PORT 		= 3030;

// const muffin = require('./index')();
const muffin = require('./index')({
	fields:['ip']});


app.use(muffin);


app.get('/', (req, res) => { 
	res.send("Hello World!");
});


app.get('/error', (req, res) => {
	req.error("Error log ...");
	res.send("Logged error");
});


app.get('/log', (req, res) => {
	req.log("Just a normal log ... ");
	res.send("Logged error");
});


app.listen(PORT, () => console.log('Example app listening on port %d!', PORT));