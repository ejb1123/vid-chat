import { videoFooter } from "../footerbar";


export class User {
    mediaconnection:PeerJs.MediaConnection =null;
    name: string;
    wsid: string;
    peerid: string;
    mediastream: MediaStream;
    footervideo(){
        videoFooter.GetUserDiv(this)
    }
    call()  {
        
    };
    
    constructor() {

    }
}