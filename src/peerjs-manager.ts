import 'peerjs'
import { Self } from './User/self';
import { Events } from './event-manager';
import { User } from './User/user';
import { videoFooter } from './footerbar';
import { Stream } from 'stream';
import { UserManager } from './UserManager';
export class peerjsManager {
  static localpeerjs: PeerJs.Peer
  static localpeerjsMedia: MediaStream

  static calluser(user: User) {
    var tt = peerjsManager.localpeerjs.call(user.peerid, peerjsManager.localpeerjsMedia)
    user.mediaconnection = tt;
    console.log(tt)
    console.log(`Calling ${user.peerid}`)
    user.mediaconnection.on("stream", (stream: MediaStream) => {
      user.mediastream = stream
      videoFooter.CreateUserDiv(user)
    })
    user.mediaconnection.on("close", () => {
      videoFooter.RemoveUserDiv(user.peerid)
    })
    user.mediaconnection.on("error", (err: any) => {
      console.error(err)
    })
  }
  incomingCall(mediaConnection: PeerJs.MediaConnection) {
    console.log("imcoming user call")
    mediaConnection.answer(peerjsManager.localpeerjsMedia)
    let user = UserManager.findUserbyID(mediaConnection.peer)
    if (user == null) {
      console.log("User is null")
      mediaConnection.on("stream", (Stream: MediaStream) => {
        videoFooter.CreateUserDivbyid(mediaConnection.peer,Stream)
      })
    } else {
      mediaConnection.on("stream", (Stream: MediaStream) => {
        user.mediastream = Stream
        videoFooter.CreateUserDiv(user)
      })
    }
    mediaConnection.on("close",()=>{
      videoFooter.RemoveUserDiv(mediaConnection.peer)
    })

  }
  constructor() {
    peerjsManager.localpeerjs = new Peer(null);
    peerjsManager.localpeerjs.on("call", this.incomingCall)
    peerjsManager.localpeerjs.on('open', (id: string) => {
      Events.connectedToPeerJSServers.post(id);
    })

    Events.selfmadeEvent.attach((self: Self) => {

    })
    // Events.NewExistingUser.attach((user:User)=>{

    // })
    Events.gotSelfMedia.attach((self: Self) => {
      peerjsManager.localpeerjsMedia = self.mediastream
    })
  }
}