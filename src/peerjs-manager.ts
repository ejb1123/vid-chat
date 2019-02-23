import 'peerjs'
import { Events } from './event-manager';
import { User } from './User/user';
import { videoFooter } from './footerbar';
import { Stream } from 'stream';
import { UserManager } from './UserManager';
import { UserMedia } from './usermedia';
export class peerjsManager {
  static localpeerjs: PeerJs.Peer

  calluser(user: User) {
    {
      var tt = peerjsManager.localpeerjs.call(user.peerid, UserMedia.localMediastream)
      console.log(`Calling ${user.peerid}`)
      tt.on("stream", (stream: any) => {
        user.mediastream = stream
        videoFooter.CreateUserDiv(user)
      })
      tt.on("close", () => {
        videoFooter.RemoveUserDiv(user)
      })
    }


    // tt.on("error", (err: any) => {
    //   console.error(err)
    // })
  }
  incomingCall(mediaConnection: PeerJs.MediaConnection) {
    console.log("imcoming user call")
    if (UserMedia.localMediastream == null) {
      mediaConnection.answer(null)
    }
    else {
      mediaConnection.answer(UserMedia.localMediastream)
    }
    let user = UserManager.findUserbyID(mediaConnection.peer)
    if (user == null) {
      console.log("User is null")
    } else {
      mediaConnection.on("stream", (Stream: MediaStream) => {
        user.mediastream = Stream
        videoFooter.CreateUserDiv(user)
      })
    }
    mediaConnection.on("close", () => {
      videoFooter.RemoveUserDiv(user)
    })

  }
  connect(stream:MediaStream) {
    return new Promise((resolve,reject)=>{
      peerjsManager.localpeerjs = new Peer(null);
      peerjsManager.localpeerjs.on("call", this.incomingCall)
      peerjsManager.localpeerjs.on('open', (id: string) => {
        console.log("peerjs onnected")
        resolve()
      })
    })
  }
  constructor() {

  }
}