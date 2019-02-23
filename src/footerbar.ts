import { Events } from "./event-manager";
import { User } from "./User/user";

export class videoFooter {
    static GetUserDiv(user: User): HTMLVideoElement {
        return <HTMLVideoElement> document.getElementById(`video-thumb-${user.peerid}`)
    }
    static doesthumbexist(user: User): boolean {
        let newvid = this.GetUserDiv(user)
        if (newvid == null) {
            return false
        } else {
            return true
        }
    }
    static setglobalvideo(user: User) {
        let globalvid = <HTMLVideoElement>document.getElementById("video")
        globalvid.srcObject = user.mediastream
        globalvid.onloadedmetadata = (e) => {
            globalvid.play();
        }
    }
    static CreateUserDiv(user: User) {
        if (!videoFooter.doesthumbexist(user)) {
            let newvid = <HTMLVideoElement> document.createElement("video")
            newvid.className = "footer-video"
            newvid.id = `video-thumb-${user.peerid}`
            newvid.srcObject = user.mediastream;
            newvid.onclick = (ev: MouseEvent) => {
                videoFooter.setglobalvideo(user)
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
    static RemoveUserDiv(user: User) {
        document.getElementById(`video-thumb-${user.peerid}`).remove()
    }
    constructor() {
    }
}