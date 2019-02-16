import {User} from  "./User/user"
import {Self} from "./User/self"
import { UserConnectionEvents } from "./SocketManager"
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
        return true;
    }
    constructor() {
        
    }
}