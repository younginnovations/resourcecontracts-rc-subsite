import React, {Component} from "react";
import Contract from "../../contract";
import Event from "../../event";

class Zoom extends Component {
    constructor(props) {
        super(props);
        this.state = ({scale: 1, active: false});
    }

    componentDidMount() {
        this.setState({scale: Contract.getPdfScale(), active: this.isPdfView()});
        if (this.isPdfView() && this.hasValidAnnotationPath()) {
            this.state.scale = 1.5;
            Contract.setPdfScale(1.5);
        }
        this.subscribe = Event.subscribe('route:location', ()=> {
            this.setState({active: this.isPdfView()});
        });
    }

    componentWillUnmount() {
        this.subscribe.remove();
    }


    hasValidAnnotationPath() {
        var route = window.location.href.split('#');
        if (route.length <= 1) {
            return false
        }
        var route = route[1];
        var reg = /pdf\/page\/(.*)\/(.*|$)/g;
        var match = reg.exec(route);
        return match != null;
    }

    isPdfView() {
        return (Contract.getView() == 'pdf');
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

        if (this.state.scale != int) {
            this.setState({scale: int});
            Contract.setPdfScale(int);
            Event.publish('zoom:change', int);
            debug('pdf zoom publish zoom:change', int);
        }
    }

    render() {
        if (!this.state.active) return null;

        return (
            <div>
                <div className="pdf-zoom-options">
                    <a className="btn btn-default" data-ref="decrease" href="#"
                       onClick={this.handleClick.bind(this)}>-</a>
                    <p>Zoom</p>
                    <a className="btn btn-default" data-ref="increase" href="#"
                       onClick={this.handleClick.bind(this)}>+</a>
                </div>
                <span className="change-view-icon fullscreen"></span>

                <span className="change-view-icon exit-fullscreen"></span>
            </div>
        );
    }
}

export default Zoom;