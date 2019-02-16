import { User } from "./user"
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
        })
        .catch((error:any)=>{
            console.log(error);
        });
    }
    Email:string;

    constructor() {
        super();
        this.getmedia();
    }
}