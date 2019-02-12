import {User} from  "./User/user"
import {Self} from "./User/self"
import { funcs } from "./SocketManager"
export class UserManager implements funcs {
    userjoined(){};
    userleft(){};
    Self: User;
    users: User[];
    adduser(user: User){

    }
    createSelf(){
        let s = new Self();
    }
    constructor() {
        
    }
}