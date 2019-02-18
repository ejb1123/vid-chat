import { User } from "./user"
import {Events as f, Events} from "../event-manager"
export class Self extends User {
    getmedia(){
        var t = this;
        var promise = navigator.mediaDevices.getUserMedia({
            audio:false,
            video:{
                width:1280,
                height:720
            }
        })
        promise.then(function(mstream: MediaStream){
            t.mediastream=mstream;
            f.gotSelfMedia.post(t);
        })
        .catch((error:any)=>{
            console.log(error);
        });
    }
    Email:string;

    constructor() {
        super();
        this.name="ej"
        this.getmedia();
        Events.SelfCreated.post(this)
        Events.connectedToPeerJSServers.attach((id:string)=>{
            this.peerid=id;
            console.log(`my id is ${this.peerid}`)
            Events.JoinRoom.post(this)
        })
    }
}