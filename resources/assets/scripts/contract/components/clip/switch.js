import React, {Component} from "react";
import Cookies from "js-cookie";

import clipHelper from "../../clip/clipHelper";

let currentClipState = Cookies.get("clipState")

if ( currentClipState === undefined) {

     currentClipState = false;

}else{

    currentClipState = JSON.parse( Cookies.get("clipState")  )
}
currentClipState = currentClipState || (clipHelper.getLocalClips() && clipHelper.getLocalClips().length);
Cookies.set('clipState', true)
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
