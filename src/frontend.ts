import { Events } from "./event-manager"
import { UserManager } from './UserManager'
import { SocketManager } from './SocketManager'
import { videoFooter } from './footerbar'
import { peerjsManager } from "./peerjs-manager";
import { UserMedia } from "./usermedia";
import { User } from "./User/user";

new Events();
new UserMedia();
new videoFooter();
var socketmanager = new SocketManager();
let peerjsmanager = new peerjsManager();
let userman: UserManager = new UserManager();

UserMedia.getmedia()
  .then(
    (stream: MediaStream) => {
      UserMedia.localMediastream = stream;
      return peerjsmanager.connect(stream)
    }
  ).catch((err: any) => {
    console.error(err)
    UserMedia.localMediastream=new MediaStream()
    return(peerjsmanager.connect(UserMedia.localMediastream))
  })
  .then(socketmanager.connect)
  .then(userman.createSelf)
  .then(socketmanager.joinRoom)
  .then(socketmanager.getUserList)
  .then((res: User[]) => {
    userman.addUsers(res)
  }).then(()=>{
    videoFooter.CreateUserDiv(UserManager.Self)
  })
  .then(()=>{
    socketmanager.emitReadytobecalled()
  })
