import React, {Component} from "react";
import ReactDOM from "react-dom";
import Contract from "../../contract";
import _map from "lodash/map";
import Cookies from "js-cookie";
import clipHelper from "../../clip/clipHelper";

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
            allClipped : false
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
    };

    componentDidMount(){

        let allClips = clipHelper.getLocalClips();
        if(allClips) {
            let allClipped = true;
            let annotationItem = $(".annotation-item");
            annotationItem.each((index)=> {

                let id = $(annotationItem[index]).find("button").attr("data-id");
                if (allClips.indexOf(id) < 0) {
                    allClipped = false
                }

            });

            this.setState({
                allClipped
            });
        }

    };

    render() {

        let id = this.state.allClipped?"remove-all-annotations":"clip-all-annotations";
        let link = this.state.allClipped?langClip.clear_all_clips:langClip.clip_all;

        return (
            <div className="clearfix">
                <a id={ id }
                   className= "annotation-clip clipToggleElems"
                   onClick={ this.clipAllToggle }>
                    <span className="link">{ link }</span>
                </a>
            </div>
        );
    }
}

export default All;
