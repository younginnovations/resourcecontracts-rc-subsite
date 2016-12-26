import React from "react";
import ReactDOM from "react-dom";


//initialize local storage
//localStorage.clipLocalCollection = '';

import ClipHelper from "./clipHelper";
import ClipView from "./ClipView";

let clipHelper = new ClipHelper();
let key = clipHelper.getLocalClips();


//// Make a request
//axios.get(app_url + '/clip/annotations?data=' + key)
//    .then(function (response) {
//        console.log(response.data);
//    })
//    .catch(function (error) {
//        console.log(error);
//    });


ReactDOM.render(<ClipView />,
    document.getElementById('clip-annotations')
);
