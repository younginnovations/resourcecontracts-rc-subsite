import React, {Component} from "react";
import {getHashPage} from "./Helper";
import Event from './Event';
import AnnotationLoader from "../contract/annotator/loader";
import Contract from "../contract/contract";
import Config from "./config";
import Viewer from "./Viewer";

class Pdf extends Component {
    constructor(props) {
        super(props);
        this.state = {page: 0, scale: 1, isLoading: true};
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        window.addEventListener("hashchange", this.changePage, false);
        Event.subscribe('zomm.scale', zoom=> {
            this.setState({scale: zoom.scale});
        });
    }

    componentWillMount() {
        Contract.setCurrentPage(Config.popupAnnotation.page_no);
        Contract.setCurrentAnnotation(Config.popupAnnotation.annotation_id);

        this.setState({
            page: this.props.annotation.pages[0].page_no,
            contract_id: this.props.annotation.contract_id,
            isLoading: false
        });
        this.changePage();
        Event.publish('loading', false);
    }

    changePage() {
        let page = getHashPage();
        if (page > 0) {
            this.setState({page: page});
        }
    }

    getFile() {
        return AWS_URL + "/" + this.state.contract_id + "/" + this.state.page + ".pdf";
    }

    getAnnotations() {
        let pageAnnotations = [];
        let annotations = Contract.getAnnotations();

        annotations.result.forEach(annotation=> {
            if (typeof annotation.shapes == 'object' && this.state.page == annotation.page_no) {
                pageAnnotations.push(annotation);
            }
        });

        return pageAnnotations;
    }

    onPageRendered() {
        if (!this.annotator) {
            this.annotator = new AnnotationLoader('.pdf-annotator');
            this.annotator.init();
            Contract.setAnnotatorInstance(this.annotator);
        }

        const annotations = this.getAnnotations();

        if (annotations.length > 0) {
            this.annotator.content.annotator("loadAnnotations", [...annotations]);
        }

        Event.publish('annotation:loaded', 'pdf');
    }

    render() {
        if (this.state.isLoading) {
            return null;
        }
        // return (
        //     <div>
        //         <div id="progress-bar-info"></div>
        //         <PdfJS onPageRendered={()=>{}} file={this.getFile()} page={this.state.page} scale={this.state.scale}/>
        //     </div>
        // );

        return (
            <div id="view-pdf">
                <div id="progress-bar-info"></div>
                <Viewer page={this.state.page} pdf_url={this.getFile()}/>
            </div>
        );
        // return (
        //     <div className="annotator-viewer" id="pdf-container">
        //         <div id="progress-bar-info"></div>
        //         <PdfJS onPageRendered={this.onPageRendered.bind(this)} file={this.getFile()} page={this.state.page} scale={this.state.scale}/>
        //     </div>
        // );
    }
}

export default Pdf;