import { User } from "./user"
import {Events as f, Events} from "../event-manager"
export class Self extends User {
    Email:string;

    constructor() {
        super();
        console.log("made self")
        this.name="ej"
    }
}