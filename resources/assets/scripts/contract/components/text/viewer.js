import React, {Component} from "react";
import Page from './page';
import _map from "lodash/map"
import Event from '../../event';
import AnnotationLoader from '../../annotator/loader';
import Contract from '../../contract';

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = ({pages: {}, isLoading: true});
        this.annotator = '';
    }

    componentWillReceiveProps(props) {
        this.setState({
            pages: props.pages,
            isLoading: false
        });
    }

    componentDidUpdate() {
        if (!this.annotator && this.state.pages.length > 0) {
            this.annotator = new AnnotationLoader('.text-annotator');
            this.annotator.init();
            Event.publish('annotation:loaded');
            debug('Text Viewer publish annotation:loaded');
        }
    }

    renderPages() {
        var pages = this.state.pages;
        var pageView = _map(pages, function (page) {
            return (<Page key={page.id} page={page}/>)
        });

        return pageView;
    }

    render() {
        var content = 'Loading OCR Text...';
        if (!this.state.isLoading) {
            content = this.renderPages();
        }
        return (
            <div className="text-panel">
                <div className="text-annotator">
                    <div></div>
                    <div className="text-viewer">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}

export default Viewer;