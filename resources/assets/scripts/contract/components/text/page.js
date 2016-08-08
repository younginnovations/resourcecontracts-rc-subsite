import React, {Component} from "react";
import {sanitizeText, highlightText} from '../../helper';
import Waypoint from '../waypoint';
import Event from '../../event';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            page_no: "",
            text: "",
            threshold: 0
        });
    }

    componentWillMount() {
        var text = sanitizeText(this.props.page.text);
        var threshold = this.props.page.page_no == 1 ? 0 : -0.4;
        this.setState({text: text, threshold: threshold, page_no: this.props.page.page_no});
    }

    _onEnter(number, e) {
        Event.publish('pagination:scroll', number);
        debug('publish onEnter pagination:scroll', number);
    }

    _onLeave(number, e) {
        if (e.position == 'below' && number > 0) {
            Event.publish('pagination:scroll', (number - 1));
            debug('publish onLeave pagination:scroll', (number - 1));
        }
    }

    render() {
        var pageID = 'text-' + this.state.page_no;
        return (
            <span id={pageID} className="text-wrapper">
                <span>{this.state.page_no}</span>
                <span className="text-content" dangerouslySetInnerHTML={{__html: this.state.text}}/>
                 <Waypoint
                     onEnter={(e)=>{this._onEnter(this.state.page_no,e)}}
                     onLeave={(e)=>{this._onLeave(this.state.page_no,e)}}
                     threshold={this.state.threshold}/>
            </span>
        );
    }
}
export default Page;