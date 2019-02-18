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
        SocketManager.s.on("existingUsers", (usersstring: string) => {
            let users = <User[]>JSON.parse(usersstring)
            console.log(users)
            res(users)
        })
    }
    constructor() {

    }
}