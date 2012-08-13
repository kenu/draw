var fs = require('fs');
var url = require('url');
var server = require('http').createServer();
var io = require('socket.io').listen(server);

server.listen(52273, function(){
	console.log('Server Running at http://localhost:52273');
});

server.on('request', function(request, response){
	var url_parts = url.parse(request.url, true);
	console.log(":"+url_parts.pathname);
	switch(url_parts.pathname) {
		case '/':
		case 'index.html':
		case 'drawLine.html':
			fs.readFile('drawLine.html', function(error, data){
				response.writeHead(200, {'Content-Type':'text/html'});
				response.end(data);
			});
		    break;
		case '/js/jquery-1.7.1.js':
			fs.readFile('js/jquery-1.7.1.js', function(error, data){
				response.writeHead(200, {'Content-Type':'text/html'});
				response.end(data);
			});
		    break;
		case '/js/socket.io.js':
			fs.readFile('js/socket.io.js', function(error, data){
				response.writeHead(200, {'Content-Type':'text/html'});
				response.end(data);
			});
		    break;
		default:
		    response.write('Unknown path: ' + JSON.stringify(url_parts));
		    response.end();
	}
});


io.sockets.on('connection' , function(socket){

	socket.on('message_start', function(data){
		io.sockets.emit('message_start',data);
		//console.log('message : '+data);
		
	});
	
	socket.on('message_end', function(data){
		io.sockets.emit('message_end',data);
		//console.log('message : '+data);
		
	});
	
	socket.on('moused', function(data){
		socket.broadcast.emit('moused',data);
		//console.log('mousedown message : '+data);
		
	});
	socket.on('mouseu', function(data){
		socket.broadcast.emit('mouseu',data);
		//console.log('mousedup message : '+data);
		
	});
	socket.on('mousem', function(data){
		socket.broadcast.emit('mousem',data);
		//console.log('mousemove message : '+data);
		
	});
	socket.on('touchs', function(data){
		socket.broadcast.emit('touchs',data);
		//console.log('touch start message : '+data);
		
	});
	socket.on('touche', function(data){
		socket.broadcast.emit('touche',data);
		//console.log('touche end message : '+data);
		
	});
	socket.on('touchm', function(data){
		socket.broadcast.emit('touchm',data);
		//console.log('touch move message : '+data);
		
	});
	socket.on('clear', function(data){
		socket.broadcast.emit('clear',data);
		//console.log('clear : '+data);
		
	});
});
