import { connect } from "socket.io-client"
let s:SocketIOClient.Socket;

export interface UserConnectionEvents{
    userjoined():void;
    userleft():void;
}

export class SocketManager {
    lfuncs: UserConnectionEvents;

    constructor() {
        s= connect();
    }

    setUserConnectionEvents(functions: UserConnectionEvents){
        this.lfuncs = functions;
        s.on("userjoined",this.lfuncs.userjoined);
        s.on("userleft",this.lfuncs.userleft);
    }

}