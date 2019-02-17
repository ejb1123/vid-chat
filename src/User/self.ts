import { User } from "./user"
import {Events as f} from "../event-manager"
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
            f.selfmadeEvent.post(t);
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
    }
}