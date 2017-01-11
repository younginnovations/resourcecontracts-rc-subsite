import React, {Component} from  'react';
import PDFImage from './pdfimage';
import Contract from "../../contract";
import Event from '../../event';
import AnnotationLoader from '../../annotator/loader';
import Waypoint from '../waypoint';
import Config from  '../../config';

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.annotator = [];
        this.state = ({
            page_no: 1,
            pdf_url: "",
            scale: 0,
            pages: {},
            loading: true
        });
    }

    componentDidMount() {
        Contract.setDisablePagination(true);
        this.subscribe_zoom = Event.subscribe('zoom:change', (scale) => {
            this.setState({scale: scale});
            $('.annotator-pdf-hl').hide();
        });
        this.updateState(this.props);
        this.subscribePagination = Event.subscribe('pagination:change', this.paginationHandler);
    }

    updateState(props) {
        var scale = Contract.getPdfScale();
        this.setState({
            pages: props.pages,
            scale,
            loading: false
        });
    }

    componentWillUnmount() {
        this.subscribe_zoom.remove();
        this.subscribePagination.remove();
    }

    getAnnotations(page_no) {
        let page = [];
        let annotations = Contract.getAnnotations();

        annotations.result.forEach(annotation=> {
            if (typeof  annotation.shapes == 'object' && annotation.page_no == page_no) {
                page.push(annotation);
            }
        });

        return page;
    }

    onPageRendered(page) {
        if (typeof this.annotator[page] == 'undefined') {
            this.annotator[page] = new AnnotationLoader('.pdf-wrapper #pdf-' + page + ' .imageWrapper');
            this.annotator[page].init();
            Contract.setAnnotatorInstance(this.annotator[page]);
        }

        const annotations = this.getAnnotations(page);

        if (annotations.length > 0) {
            this.annotator[page].content.annotator("loadAnnotations", annotations);
        }

        Event.publish('annotation:loaded', 'pdf');
    }

    componentWillReceiveProps(props) {
        this.updateState(props);
    }

    componentDidUpdate() {
        this.paginationHandler(Contract.getCurrentPage());
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.scale !== nextState.scale);
    }

    paginationHandler(page_no) {
        let page = $('#pdf-' + page_no);
        let parentWindow = $('.pdf-annotator');
        if (page.offset()) {
            let pageOffsetTop = page.offset().top;
            let parentTop = parentWindow.scrollTop();
            let parentOffsetTop = parentWindow.offset().top;
            parentWindow.animate({scrollTop: parentTop - parentOffsetTop + pageOffsetTop}, 300, ()=> {
                Contract.setDisablePagination(false);
            });
        }
    }

    pdfImages() {
        if (typeof this.state.pages == 'undefined') return false;
        return this.state.pages.map(page=> {
            return (
                <div id={'pdf-'+page.page_no}>
                    <PDFImage key={page.id}
                              onPageRendered={this.onPageRendered.bind(this)}
                              file={Config.appUrl('pdf/'+page.page_no+'.png')}
                              page={page.page_no}
                              scale={this.state.scale}/>
                    <hr/>
                </div>
            );
        });
    }

    render() {
        if (this.state.loading) {
            return ( <div className="pdf-viewer pdf-annotator">
                <div className="pdf-wrapper">
                    Loading...
                </div>
            </div>);
        }
        return (
            <div className="pdf-viewer pdf-annotator">
                <div className="progress-wrapper">
                    <div className="progress-bar progress-bar-info"></div>
                </div>
                <div className="pdf-wrapper">
                    {this.pdfImages()}
                </div>
            </div>
        );
    }
}

export default Viewer;

