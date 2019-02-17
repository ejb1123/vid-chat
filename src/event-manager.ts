import  * as tsevents from '../node_modules/ts-events/dist/lib/index';
import {User} from './User/user'
import {videoFooter} from './footerbar'
import { Self } from './User/self';
export interface selfmadeArgs{
  name:string;
  
}
export class Events{
  static selfmadeEvent: tsevents.AsyncEvent<Self> = new tsevents.AsyncEvent<Self>();
  static userJoinedEvent: tsevents.AsyncEvent<User> = new tsevents.AsyncEvent<User>();
  static userLeftEvent: tsevents.AsyncEvent<User> = new tsevents.AsyncEvent<User>();
  static gotSelfMedia: tsevents.AsyncEvent<Self> = new tsevents.AsyncEvent<Self>();
  static SelfCreated: tsevents.AsyncEvent<Self> = new tsevents.AsyncEvent<Self>();
  static connectedToPeerJSServers: tsevents.AsyncEvent<string> = new tsevents.AsyncEvent<string>();
}
