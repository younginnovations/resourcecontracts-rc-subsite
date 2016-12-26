import Cookies from "js-cookie";
import _ from "lodash";

export default class ClipHelper {
    constructor() {

    }

    toggleClip() {


        if (Cookies.get('clipState') === undefined) {
            Cookies.set('clipState', true);
        } else {

            let currentState = JSON.parse(Cookies.get('clipState'));
            Cookies.set('clipState', !currentState);

            //console.log(Cookies.get('clipState'));
        }

        document.body.classList.toggle('clippingOff');

    }

    getLocalClips() {

        let localClips = localStorage.clipLocalCollection;

        if (localClips) {
            localClips = localClips.split(" ");
            //localClips.pop()

            return localClips;

        } else {

            return null;
        }


    }

    clipSelectCount() {

        let clipCount = 0;
        var clips = this.getLocalClips();

        if (clips) {
            clipCount = clips.length;
        }

        return clipCount;
    }

    setClipCount() {

        var clipCount = this.clipSelectCount();

        let clipSelectCountContainer = document.getElementsByClassName("clipSelectCount");

        for (let i = 0; i < clipSelectCountContainer.length; i++) {
            clipSelectCountContainer[i].innerHTML = clipCount;
        }
        ;
    }


    addClip(e, id) {

        let localClips = this.getLocalClips();
        if (localClips) {
            if (localClips.indexOf(id) < 0) {
                //add the id to local storage of clip collection
                localStorage.clipLocalCollection = localStorage.clipLocalCollection + " " + id;
            }
        } else {
            localStorage.clipLocalCollection = id;
        }

        this.setClipCount();
    }

    removeClip(id) {

        var re = new RegExp('( ' + id + ')|(' + id + ' ?)', "g");

        localStorage.clipLocalCollection = localStorage.clipLocalCollection.replace(re, "");

        //localStorage.allClipped = "false";

        this.setClipCount();
    }

    clipActions(e) {

        //get annotation id to add
        let id = e.target.getAttribute('data-id');


        var action = e.target.getAttribute("data-action");

        if (action === "add") {
            this.addClip(e, id)
            e.target.setAttribute("data-action", "remove");
        } else {
            this.removeClip(id)
            e.target.setAttribute("data-action", "add");
        }
    }

    clipAll() {

        var x = document.querySelectorAll(".annotation-clip-icon[data-action='add'");
        x.forEach(function (item) {
            item.click();
        })

        localStorage.allClipped = "true";

    }

    unclipAll() {

        var x = document.querySelectorAll(".annotation-clip-icon[data-action='remove'");
        x.forEach(function (item) {
            item.click();
        })

        localStorage.allClipped = "false";

    }

    clearAllClips() {

        localStorage.clipLocalCollection = "";

        //this.setClipCount();


    }

}