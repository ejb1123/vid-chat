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
    Self: User;
    static users = new Collections.Set<User>();
    
    addUser(user: User){
        console.log(`adding user to users array ${user}`)
        UserManager.users.add(user)
        Events.calluser.post(user);
        // Events
        //this.adduser(user)
    }

    createSelf(resolve:any){
        this.Self = new Self();
        resolve()
    }
    constructor() {
    }
}