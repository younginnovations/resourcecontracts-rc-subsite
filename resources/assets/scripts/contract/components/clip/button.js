import React, {Component} from "react";
import ReactDOM from "react-dom";

class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }

    componentDidMount() {
        if ($.cookie("clipstate") == 0 || typeof $.cookie("clipstate") == 'undefined') {
            $(ReactDOM.findDOMNode(this)).css('display', 'none');
        }
    }

    componentDidUpdate() {
        if ($.cookie("clipstate") != 0) {
            $(ReactDOM.findDOMNode(this)).removeClass('annotation-clipped');
            window.loadSingleClipedItem(ReactDOM.findDOMNode(this));
        }
    }

    clickHandler(e) {
        window.clipAnnotations(parseInt(this.props.id), e.target);
    }

    render() {
        return (
            <span
                data-title={langClip.clip_annotation }
                data-toggle="popover"data-id={this.props.id}
                onClick={this.clickHandler.bind(this)}
                className="annotation-clip-icon">{langClip.clip}
                </span>
        );
    }
}

export default Button;
