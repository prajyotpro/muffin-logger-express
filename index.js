'use strict';


/**	Dependencies */
const fs 		= require('fs');
const Rollbar	= require('rollbar');


/** Constants */
const DEFAULT_OPTIONS = { 
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
	for(var key in DEFAULT_OPTIONS) {
		if (options[key] == undefined || options[key] == null) {
			options[key] = DEFAULT_OPTIONS[key];
		}
	}
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


/** Function to init directories
@params : options
*/
const initDir = (options) => {
	if (!fs.existsSync(options.error_log_folder)){
	    fs.mkdirSync(options.error_log_folder);
	}
	if (!fs.existsSync(options.server_log_folder)){
	    fs.mkdirSync(options.server_log_folder);
	}
	if (!fs.existsSync(options.default_log_folder)){
	    fs.mkdirSync(options.default_log_folder);
	}
};


var Muffin = (options) => {

	options = options || DEFAULT_OPTIONS;

	options = constructOptions(options);

	initDir(options);

	/**	
	Function to log server requests
	*/
	var muffinLogger = (req, res, next) => { 

		let log = { datetime: now(), ip: req.ip, ips: req.ips };


		/**	
		Function to log default prints
		*/
		const logDefault = (obj, priority = 0) => { 
			log.log = obj;
			if( process.env != 'production' ||  priority > 0 ) {
				fs.appendFileSync( options.default_log_folder+today()+"-log", '\n' + JSON.stringify(log) );
			}
		};


		/**	
		Function to log errors
		*/
		const logError = (obj) => { 
			log.error = obj;
			fs.appendFileSync( options.error_log_folder+today()+"-errors", '\n' + JSON.stringify(log) );
			if ( checkRollbar(options) ) { 
				let rollbar = new Rollbar(options.rollbar.token);
				if ( Array.isArray(options.rollbar.evn) ) {
					if( options.rollbar.evn.indexOf(process.evn) < 0 ) {
						rollbar.error(obj);
					} 
				} else {
					rollbar.error(obj);
				}
			}
		};


		// Server logs
		options.fields.forEach(function(key) {
			log[key] = req[key];
		});
		fs.appendFileSync( options.server_log_folder+today()+"-server", '\n' + JSON.stringify(log) );
		

		req.log 	= logDefault;
		req.error 	= logError;
		next();
	};


	return muffinLogger;
};


module.exports = Muffin;
