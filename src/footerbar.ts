export class videoFooter {
    GetUserDiv(userid: string){
        document.getElementById("thumbbar")
    }
    static doesthumbexist(Userid: string):boolean{
        let newvid= document.getElementById(`video-thumb-${Userid}`)
        if(newvid==null){
            return false
        }else{
            return true
        }
    }
    static CreateUserDiv(Userid: string, mediaStream: MediaStream){
        if(!this.doesthumbexist(Userid)){
            let newvid= document.createElement("video")
            newvid.className ="footer-video"
            newvid.srcObject=mediaStream;
            newvid.onloadedmetadata = (e)=>{
                newvid.play();
            }
            document.getElementById('thumbbar').append(newvid);
        }
        else{
            throw("vid already exits")
        }
    }
    RemoveUserDiv(Userid:string){
        
    }
    constructor(parameters) {
        
    }
}