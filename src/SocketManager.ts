import { connect } from "socket.io-client"
let s:any;

export interface funcs{
    userjoined():void;
    userleft():void;
}

export class SocketManager {
    lfuncs: funcs;
    constructor(functions: funcs) {
        this.lfuncs = functions;
        s = connect();
    }
    setnewuserjoinfunc(func: Function){
        s.on("userjoined",this.lfuncs.userjoined);
        s.on("userleft",this.lfuncs.userleft);
    }
}