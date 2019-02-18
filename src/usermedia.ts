export class UserMedia {
  static localMediastream = null;
  static getmedia(resolve:any) {
    var t = this;
    var promise = navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 1280,
        height: 720,
      }
    })
    promise.then(function (mstream: MediaStream) {
      UserMedia.localMediastream = mstream;
      resolve(mstream);
    })
      .catch((error: any) => {
        console.log(error);
      });
  }
  constructor() {

  }
}