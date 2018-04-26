# muffin-logger-express

This library allows you to quickly integrate logger in your node.js application. The library can be used with express as middleware. It structures your everyday logs. Each log is created with respect to current date. Logs are categorized in different folders (by default) as follows : 
  - server-logs
  - default-logs
  - error-logs

Once the server runs - log folders will contain log files. eg: default-logs/2018-3-25-log. 
Each log line is saved as an object in the log file. Which can be usefull in  purpose to generate reports if required. 
eg: 
``` json
{"datetime":"2018-3-25 15:15:15","ip":"::1","ips":[],"method":"GET","path":"/log","query":{},"params":{},"log":"Just a normal log ... "}
```

##### You can also:
  - Integrate Rollbar for error notifications.
 


### Installation

```sh
$ npm install muffin-logger-express
```

### Plugins

muffin-logger-express is currently extended with the following optional node library for error notification.

| Library | NPM Link |
| ------ | ------ |
| Rollbar | https://www.npmjs.com/package/rollbar |


### Usage

```javascript
const express 	= require('express');
const app 		= express();
const Muffin = require('muffin-logger-express');
app.use(Muffin.middleware); // express application

// logs server requests 
app.get('/', (req, res) => { 
	res.send("Hello World!");
});

// logs errors in error file 
app.get('/error', (req, res) => {
	req.error("Error log ...");
	res.send("Logged error!");
});

// logs prints in default log file 
app.get('/log', (req, res) => {
	req.log("Just a normal log ... ");
	res.send("Logged print!");
});
```


##### To configure muffin-logger-express for custom folder structure and fields.


``` javascript
const Muffin = require('muffin-logger-express');
Muffin.setConfiguration({
	error_log_folder	: path.resolve('./') + '/log/', 
	server_log_folder	: path.resolve('./') + '/log/',  
	default_log_folder	: path.resolve('./') + '/log/', 
	fields				: ['ip', 'ips', 'method', 'path', 'query', 'params', 'body'] // Fields to be printed in server request log
});
app.use(Muffin.middleware); // express application
```


##### Integrating Rollbar

``` javascript
const Muffin = require('muffin-logger-express');
Muffin.setConfiguration({
	rollbar				: { 
	    token : <your-rollbar-post_server_item>, // token provided by rollbar
	    evn   : ['production', 'staging'] // on which server environment to run rollbar error notifier
	}
});
app.use(Muffin.middleware); // express application
```


##### default logs
 By default- default logs (print statements) will be logged on non production environment. 
To make it log on production environment you will need to set log priority parameter.
If log priority is more then 0 then it will be logged on all environment.
req.log(< object >, < priority >);
 
 ``` javascript
app.get('/log', (req, res) => {
	req.log("Just a normal log ... ", 1); // Setting log priority 1(more then 0) to log on all environments
	res.send("Logged print!");
});
 ```
 

### Example app
For an example we have created an app file - start.js
```sh
$ node start.js
```


### Development

Want to contribute? Great!
muffin-logger-express is an open source with a https://github.com/prajyotpro/muffin-logger-express on GitHub.

To help make sure we are building the right things in the right order, we ask that you create issues and pull requests or simply upvote or comment on existing issues or pull requests.


### Todos

 - Write MORE Tests
 - Integrate more server error notifiers by email ( similar to rollbar ).
 - Integrating gulp
 - Integrating travis


License
----

MIT

