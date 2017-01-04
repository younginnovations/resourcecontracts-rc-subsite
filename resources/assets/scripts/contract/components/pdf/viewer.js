import React, {Component} from  'react';
import PDFImage from './pdfimage';
import Contract from "../../contract";
import Event from '../../event';
import AnnotationLoader from '../../annotator/loader';

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            page_no: 1,
            pdf_url: "",
            scale: 0,
            pages: {},
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
        var scale = Contract.getPdfScale();
        this.setState({
            pages: props.pages,
            scale,
            loading: false
        });
    }

    componentWillUnmount() {
        this.subscribe_zoom.remove();
    }

    getAnnotations() {
        let page = [];
        let annotations = Contract.getAnnotations();

        annotations.result.forEach(annotation=> {
            if (typeof  annotation.shapes == 'object') {
                annotation.shapes[0].geometry.y = annotation.shapes[0].geometry.y + (annotation.page_no - 1);
                console.log(annotation);
                page.push(annotation);
            }
        });

        return page;
    }

    onPageRendered(page) {

        console.log(page);

        if (page < 24) {
            return;
        }

        if (!this.annotator) {
            this.annotator = new AnnotationLoader('.pdf-wrapper');
            this.annotator.init();
            // Contract.setAnnotatorInstance(this.annotator);
        }

        const annotations = this.getAnnotations();

        if (annotations.length > 0) {
            this.annotator.content.annotator("loadAnnotations", annotations);
        }

        // Event.publish('annotation:loaded', 'pdf');
    }

    componentWillReceiveProps(props) {
        this.updateState(props);
    }

    /*   shouldComponentUpdate(nextProps, nextState) {
     return (nextProps.page.page_no !== this.state.page_no || this.state.scale !== nextState.scale);
     }*/

    pdfImages() {
        if (typeof this.state.pages == 'undefined') return false;
        return this.state.pages.map(page=> {
            return (
                <div id={'page-'+page.page_no}>
                    {page.page_no}
                    <PDFImage key={page.id}
                              onPageRendered={this.onPageRendered.bind(this)}
                              file={'http://localhost:8000/pdf/'+page.page_no+'.jpg'}
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

