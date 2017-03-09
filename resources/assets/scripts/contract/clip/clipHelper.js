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

        }

        document.body.classList.toggle('clippingOff');

    }

    getLocalClips() {

        let localClips = localStorage.clipLocalCollection;

        if (localClips) {
            localClips = localClips.split(" ");

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

    }


    addClip(id) {

        let localClips = this.getLocalClips();
        let annotationIds = id.split(" ");


        if (localClips) {

            annotationIds.forEach( (annotationId, index) =>{

                if (localClips.indexOf(annotationId) < 0) {


                    localClips.push(annotationId);

                }
            });


            //add the id to local storage of clip collection
            localStorage.clipLocalCollection = localClips.join(" ");


        } else {

            localStorage.clipLocalCollection = id;

        }

        this.setClipCount();

    }

    removeClip(id) {

        let localClips = this.getLocalClips();
        let annotationIds = id.split(" ");

        if (localClips && annotationIds) {

            annotationIds.forEach( (annotationId) =>{
                let index = localClips.indexOf(annotationId);
                if(index > -1){
                    localClips.splice(index, 1);
                }
            })

            localStorage.clipLocalCollection = localClips.join(" ");

            this.setClipCount();

        }

    }

    clipActions(e) {
        var target = e.target;

        //get annotation id to add
        let id = target.getAttribute('data-id');

        if(!id){
            return null
        }

        var action = target.getAttribute("data-action");

        if (action === "add") {

            this.addClip(id);
            target.setAttribute("data-action", "remove");

        } else {

            this.removeClip(id);
            target.setAttribute("data-action", "add");

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

    }

}