import React, {Component} from "react";
import {sanitizeText, highlightText} from '../../helper';
import Waypoint from '../waypoint';
import Event from '../../event';
import Contract from '../../contract';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            page_no: "",
            text: "",
            threshold: 0,
        });
    }

    componentDidMount() {
        var threshold = this.props.page.page_no == 1 ? 0 : -0.4;
        this.setState({threshold: threshold});
    }

    componentWillMount() {
        this.setText(this.props)
    }

    componentWillReceiveProps(props) {
        this.setText(props);
    }

    setText(props) {
        var text = sanitizeText(props.page.text);
        if (props.highlight != '') {
            text = highlightText(text, props.highlight);
        }
        this.setState({text: text, page_no: props.page.page_no});
    }

    _onEnter(number) {
        if (Contract.isDisablePagination()) {
            return;
        }
        Event.publish('pagination:scroll', number);
        debug('publish onEnter pagination:scroll', number);
    }

    _onLeave(number, e) {
        if (Contract.isDisablePagination()) {
            return;
        }
        if (e.position == 'below' && number > 0) {
            Event.publish('pagination:scroll', (number - 1));
            debug('publish onLeave pagination:scroll', (number - 1));
        }
    }

    render() {
        var pageID = 'text-' + this.state.page_no;
        return (
            <span id={pageID} className="text-wrapper">
                 <Waypoint
                     onEnter={(e)=>{this._onEnter(this.state.page_no)}}
                     onLeave={(e)=>{this._onLeave(this.state.page_no,e)}}
                     threshold={this.state.threshold}/>
                <span className="page_no">{this.state.page_no}</span>
                <span className="text-content" dangerouslySetInnerHTML={{__html: this.state.text}}/>
            </span>
        );
    }
}
export default Page;