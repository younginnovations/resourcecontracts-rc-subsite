import React, {Component} from "react";
import Config from '../config';

class Share extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            active: false
        })
    }

    clickHandler(e) {
        e.preventDefault();
        this.setState({active: !this.state.active})
    }

    componentDidMount() {
        var self = this;
        $(document).click(function (event) {
            if (!$(event.target).closest('.social-share').length && !$(event.target).is('.social-share')) {
                if ($('.social-share').is(":visible")) {
                    self.setState({active: false});
                }
            }
        });
    }

    render() {
        var show = {'display': 'block'};
        var hide = {'display': 'none'};
        var toggleStyle = this.state.active ? show : hide;
        return (
            <div className="social-share dropdown-wrap">
                <a href="#" onClick={this.clickHandler.bind(this)}><span>{lang.share}</span></a>
                <ul className="dropdown-menu" style={toggleStyle}>
                    <li className="facebook"><a href={Config.facebookUrl()} target="_blank">FB</a></li>
                    <li className="google-plus"><a href={Config.googleUrl()} target="_blank">G+</a></li>
                    <li className="twitter"><a href={Config.twitterUrl()} target="_blank">T</a></li>
                </ul>
            </div>
        );
    }
}

export default Share;