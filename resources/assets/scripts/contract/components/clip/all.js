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

    componentDidMount() {
        if (Cookies.get("clipState") === 'false' || Cookies.get("clipState") === undefined) {

           // $('#clip-all-annotations').css('display', 'none');
        }
    }

    //componentDidUpdate() {
    //    if (!this.checkAllClipped()) {
    //        $(ReactDOM.findDOMNode(this)).find('.annotation-clip').removeClass('annotation-clipped');
    //        $(ReactDOM.findDOMNode(this)).find('.annotation-clip').attr('id', 'clip-all-annotations');
    //    }
    //
    //}
    //
    //checkAllClipped() {
    //    let clipCollection = window.getClipLocalCollection();
    //    let allAnnotations = Contract.getAnnotations();
    //    let clipCollectionData = clipCollection.localStorage.findAll();
    //    let clippedData = [];
    //    clipCollectionData.forEach((d) => {
    //        clippedData.push(parseInt(d.id));
    //    });
    //    let isAllClipped = false;
    //    _map(allAnnotations.result, (d) => {
    //        if (clippedData.indexOf(parseInt(d.annotation_id)) > -1) {
    //            isAllClipped = true;
    //        } else {
    //            isAllClipped = false;
    //        }
    //    });
    //
    //    return isAllClipped;
    //}

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
