const net = require('net');
const express = require('express'); 
const mplayer = require('mplayer');
const app = express(); 
let player = new mplayer();

app.listen(3000, function() {
  console.log('kiosk media listeing 3000 port!!'); 
});  

function getConnection(connName) {
    let client = net.connect({port: 5001, host: 'jusk2.asuscomm.com'}, function () {
        console.log(connName + ' Connected: ');
        console.log('   local = %s:%s', this.localAddress, this.localPort);
        console.log('   remote = %s:%s', this.remoteAddress, this.remotePort);
        this.setEncoding('utf8');
        register(client);
		

        this.on('data', function (data) {
            let re = /\0/g;
            let str = data.toString().replace(re, "");
            let msg = JSON.parse(str);
			console.log(msg);

			if (msg.value !== undefined) {
				player.openFile('/home/jusk2/Videos/2.mp4');
				player.status = {
					volume: 100, 
					fullscreen: true
				}; 
			}

        });
        this.on('end', function () {
            console.log(connName + ' Client disconnected');
        });
        this.on('error', function (err) {
            console.log('Socket Error: ', JSON.stringify(err));
        });
        this.on('timeout', function () {
            console.log('Socket Timed Out');
        });
        this.on('close', function () {
            console.log('Socket Closed');
        });
    });
    return client;
}


function register(socket) {
    let serviceRegister = {code: 'register', service: 'media'};
    socket.write(JSON.stringify(serviceRegister));
}

const node1 = getConnection('node1');
