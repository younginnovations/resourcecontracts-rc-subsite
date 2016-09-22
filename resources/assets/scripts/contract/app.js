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

    componentWillMount() {
        debug('App init');
        var routeName = Contract.getViewName(this.props.location.pathname);
        Contract.setView(routeName);

        if (routeName == 'pdf' || routeName == 'text') {
            Contract.setPageNumber(this.props.location.pathname);
        }
    }

    componentWillReceiveProps(props) {
        var routeName = Contract.getViewName(props.location.pathname);
        if (routeName == 'pdf' || routeName == 'text') {
            Contract.setPageNumber(props.location.pathname);
        }

        if (Contract.getView() != routeName) {
            Contract.setView(routeName);
        }

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
                    <Search />
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
