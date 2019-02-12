import { UserManager } from './UserManager'
import {SocketManager} from './SocketManager'
let userman :UserManager = new UserManager();
let letsockmanager : SocketManager = new SocketManager(userman);
userman.createSelf();
