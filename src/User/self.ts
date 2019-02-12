import { User } from "./user"
export class Self extends User {
    getmedia(){
        var promise = navigator.mediaDevices.getUserMedia({
            audio:false,
            video:{
                width:1280,
                height:720
            }
        })
        var t = this;
        promise.then(function(mstream: MediaStream){
           // this.mediastream=mstream;
           t.mediastream=mstream;
        })
        .catch((error:any)=>{
            console.log(error);
        });
    }
    constructor() {
        super();
        this.getmedia();
    }
}