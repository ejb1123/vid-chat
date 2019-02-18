import {User} from  "./User/user"
import {Self} from "./User/self"
import { Events} from "./event-manager"
import * as Collections from '../node_modules/typescript-collections/dist/lib/index';
import { peerjsManager } from "./peerjs-manager";
export class UserManager {
    
    static findUserbyID(id:string):User{
        let luser :User=null
        UserManager.users.forEach((user: User)=>{
            if(user.peerid=== id){
                luser = user
            }
        })
        return luser;
    }
    selfCreated(): void {
        
    }
    Self: User;
    static users = new Collections.Set<User>();
    
    userJoined(user: User){
        console.log(`adding user to users array ${user}`)
        UserManager.users.add(user)
        peerjsManager.calluser(user)
        // Events
        //this.adduser(user)
    }

    createSelf(): boolean{
        this.Self = new Self();
        return true;
    }
    constructor() {
        Events.NewExistingUser.attach(this.userJoined)
    }
}