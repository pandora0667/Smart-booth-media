'use strict';

const mplayer = require('mplayer');
const socket = require('socket.io-client')('http://jusk2.asuscomm.com:5002');
let player = new mplayer();
let count = 0;
socket.on('connected', function (data) {
    console.log(data);
});

socket.on('media', function (data) {

    if (data >= 100 && count === 1) {
        console.log('영상을 재생합니다.');
        player.openFile('/home/jusk2/Videos/2.mp4');
        player.status = {
            volume: 100,
            fullscreen: true
        };
        count++;
    } else if (data < 100 && count !==1) {
        count = 1;
    }
});