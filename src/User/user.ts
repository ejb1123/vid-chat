import { videoFooter } from "../footerbar";
import { Events } from "../event-manager";


export class User {
    mediaconnection:PeerJs.MediaConnection;
    name: string;
    wsid: string;
    peerid: string;
    mediastream: MediaStream;
    footervideo(){
        videoFooter.GetUserDiv(this)
    }
    call()  {
        Events.calluser.post(this)
    };
    
    constructor() {

    }
}