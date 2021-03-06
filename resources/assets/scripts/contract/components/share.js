import React, {Component} from "react";
import Config from '../config';
import Email from '../components/email';

class Share extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            active: false,
            showModal: false
        })
    }

    clickHandler(e) {
        e.preventDefault();
        this.setState({active: !this.state.active})
    }

    handleShowModal(e) {
        e.preventDefault();
        this.setState({showModal: true})
    }

    handleHideModal(e) {
        e.preventDefault();
        this.setState({showModal: false})
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
            <div>
                <div className="social-share dropdown-wrap">
                    <a href="#" onClick={this.clickHandler.bind(this)}><span>{lang.share}</span></a>
                    <ul className="dropdown-menu" style={toggleStyle}>
                        <li className="facebook"><a href={Config.facebookUrl()} target="_blank"></a></li>
                        <li className="twitter"><a href={Config.twitterUrl()} target="_blank"></a></li>
                        <li className="email">
                            <a href="#email"
                               className="shareEmailToggler"
                               data-toggle="modal"
                               data-target="#emailModel"
                               data-title={ langClip.shareViaEmail }></a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Share;