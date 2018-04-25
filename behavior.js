var logger 		= require('./index.js'); 


const express 	= require('express');
const fs 		= require('fs');



module.exports = { 

	setConfiguration: function(config) { 
		config = logger.setConfiguration(config);
		return config;
	}, 

	checkIfServerLogFolderExists: function() {
		logger.initDir();
		return fs.existsSync(logger.configuration.server_log_folder)
	},

	checkIfDefaultLogFolderExists: function() {
		logger.initDir();
		return fs.existsSync(logger.configuration.default_log_folder)
	},

	checkIfDefaultErrorFolderExists: function() {
		logger.initDir();
		return fs.existsSync(logger.configuration.error_log_folder)
	},
	 
	logDefault: function(obj) {  
		return logger.logDefault(obj);
	}
}