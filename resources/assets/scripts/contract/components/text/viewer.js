import React, {Component} from "react";
import Page from './page';
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

        this.subscribeSearch = Event.subscribe('search:updated', ({page_no, query}) => {
            this.setState({highlight: decodeURIComponent(query)});
            Contract.setDisablePagination(true);
            this.paginationHandler(page_no, true);
            Contract.setCurrentPage(page_no);
            Event.publish('pagination:change', page_no);
        });

        this.subscribeSearchClose = Event.subscribe('search:close', ()=> {
            this.setState({highlight: ''});
        });

        $('.close').on('click', ()=> {
            $(this).parent().remove();
        });
    }

    paginationHandler(page_no, force = false) {
        let view = Contract.getView();
        if (view == 'text' || force || Contract.getIsSearch()) {
            debug('subscribe Text pagination:change', page_no);
            let page = $('#text-' + page_no);
            let parentWindow = $('.text-annotator');
            if (page.offset()) {
                let pageOffsetTop = page.offset().top;
                let parentTop = parentWindow.scrollTop();
                let parentOffsetTop = parentWindow.offset().top;
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
        }
    }

    renderPages() {
        let pages = this.state.pages;
        let pageView = null;
        if (pages.length > 0) {
            pageView = pages.map(page => {
                return (<Page key={page.id} highlight={this.state.highlight} page={page}/>)
            });
        } else {
            return (<div className="text-viewer-warning"
                         dangerouslySetInnerHTML={ {__html: Config.message.pdf_not_loading }}/>);
        }
        return pageView;
    }

    handleClickWarning(e) {
        e.preventDefault();
        $(e.target).parent().remove();
    }

    render() {
        let content = (<div className="message">{LANG.wait_while_loading}</div>);
        let disclaimer = "";

        if (!this.state.isLoading) {
            content = this.renderPages();
            if (this.state.pages.length > 0) {
                disclaimer = (
                    <div className="text-viewer-warning">
                        <span onClick={this.handleClickWarning} className="pull-right close">X</span>
                        <span dangerouslySetInnerHTML={ {__html: Config.message.text_disclaimer }}/>
                    </div>
                );
            }
        }
        return (
            <div className="text-panel">
                {disclaimer}
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