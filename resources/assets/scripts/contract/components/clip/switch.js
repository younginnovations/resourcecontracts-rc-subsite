import React, {Component} from "react";


const divStyle = {
    position: 'relative',
    display: 'inline-block'
};

class Switch extends Component {

    render() {
        return (
            <div className="pull-left">
                <span className="clip-btn popoverUp" id="on-annotation" data-toggle="popover" style={ divStyle } data-popover-content="">On</span>
            </div>
        );
    }
}

export default Switch;
