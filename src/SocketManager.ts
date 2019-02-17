import { connect } from "socket.io-client"
import { Events } from "./event-manager";
import { User } from "./User/user";

let s:SocketIOClient.Socket;


export class SocketManager {

    constructor() {
        s= connect();
        s.on("userjoined",(user:User)=>{
            Events.userJoinedEvent.post(user)
        })
        s.on("userleft",(user:User)=>{
            Events.userLeftEvent.post(user)
        })
    }
}