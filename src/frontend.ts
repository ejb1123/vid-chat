import { UserManager } from './UserManager'
import {SocketManager} from './SocketManager'
import {Events} from "./event-manager"
let eventsg = new Events();
let userman :UserManager = new UserManager();
let letsockmanager :SocketManager = new SocketManager();
letsockmanager.setUserConnectionEvents(userman);
userman.createSelf();
