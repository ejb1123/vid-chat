import 'peerjs'
import { Events } from './event-manager';
import { User } from './User/user';
import { videoFooter } from './footerbar';
import { Stream } from 'stream';
import { UserManager } from './UserManager';
import { UserMedia } from './usermedia';
import { SocketManager } from './SocketManager';
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
  }
  incomingCall(mediaConnection: PeerJs.MediaConnection) {
    console.log(`imcoming user call from ${mediaConnection.peer}`)
    mediaConnection.answer(UserMedia.localMediastream)

    let guser = UserManager.findUserbyID(mediaConnection.peer)
    if (guser == null) {
      SocketManager.requestUserData(mediaConnection.peer).then(
        (user: User) => {
          guser = UserManager.addNewUser(user)
          guser.mediaconnection = mediaConnection
          mediaConnection.on("stream", (Stream: MediaStream) => {
            if(Stream==null){
              console.log("stream is null")
            }else{
              console.log(guser)
              guser.mediastream = Stream
              videoFooter.CreateUserDiv(guser)
            }
          })
      
          mediaConnection.on("close", () => {
            videoFooter.RemoveUserDiv(guser)
          })
        })
    }else{

    mediaConnection.on("stream", (Stream: MediaStream) => {
      if(Stream==null){
        console.log("stream is null")
      }else{
        console.log(guser)
        guser.mediastream = Stream
        videoFooter.CreateUserDiv(guser)
      }
    })

    mediaConnection.on("close", () => {
      videoFooter.RemoveUserDiv(guser)
    })
  }

  }
  connect() {
    return new Promise((resolve, reject) => {
      let options: PeerJs.PeerJSOption = {config:{
        iceServers: [
          {urls:'turn:chat.chrobi.me:3478',username:"test",credentialType:"password",credential:"test1"},
          {urls:'stun:stun.l.google.com:19302'}]
      }}
      peerjsManager.localpeerjs = new Peer(options);
      peerjsManager.localpeerjs.on("call", this.incomingCall)
      peerjsManager.localpeerjs.on('open', (id: string) => {
        console.log("peerjs onnected")
        Events.calluser.attach(this.calluser)
        resolve()
      })

    })
  }
  constructor() {

  }
}