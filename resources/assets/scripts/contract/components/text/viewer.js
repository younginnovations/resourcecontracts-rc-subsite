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

    componentDidMount() {
        this.subscribe = Event.subscribe('pagination:change', this.paginationHandler);
        Contract.setDisablePagination(true);
    }

    paginationHandler(page_no) {
        var view = Contract.getView();
        if (view == 'text' || view == 'search') {
            debug('subscribe Text pagination:change', page_no);
            var page = $('#text-' + page_no);
            var parentWindow = $('.text-annotator');
            if (page.offset()) {
                var pageOffsetTop = page.offset().top;
                var parentTop = parentWindow.scrollTop();
                var parentOffsetTop = parentWindow.offset().top;
                parentWindow.animate({scrollTop: parentTop - parentOffsetTop + pageOffsetTop}, 300, ()=> {
                    Contract.setDisablePagination(false);
                });
            }
        }
    }

    componentWillUnmount() {
        this.subscribe.remove();
    }

    componentWillReceiveProps(props) {
        this.setState({
            pages: props.pages,
            isLoading: false
        });
    }

    componentDidUpdate() {
        this.paginationHandler(Contract.getCurrentPage());
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