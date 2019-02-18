import { Events } from "./event-manager"
import { UserManager } from './UserManager'
import { SocketManager } from './SocketManager'
import { videoFooter } from './footerbar'
import { peerjsManager } from "./peerjs-manager";
import { UserMedia } from "./usermedia";

new Events();
new UserMedia();
new videoFooter();
new SocketManager();
let peerjsmanager = new peerjsManager();
let userman: UserManager = new UserManager();
const getmediapromise = new Promise((resolve) => {
  UserMedia.getmedia(resolve);
})

const createselfpromise = new Promise((resolve) => {
  userman.createSelf(resolve);
})

const getUserList = new Promise((resolve)=>{
  
})

getmediapromise.then(
  (stream: MediaStream) => { peerjsmanager.connect(stream) }
).then((res) => {
  return createselfpromise
}).then((res)=>{

})
