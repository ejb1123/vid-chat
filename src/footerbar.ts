import { Events } from "./event-manager";
import { User } from "./User/user";

export class videoFooter {
    static GetUserDiv(User: User) {
        document.getElementById("thumbbar")
    }
    static doesthumbexist(Userid: string): boolean {
        let newvid = document.getElementById(`video-thumb-${Userid}`)
        if (newvid == null) {
            return false
        } else {
            return true
        }
    }
    static setglobalvideo(User: MediaStream) {
        let globalvid = <HTMLVideoElement>document.getElementById("video")
        globalvid.srcObject = User
        globalvid.onloadedmetadata = (e) => {
            globalvid.play();
        }
    }
    static CreateUserDiv(User: User) {
        if (!videoFooter.doesthumbexist(User.peerid)) {
            let newvid = document.createElement("video")
            newvid.className = "footer-video"
            newvid.srcObject = User.mediastream;
            newvid.onclick=(ev: MouseEvent)=>{
                videoFooter.setglobalvideo(<MediaStream>newvid.srcObject)
            }
            newvid.onloadedmetadata = (e) => {
                newvid.play();
            }
            document.getElementById('thumbbar').append(newvid);
        }
        else {
            throw ("vid already exits")
        }
    }
    RemoveUserDiv(Userid: string) {

    }
    constructor() {
        Events.gotSelfMedia.attach(videoFooter.CreateUserDiv)
    }
}