import React, {Component} from "react";
import Page from './page';
import _map from "lodash/map"
import Event from '../../event';
import AnnotationLoader from '../../annotator/loader';
import Contract from '../../contract';
import Config from '../../config';

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = ({pages: {}, isLoading: true, highlight: ''});
        this.annotator = '';
    }

    componentDidMount() {
        this.subscribePagination = Event.subscribe('pagination:change', this.paginationHandler);
        Contract.setDisablePagination(true);

        this.subscribeSearch = Event.subscribe('search:updated', query=> {
            this.setState({highlight: query});
        });

        this.subscribeSearchClose = Event.subscribe('search:close', ()=> {
            this.setState({highlight: ''});
        });
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
        this.subscribePagination.remove();
        this.subscribeSearch.remove();
        this.subscribeSearchClose.remove();
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
            Event.publish('annotation:loaded', 'text');
            debug('Text Viewer publish annotation:loaded');
        }
    }

    renderPages() {
        var pages = this.state.pages;
        if (pages.length > 0) {
            var pageView = _map(pages, (page) => {
                return (<Page key={page.id} highlight={this.state.highlight} page={page}/>)
            });
        } else {
            return (<div className="text-viewer-warning" dangerouslySetInnerHTML={ {__html: Config.message.pdf_not_loading }} />);
        }
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