import  * as tsevents from '../node_modules/ts-events/dist/lib/index';
import {User} from './User/user'
import {videoFooter} from './footerbar'
export interface selfmadeArgs{
  name:string;
  
}
export class Events{
  static selfmadeEvent: tsevents.AsyncEvent<User> = new tsevents.AsyncEvent<User>();
  constructor(){
    Events.selfmadeEvent.attach((args:User)=>{
      videoFooter.CreateUserDiv(args.name,args.mediastream)
    })
  }
}
