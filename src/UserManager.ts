import {User} from  "./User/user"
import {Self} from "./User/self"
import { UserConnectionEvents } from "./SocketManager"
import { Events} from "./event-manager"
export class UserManager implements UserConnectionEvents {
    selfCreated(): void {

    }
    userjoined(): void{};
    userleft(): void{};
    Self: User;
    users: User[];
    adduser(user: User){

    }
    createSelf(): boolean{
        this.Self = new Self();
        //Events.selfmadeEvent.post(this.Self);
        return true;
    }
    constructor() {
        
    }
}