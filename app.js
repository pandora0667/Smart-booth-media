const net = require('net');
const mplayer = require('mplayer');
let player = mplayer();
const path = '/home/jusk2/videos/';
const fileName = '1.mp4';

function getConnection(connName) {
    let client = net.connect({port: 5001, host: '203.230.100.177'}, function () {
        console.log(connName + ' Connected: ');
        console.log('   local = %s:%s', this.localAddress, this.localPort);
        console.log('   remote = %s:%s', this.remoteAddress, this.remotePort);
        this.setEncoding('utf-8');
        register(client);

        this.on('data', function (data) {
            let re = /\0/g;
            let str = data.toString().replace(re, "");
            let msg = JSON.parse(str);

            if (msg.value >= 100) {
                player.openFile(path+fileName);
            }
        });

        this.on('end', function () {
            console.log(connName + ' Client disconnected');
        });

        this.on('error', function () {
            console.log('Socket Error: ', JSON.stringify(err));

        });

        this.on('timeout', function () {
            console.log('Socket Timed Out');

        });

        this.on('close', function () {
            console.log('Socket Closed');

        });
    })
}

function register(socket) {
    let serviceRegister = {code: 'register', service: 'media'};
    socket.write(JSON.stringify(serviceRegister));
}

const node1 = getConnection('node1');