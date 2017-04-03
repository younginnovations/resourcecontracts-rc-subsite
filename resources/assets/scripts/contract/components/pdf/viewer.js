import React, {Component} from  'react';
import PdfJS from './pdfJS';
import Contract from "../../contract";
import Event from '../../event';
import AnnotationLoader from '../../annotator/loader';

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            page_no: 0,
            pdf_url: "",
            scale: 0,
            loading: true
        });
    }

    componentDidMount() {
        this.subscribe_zoom = Event.subscribe('zoom:change', (scale) => {
            this.setState({scale: scale});
        });
        this.updateState(this.props);
    }

    updateState(props) {
        var {page_no, pdf_url} = props.page;
        var scale = Contract.getPdfScale();
        this.setState({
            page_no,
            pdf_url,
            scale,
            loading: false
        });
    }

    componentWillUnmount() {
        this.subscribe_zoom.remove();
    }

    getPageID() {
        return 'pdf-' + this.state.page_no;
    }

    getAnnotations() {
        let page = [];
        let annotations = Contract.getAnnotations();

        annotations.result.forEach(annotation=> {
            if (typeof  annotation.shapes == 'object' && this.state.page_no == annotation.page_no) {
                page.push(annotation);
            }
        });

        return page;
    }

    onPageRendered() {
        if (!this.annotator) {
            this.annotator = new AnnotationLoader('.pdf-annotator');
            this.annotator.init();
            Contract.setAnnotatorInstance(this.annotator);
        }

        const annotations = this.getAnnotations();

        if (annotations.length > 0) {
            this.annotator.content.annotator("loadAnnotations", annotations);
        }

        Event.publish('annotation:loaded', 'pdf');
    }

    componentWillReceiveProps(props) {
        this.updateState(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.page.page_no !== this.state.page_no || this.state.scale !== nextState.scale);
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
                <div id={this.getPageID()} className="pdf-wrapper">
                    <PdfJS onPageRendered={this.onPageRendered.bind(this)}
                           file={this.state.pdf_url}
                           page={this.state.page_no}
                           scale={this.state.scale}/>
                </div>
                <a href="#" className="change-view-icon exit-fullscreen"></a>
            </div>
        );
    }
}

export default Viewer;
