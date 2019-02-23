import * as io from "socket.io-client"
import { Events } from "./event-manager";
import { User } from "./User/user";
import { peerjsManager } from "./peerjs-manager";
import { UserManager } from "./UserManager";



export class SocketManager {
    static s: SocketIOClient.Socket;
    connect() {

        return new Promise((resolve: any, reject: any) => {
            console.log("cpnnect")
            SocketManager.s = io('localhost:3000',{autoConnect:false})
            SocketManager.s.once("connect", (socket) => {
                console.log("socket.io connected")
                resolve()
            })
            SocketManager.s.once('connect_error', function() {
                reject(new Error('connect_error'));
            });
            SocketManager.s.once('connect_timeout', function() {
                reject(new Error('connect_timeout'));
            });
            SocketManager.s.connect();
        })

    }

    getUserList(){
        return new Promise((resolve,reject)=>{
            SocketManager.s.on("existingUsers",(usersstring:string)=>{
                let users = <User[]>JSON.parse(usersstring)
                console.log(users)
                console.log("got users" + users)
                resolve(users)
            })
            SocketManager.s.emit("requestusers")
        })
    }
    emitReadytobecalled(){
        SocketManager.s.emit('callme',JSON.stringify(UserManager.Self))
    }
    joinRoom(){
        return new Promise((resolve,reject)=>{
            SocketManager.s.on("joinsuccess",()=>{
                resolve()
            })
            SocketManager.s.emit("joinroom",JSON.stringify(UserManager.Self))
        })
    }
    constructor() {

    }
}