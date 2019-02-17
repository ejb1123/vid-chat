import { videoFooter } from "../footerbar";


export class User {
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