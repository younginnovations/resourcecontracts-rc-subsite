import React, {Component} from "react";
import ReactDOM from "react-dom";
import Contract from "../../contract";
import _map from "lodash/map";
import Cookies from "js-cookie";
import ClipHelper from "../../clip/clipHelper";

let clipHelper = new ClipHelper();

let allClipped = () => {
    if ( localStorage.allClipped === "false" || localStorage.allClipped === undefined ) {
        return false

    } else {

        return true

    }
}

class All extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allClipped : allClipped()
        }
    }
    clipAllToggle = () => {

        if( !this.state.allClipped ){
            clipHelper.clipAll();

            this.setState({
                allClipped: true
            })
        }else{

            clipHelper.unclipAll();

            this.setState({
                allClipped: false
            })
        }
    }

    render() {
        let id = this.state.allClipped?"remove-all-annotations":"clip-all-annotations";
        return (
            <div className="clearfix">
                <a id={ id }
                   className= "annotation-clip clipToggleElems"
                   title="Clip all annotations"
                   onClick={ this.clipAllToggle }>
                    <span className="link">{ langClip.clip_all }</span>
                </a>
            </div>
        );
    }
}

export default All;
