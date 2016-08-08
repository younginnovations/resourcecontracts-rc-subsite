import React, {Component} from "react";

class Zoom extends Component {
    constructor(props) {
        super(props);
        this.state = ({scale: 1});
    }

    handleClick(e, ev) {
        e.preventDefault();
        var type = e.target.getAttribute('data-ref');
        var int = this.state.scale;
        if (int < 2 && type == 'increase') {
            int = int + 0.25;
        }

        if (int > 0.5 && type == 'decrease') {
            int = int - 0.25;
        }

        this.setState({scale: int});
    }

    render() {
        var selectedClass = "scale-" + this.state.scale;
        $('.pdf-zoom-options span').removeClass('scale-selected');
        $('.pdf-zoom-options .' + selectedClass).addClass('scale-selected');
        var zoom = this.state.scale * 100;
        return (
            <div>
                <div className="pdf-zoom-options">
                    <a className="btn btn-default" data-ref="decrease" href="#" onClick={this.handleClick.bind(this)}>-</a>
                    <p>image</p>
                    <a className="btn btn-default" data-ref="increase" href="#" onClick={this.handleClick.bind(this)}>+</a>
                </div>
            </div>
        );
    }
}

export default Zoom;