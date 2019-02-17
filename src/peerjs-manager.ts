import 'peerjs'
import { Self } from './User/self';
import { Events } from './event-manager';
export class peerjsManager {
  static localpeerjs: PeerJs.Peer
  static localpeerjsMedia: MediaStream
  constructor() {
    peerjsManager.localpeerjs= new Peer(null);
    peerjsManager.localpeerjs.on('open',(id:string)=>{
      Events.connectedToPeerJSServers.post(id);
    })
    Events.selfmadeEvent.attach((self:Self)=>{
      
    })
    Events.gotSelfMedia.attach((self:Self)=>{
      peerjsManager.localpeerjsMedia= self.mediastream
    })
  }
}