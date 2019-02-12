var peer;
var socket;
var myStream;

var users = []

function userFactory(peerid, mediaConnection) {
    return {
        id: peerid,
        video: mediaConnection
    };
}

function stream1(stream) {

}

function getfooteruservideo(peerid) {
    return $('#footer-' + peerid).get(0);
}

function appendstreamtofooter(stream, peerid) {
    $("#footer").append("<video class='footer-video' id='footer-" + peerid + "'></video>");
    var footvid = getfooteruservideo(peerid);
    footvid.srcObject = stream;
    footvid.onloadedmetadata = function (e) {
        footvid.play();
    };
}

function CallUser(peerid) {
    console.log("calling",peerid);
    if(myStream==null){
        let call = Peer.call(peerid);
        call.on('stream',(remotestream)=>{
            appendstreamtofooter(remotestream,call.id);
        });
    }else{
        let call = Peer.call(peerid,myStream);
        call.on('stream',(remotestream)=>{
            appendstreamtofooter(remotestream,call.id);
        });
    }
}

function userJoined(peerid) {
    console.log(peer + " joined.");
}

function userLeft(peerid) {

}

function connectedToPeerJSServer(peerid) {
    // socket.emit('newuser', peerid)
    sayHelloToServer();
}

function incomngCall(call) {
    console.log("incoming");
    if(myStream ==null)
    {
        call.answer();
    }else{
        call.answer(myStream);
        call.on('stream',(remotestream)=>{
            appendstreamtofooter(remotestream,call.id);
        });
    }
}

/*
returns true is success
fail it failed
*/
function initLocalVideo() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 1280,
            height: 720
        }
    }).then(function (stream) {
        myStream = stream;
        var video = document.querySelector('video');
        video.srcObject = myStream;
        video.onloadedmetadata = function (e) {
            video.play();
        };
        appendstreamtofooter(myStream, Peer.id);
    }).catch(function (params) {
        myStream=null;
        alert("Failed to init video!!");
    });
}

function connectToWSServer() {
    socket.connect("localhost:3000");
}

function initWSEvents() {
    socket.on('userjoined', userJoined);
    socket.on('userleft', userLeft);
    socket.on('addexistingpeers',addpeers)
}

function initPeerEvents() {
    Peer.on('open', connectedToPeerJSServer);
    Peer.on('call', incomngCall);
}
function addpeers(peers){
    peers.forEach(peer => {
        console.log(peer);
        CallUser(peer.id);
    });
}
function sayHelloToServer(){
    socket.emit("hello",Peer.id,addpeers);
}

$(document).ready(function () {
    navigator.getUserMedia = navigator.mediaDevices.getUserMedia;
    Peer = new Peer();
    socket = io();
    initWSEvents();
    connectToWSServer();
    initPeerEvents();
    initLocalVideo();
});