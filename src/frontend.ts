import { UserManager } from './UserManager'
import {SocketManager} from './SocketManager'
let userman :UserManager = new UserManager();
let letsockmanager :SocketManager = new SocketManager();
letsockmanager.setUserConnectionEvents(userman);
userman.createSelf();

