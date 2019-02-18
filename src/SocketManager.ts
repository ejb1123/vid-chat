import { connect } from "socket.io-client"
import { Events } from "./event-manager";
import { User } from "./User/user";
import { peerjsManager } from "./peerjs-manager";
import { UserManager } from "./UserManager";

let s: SocketIOClient.Socket;


export class SocketManager {

    constructor() {
        s = connect();
        s.on("userjoined", (user: string) => {
            let luser = JSON.parse(user)
            console.log("user joined socket")
            //Events.userJoinedEvent.post(luser)
        })
        s.on("userleft", (user: string) => {
            let luser = JSON.parse(user)
            Events.userLeftEvent.post(luser)
        })
        s.on("existingUsers", (usersstring:string) => {
            let users = JSON.parse(usersstring)
            console.log(users)
            for (let index = 0; index < users.length; index++) {
                const user = users[index];
                if (user.peerid != peerjsManager.localpeerjs.id) {
                    Events.NewExistingUser.post(user)
                }
            }
        })
        /**
         * Called When user is connected to peerjs server and is ready to comunicate with main WS server
         */
        Events.JoinRoom.attach((user: User) => {
            user.wsid = s.id;
            s.emit("joinedroom", JSON.stringify(user))
        })
    }
}