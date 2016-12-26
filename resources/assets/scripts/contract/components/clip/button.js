import React, {Component} from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import ClipHelper from "../../clip/clipHelper";

let clipHelper = new ClipHelper();

class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    componentDidMount() {

        if (Cookies.get("clipState") === 'false' || Cookies.get("clipState") === undefined) {
            //console.log(ReactDOM.findDOMNode(this))
            //$(ReactDOM.findDOMNode(this)).hide();
        }


        let localClips = clipHelper.getLocalClips();
        let idStr = ( this.props.id ).toString();

        if(localClips) {
            if (localClips.indexOf(idStr) > -1) {
                this.setState({
                    show: true
                });
                $(ReactDOM.findDOMNode(this)).attr("data-action", "remove");

            }
        }

    }


    componentDidUpdate() {
        //if ($.cookie("clipstate") != 0) {
        //    $(ReactDOM.findDOMNode(this)).removeClass('annotation-clipped');
        //    window.loadSingleClipedItem(ReactDOM.findDOMNode(this));
        //}

    }

    clickHandler = (e) => {
        //window.clipAnnotations(parseInt(this.props.id), e.target);

        clipHelper.clipActions(e);

        this.setState({
            show: !this.state.show
        })

    }


    render() {
        var addClass = this.state.show === true?'annotation-clip-icon clipToggleElems annotation-clipped':'annotation-clip-icon clipToggleElems';

        return (
            <button data-id={this.props.id}
                    data-action="add"
                    onClick={this.clickHandler}
                    className= { addClass }
                    title="Clip annotation.">{langClip.clip}</button>
        );
    }
}

export default Button;
