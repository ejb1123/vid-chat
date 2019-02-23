import { Events } from "./event-manager";
import { User } from "./User/user";

export class videoFooter {
    static GetUserDiv(user: User): HTMLVideoElement {
        return <HTMLVideoElement>document.getElementById(`video-thumb-${user.peerid}`)
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
        if (user.mediastream == null) {
            console.log("mediasteam null")
        }
        else
            if (!videoFooter.doesthumbexist(user)) {

                let insertvid = document.createElement("video")
                insertvid.className = "footer-video"
                insertvid.id = `video-thumb-${user.peerid}`
                insertvid.srcObject = user.mediastream;
                insertvid.onclick = (ev: MouseEvent) => {
                    videoFooter.setglobalvideo(user)
                }

                insertvid.onloadedmetadata = (e: Event) => {
                    insertvid.play().catch((err) => {
                        console.error(err)
                        throw err
                    });
                }
                document.getElementById('thumbbar').append(insertvid);
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