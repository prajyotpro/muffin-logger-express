'use strict';


/**	Dependencies */
const fs 		= require('fs');
const Rollbar	= require('rollbar');


/** Constants */
const DEFAULT_CONFIG = { 
	error_log_folder	: __dirname + '/error-log/', 
	server_log_folder	: __dirname + '/server-log/', 
	default_log_folder	: __dirname + '/default-log/', 
	fields				: ['ip', 'ips', 'method', 'path', 'query', 'params', 'body']
};


/** Function to get current date
*/
const today = (time = false) => { 
	let d = new Date();
	if (!time) {
		return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
	}
	return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
};


/** Function to get current datetime
*/
const now = () => { 
	return today(true);
};


/** Function to validate options
*/
const constructOptions = (options) => { 
	options = typeof options == 'object' ? options : {};
	for(var key in DEFAULT_CONFIG) {
		if (options[key] == undefined || options[key] == null) {
			options[key] = DEFAULT_CONFIG[key];
		}
	}
	options.log_object = ['datetime', 'ip', 'ips'];
	return options;
};


/** Function to check rollbar
*/
const checkRollbar = (options) => {
	if (!options.rollbar) {
		return false;
	}
	if (!options.rollbar.token) {
		return false;
	}
	return true;
};


/** main
*/
var MuffinLogger = function() {

	this.configuration 		= DEFAULT_CONFIG

	this.setConfiguration 	= constructOptions


	/** Function to init directories 
	*/
	this.initDir 			= () => {
		if (!fs.existsSync(this.configuration.error_log_folder)){
	    	fs.mkdirSync(this.configuration.error_log_folder);
		}
		if (!fs.existsSync(this.configuration.server_log_folder)){
		    fs.mkdirSync(this.configuration.server_log_folder);
		}
		if (!fs.existsSync(this.configuration.default_log_folder)){
		    fs.mkdirSync(this.configuration.default_log_folder);
		}
	}


	/**	Function to log default print
	*/
	this.logDefault 		= (obj, priority = 0) => { 
		if( process.env != 'production' ||  priority > 0 ) {
			fs.appendFileSync( this.configuration.default_log_folder+today()+"-log", '\n' + JSON.stringify(obj) );
		}
	}

 
	/**	
	Function to log errors
	*/
	this.logError 			= (obj) => { 
		fs.appendFileSync( this.configuration.error_log_folder+today()+"-errors", '\n' + JSON.stringify(obj) );
		if ( checkRollbar(this.configuration) ) { 
			let rollbar = new Rollbar(this.configuration.rollbar.token);
			if ( Array.isArray(this.configuration.rollbar.evn) ) {
				if( this.configuration.rollbar.evn.indexOf(process.evn) >= 0 ) {
					rollbar.error(obj);
				} 
			} else {
				rollbar.error(obj);
			}
		}
	};


	/**	Middlewear function
	*/
	this.middlewear  		= (req, res, next) => { 

		let log = { datetime: now(), ip: req.ip, ips: req.ips };


		/**	Function to log default prints
		*/
		const logDefault = (obj, priority = 0) => { 
			log.log = obj;
			this.logDefault(log, priority);
		};


		/**	Function to log errors
		*/
		const logError = (obj) => { 
			log.error = obj;
			this.logError(log);
		};


		// Server logs
		this.configuration.fields.forEach(function(key) {
			log[key] = req[key];
		});
		fs.appendFileSync( this.configuration.server_log_folder+today()+"-server", '\n' + JSON.stringify(log) );
		

		req.log 	= logDefault;
		req.error 	= logError;
		next();
	};
}


module.exports = new MuffinLogger();
