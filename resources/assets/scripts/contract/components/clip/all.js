import React, {Component} from "react";
import ReactDOM from "react-dom";
import Contract from "../../contract";
import _map from "lodash/map";

class All extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if ($.cookie("clipstate") == 0 || typeof $.cookie("clipstate") == 'undefined') {
            $('#clip-all-annotations').css('display', 'none');
        }
    }

    componentDidUpdate() {
        if (!this.checkAllClipped()) {
            $(ReactDOM.findDOMNode(this)).find('.annotation-clip').removeClass('annotation-clipped');
            $(ReactDOM.findDOMNode(this)).find('.annotation-clip').attr('id', 'clip-all-annotations');
        }

    }

    checkAllClipped() {
        let clipCollection = window.getClipLocalCollection();
        let allAnnotations = Contract.getAnnotations();
        let clipCollectionData = clipCollection.localStorage.findAll();
        let clippedData = [];
        clipCollectionData.forEach((d) => {
            clippedData.push(parseInt(d.id));
        });
        let isAllClipped = false;
        _map(allAnnotations.result, (d) => {
            if (clippedData.indexOf(parseInt(d.annotation_id)) > -1) {
                isAllClipped = true;
            } else {
                isAllClipped = false;
            }
        });

        return isAllClipped;
    }

    render() {
        return (
            <div className="clearfix">
                <a id="clip-all-annotations" className="annotation-clip"  data-toggle="popover" data-title={ langClip.clipAllAnnotations }>

                    <span className="link">{langClip.clip_all}</span>

                </a>
            </div>
        );
    }
}

export default All;
