import { UserManager } from './UserManager'
import {SocketManager} from './SocketManager'
import * as $ from 'jquery'
let userman :UserManager = new UserManager();
let letsockmanager :SocketManager = new SocketManager();
letsockmanager.setUserConnectionEvents(userman);
userman.createSelf();

