/*
module.exports = { 

	behavior1: function() {  
		return 'HELLO WORLD';
	}, 

	behavior2: function(responseString) {  
		return responseString.toLowerCase();
	}
}
*/
const express 	= require('express');
var logger 		= require('./index.js')(); 

const app 		= express();
app.use(logger);

// console.log(app);


module.exports = { 

	behavior1: function() {  

		app.get((req, res) => { 

			console.log("hello");
			res.send("Hello World!");
		});

		// return 'HELLO WORLD';
	}, 
	 
	behavior2: function(responseString) {  
		return responseString.toLowerCase();
	}
}