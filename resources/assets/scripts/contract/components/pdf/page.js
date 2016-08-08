import React, {Component} from "react";
import {sanitizeText, highlightText} from '../../helper';
import Waypoint from '../waypoint';
import Event from '../../event';
import PdfJS from './pdfJS';
import Reflux from "reflux";
import AnnotationStore from '../../stores/annotationStore';
import AnnotationActions from '../../actions/annotationAction';
import Contract from '../../contract';

var Page = React.createClass({
    mixins: [Reflux.listenTo(AnnotationStore, 'onChange')],
    getInitialState() {
        return {
            page_no: "",
            pdf_url: "",
            scale: 1,
            threshold: 0
        }
    },
    componentWillMount() {
        var threshold = this.props.page.page_no == 1 ? 0 : -0.4;
        this.setState({pdf_url: this.props.page.pdf_url, threshold: threshold, page_no: this.props.page.page_no});
    },
    componentDidMount: function () {
        AnnotationActions.getList(Contract.getGuid());
    },
    _onEnter(number, e) {
        Event.publish('pagination:scroll', number);
        debug('publish onEnter pagination:scroll', number);
    },
    _onLeave(number, e) {
        if (e.position == 'below' && number > 0) {
            Event.publish('pagination:scroll', (number - 1));
            debug('publish onLeave pagination:scroll', (number - 1));
        }
    },
    onPageRendered() {
        $('#' + this.getPageID()).prepend('hhhhhh')
    },

    getPageID() {
        return 'pdf-' + this.state.page_no
    },

    render() {
        var pageID = this.getPageID();
        return (
            <div id={pageID} className="pdf-wrapper">
                <Waypoint
                    onEnter={(e)=>{this._onEnter(this.state.page_no,e)}}
                    onLeave={(e)=>{this._onLeave(this.state.page_no,e)}}
                    threshold={this.state.threshold}/>
                <p className="pdf-number">{this.state.page_no}</p>
                <PdfJS onPageRendered={this.onPageRendered.bind(this)} file={this.state.pdf_url}
                       page={this.state.page_no}
                       scale={this.state.scale}/>
            </div>
        );
    }
});

export default Page;