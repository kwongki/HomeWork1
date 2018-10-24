/* 
 * HomeWork Assignment #1
 * Hello World REST API
 *
 * This REST API will accept a call to the port of choice (3000) 
 * and route /hello and respond with a welcome message
 */

 var http = require('http');
 var url = require('url');

 var httpServer = http.createServer(function(req, res){
 	unifiedServer(req, res);
 });

//Start HTTP Server
httpServer.listen(3000, function(){
	console.log("~~~~ Homework Assignment #1 ~~~~");
	console.log("Started HTTP Server on port 3000 ....");
})

var unifiedServer = function(req, res) {
 	// Parse URL
 	var parseURL = url.parse(req.url, true);

 	// Get path
 	var path = parseURL.pathname;
 	var trimmedPath = path.replace(/^\/+|\/+$/g, '');
 	
 	req.on('data', function(data) {
 		// Do nothing, but it's required
 	});
 	req.on('end', function() {

 		// Decide which handler will take the request 
 		// by trying to match the request path. If no match, default to notFound route
 		var choseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

 		// Construct the data object to send to handler. 
 		// In this example, the contents of the data object is not important
 		var data = {
 			'trimmedPath' : trimmedPath
 		};

 		// Since I have decide on the handler, run it
 		choseHandler(data, function(statusCode, payload) {
 			// Decide on the status code based on what the handler sent back, default it 200
 			var statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

 			// Check if payload is sent back by handler or not, default to empty object
 			var payload = typeof(payload) == 'object' ? payload : {};

 			// Convert payload to a string
 			var payloadString = JSON.stringify(payload);

 			// Return the response
 			res.setHeader('Content-Type', 'application/json');
 			res.writeHead(statusCode);
 			res.end(payloadString);

 			 // Log to console
 			 console.log('Responding with this content: ', statusCode, payloadString);
 		});

 	});
};

// Define the handlers object
var handlers = {};

// Define /hello handler
handlers.hello = function(data, callback) {

	// Respond with the message "Hello World!" wrapped in object
	var respondMsg = {
		'Response' : 'Hello World!'
	};
	callback(200, respondMsg);
};

// Default Not Found handler
handlers.notFound = function(data, callback) {
	callback(404);
};

// Define request router
var router = {
	'hello' : handlers.hello
};