import { connect } from "socket.io-client"
import { Events } from "./event-manager";
import { User } from "./User/user";
import { peerjsManager } from "./peerjs-manager";
import { UserManager } from "./UserManager";
import { Self } from "./User/self";



export class SocketManager {
    static s: SocketIOClient.Socket;

    connect(res) {
        SocketManager.s = connect();
        SocketManager.s.on("connection",(socket)=>{
            console.log("set id")
            UserManager.Self.wsid=SocketManager.s.id;
        })
        SocketManager.s.on("existingUsers", (usersstring: string) => {
            let users = <User[]>JSON.parse(usersstring)
            console.log(users)
            console.log("got users" + users)
            res(users)
        })
        SocketManager.s.emit("joinedroom",JSON.stringify(UserManager.Self))
    }
    constructor() {

    }
}