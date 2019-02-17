import {Events} from "./event-manager"
import { UserManager } from './UserManager'
import {SocketManager} from './SocketManager'
import {videoFooter } from './footerbar'
import { peerjsManager } from "./peerjs-manager";
let eventsg = new Events();
new peerjsManager();
let userman :UserManager = new UserManager();
new SocketManager();
new videoFooter();
userman.createSelf();
