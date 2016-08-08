import React, {Component} from "react";
import Contract from './contract';
import SearchForm from './components/search/form';
import Tab from './components/tab';
import Pagination from './components/pagination';
import Zoom from './components/pdf/zoom';
import Download from './components/download';
import Share from './components/share';
import Annotations from './views/annotations';
import Metadata from './views/metadata';
import Title from './components/title';
import Event from './event';
import Search from './views/search';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debug('App init');
        var routeName = Contract.getViewName(this.props.location.pathname);
        Event.publish('route:location', routeName);
        debug('app : publish: route:location', routeName);
        this.subscribe = Event.subscribe('pagination:change', this.paginationHandler);
    }

    paginationHandler(page_no) {
        debug('subscribe pagination:change', page_no);
        var view = Contract.getView();
        var page = $('#' + view + '-' + page_no);
        var parentWindow = $('.' + view + '-annotator');
        if (page.offset()) {
            var pageOffsetTop = page.offset().top;
            var parentTop = parentWindow.scrollTop();
            var parentOffsetTop = parentWindow.offset().top;
            parentWindow.animate({scrollTop: parentTop - parentOffsetTop + pageOffsetTop}, 300);
        }
    }

    componentWillReceiveProps(props) {
        var routeName = Contract.getViewName(props.location.pathname);
        if (Contract.getView() != routeName) {
            Event.publish('route:location', routeName);
        }
    }

    componentWillUnmount() {
        this.subscribe.remove();
    }

    render() {
        return (
            <div className="main-app">
                <Title />
                <div className="title-head-wrap">
                    <div className="head-wrap clearfix">
                        <SearchForm/>
                        <Tab />
                        <Pagination />
                        <Zoom/>
                        <div className="right-column-view">
                            <Download/>
                            <Share/>
                        </div>
                    </div>
                </div>
                <div className="document-wrap">
                    <Annotations/>
                    <Search>
                    <div className="view-container">
                        {this.props.children}
                    </div>
                    <Metadata/>
                </div>
            </div>
        );
    }
}

export default App;
