'use babel';

export default class VideoElementView {

  video_id: null;
  playlist: null;

  constructor(controller) {
    this.controller = controller;
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
  }

  getElement() {
    if(this.playlist != null){
      html = `<div class="ync-video"><iframe id="player" type="text/html" width="640" height="390"
        src="http://www.youtube.com/embed/`+this.video_id+`?list=`+this.playlist+`&enablejsapi=1"
        frameborder="0"></iframe></div>`;
    }else{
      html = `<div class="ync-video"><iframe id="player" type="text/html" width="640" height="390"
        src="http://www.youtube.com/embed/`+this.video_id+`?enablejsapi=1"
        frameborder="0"></iframe></div>`;
    }
    return html;
  }

  setVideoID(vid_id){
    this.video_id = vid_id;
  }

  setPlaylist(list_id){
    this.playlist = list_id;
  }

  formatURL(url){
    var url_arr = url.split("//");
    var ret = {};
    if(url_arr.length > 0){
        url_arr = url_arr[1];
    }else{
        url_arr = url_arr[0];
    }
    url_arr = url_arr.split("/");
    if (url_arr.length > 0) {
        ret["domain"] = url_arr[0];
        params = url_arr[url_arr.length - 1].split("?")[1];
        params = params.split("&");
        for (var i = 0; i < params.length; i++) {
            var x = params[i].split("=");
            ret[x[0]] = x[1];
        }
    }else{
        return "";
    }
    return ret;
  }
}
