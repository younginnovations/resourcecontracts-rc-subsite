import React, {Component} from "react";
import Cookies from "js-cookie";

import clipHelper from "../../clip/clipHelper";

let currentClipState = Cookies.get("clipState")

if ( currentClipState === undefined) {

     currentClipState = false;

}else{

    currentClipState = JSON.parse( Cookies.get("clipState")  )
}
currentClipState = currentClipState == true || clipHelper.hasLocalClips();
if (currentClipState === true) {
    Cookies.set('clipState', currentClipState);
}

class Switch extends Component {
    constructor(){
        super();

        this.state = {
            clipState : currentClipState
        }
    }

    toggleClip = () => {


        clipHelper.toggleClip();

        this.setState({
            clipState: !this.state.clipState
        });

    };


    render() {

        var addClass = this.state.clipState?'clip-btn active': 'clip-btn';

        return (
            <div className="pull-left">
                <button className={ addClass } id="on-annotation"  onClick={ this.toggleClip } >On</button>
            </div>
        );
    }
}

export default Switch;
