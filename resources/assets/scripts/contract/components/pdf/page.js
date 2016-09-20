import React, {Component} from "react";
import Event from '../../event';
import PdfJS from './pdfJS';
import Reflux from "reflux";
import AnnotationStore from '../../stores/annotationStore';
import AnnotationActions from '../../actions/annotationAction';
import Contract from '../../contract';
import _map from 'lodash/map';
import AnnotationLoader from '../../annotator/loader';

var Page = React.createClass({
    mixins: [Reflux.listenTo(AnnotationStore, 'onChange')],
    getInitialState() {
        return {
            page_no: 1,
            pdf_url: "",
            scale: 1,
            annotations: {}
        }
    },
    componentDidMount(){
        AnnotationActions.getList(Contract.getGuid());
        this.setState({scale: Contract.getPdfScale()});
        this.sub = Event.subscribe('zoom:change', (scale) => {
            this.setState({scale: scale});
        });
    },
    componentWillUnmount(){
        this.sub.remove();
    },
    updateState(props){
        this.setState({pdf_url: props.page.pdf_url, page_no: props.page.page_no, scale: props.scale});
        $('annotator-wrapper')
    },
    componentWillMount() {
        this.updateState(this.props);
    },
    componentWillReceiveProps(props){
        this.updateState(props);
    },
    onChange (event, response) {
        this.setState({annotations: response.result})
    },
    getAnnotations(){
        var page = [];
        _map(this.state.annotations, (annotation)=> {
            if (typeof  annotation.shapes == 'object' && this.state.page_no == annotation.page_no) {
                page.push(annotation);
            }
        });
        return page;
    },
    onPageRendered() {
        var annotations = this.getAnnotations();
        if (!this.annotator && annotations.length > 0) {
            this.annotator = new AnnotationLoader('.pdf-annotator');
            this.annotator.init();
        }
        this.annotator.content.annotator("loadAnnotations", annotations);
        Contract.setAnnotatorInstance(this.annotator);
        Event.publish('annotation:loaded');
        debug('PDF Viewer publish annotation:loaded');
    },
    getPageID() {
        return 'pdf-' + this.state.page_no;
    },
    render() {
        return (
            <div id={this.getPageID()} className="pdf-wrapper">
                <PdfJS onPageRendered={this.onPageRendered.bind(this)}
                       file={this.state.pdf_url}
                       page={this.state.page_no}
                       scale={this.state.scale}/>
            </div>
        );
    }
});

export default Page;