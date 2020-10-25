'use babel';

import parseUrl from 'parse-url';

export default class VideoElementView {

    src = "";

    constructor(controller) {
        this.controller = controller;
    }

    // Returns an object that can be retrieved when package is activated
    serialize() {}

    // Tear down any state and detach
    destroy() {}

    getElement() {
        var html = "";
        if(this.src != ""){
            html = `
            <div class="ync-video">
                <iframe id="player" type="text/html" class="ync-frame" src="`+this.src+`" frameborder="0"></iframe>
            </div>`;
        } else {
            html = `
            <div style="text-align:center; padding-top:10px;">
                <h2>Stumbled upon a broken link.</h2>
                <h4>Please only enter valid YouTube urls. Copy paste the youtube link from the url bar of your browser.</h4>
                <p>For more information read Readme.</p>
            </div>`;
        }
        return html;
    }

    setYoutubeVid(id_, playlist=null) {
        if(!id_){
            return
        }
        if(!!playlist){
            this.src = `http://www.youtube.com/embed/`+id_+`?list=`+playlist+`&enablejsapi=1`;
        }else{
            this.src = `http://www.youtube.com/embed/`+id_+`?enablejsapi=1`;
        }
    }

    formatURL(url){
        return parseUrl(url)
    }
}
