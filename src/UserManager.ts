import {User} from  "./User/user"
import {Self} from "./User/self"
import { Events} from "./event-manager"
export class UserManager {
    selfCreated(): void {

    }
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