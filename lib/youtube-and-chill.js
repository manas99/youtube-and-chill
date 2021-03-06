'use babel';

import YoutubeAndChillView from './youtube-and-chill-view';
import VideoElementView from './video-element-view';
import { CompositeDisposable } from 'atom';

export default {

    youtubeAndChillView: null,
    urlBarPanel: null,
    subscriptions: null,
    videoView: null,

    activate(state) {
        this.youtubeAndChillView = new YoutubeAndChillView(state.youtubeAndChillViewState, this);
        this.videoView = new VideoElementView(this);
        this.urlBarPanel = atom.workspace.addModalPanel({
            item: this.youtubeAndChillView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'youtube-and-chill:enterURL': () => this.enterURL()
        }));
    },

    deactivate() {
        this.urlBarPanel.destroy();
        this.subscriptions.dispose();
        this.youtubeAndChillView.destroy();
    },

    serialize() {
        return {
            youtubeAndChillViewState: this.youtubeAndChillView.serialize()
        };
    },

    enterURL() {
        return (
            this.urlBarPanel.isVisible() ?
            this.urlBarPanel.hide() :
            this.urlBarPanel.show()
        );
    },

    showVideo(url) {
        this.urlBarPanel.hide();
        var params;
        var is_code = false;
        try {
            params = this.videoView.formatURL(url);
        } catch (e) {
            atom.notifications.addInfo("Using youtube code.")
            is_code = true;
        }
        if(!is_code){
            if(this.checkDomain('youtube.com', params)){
                this.videoView.setYoutubeVid(params.query.v, params.query.list);
            }
            // if(params["v"]){
            //   if(params["list"]){
            //     this.videoView.setPlaylist(params["list"]);
            //   }else{
            //     this.videoView.setPlaylist(null);
            //   }
            //
            // }
        } else {
            this.videoView.setYoutubeVid(url);
        }

        var item = document.createElement('div');
        item.innerHTML = this.videoView.getElement();
        var vid_item = {
            element: item,
            getTitle: () => 'Youtube and Chill',
            getURI: () => 'atom://watch-n-code/watch-video',
            getDefaultLocation: () => 'right'
        };
        atom.workspace.open(vid_item);
    },

    checkDomain(domain, params){
        return params.resource.includes(domain)||params.pathname.includes(domain)
    }

};
