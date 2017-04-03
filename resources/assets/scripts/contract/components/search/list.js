import React, {Component} from "react";
import Item from './item';
import Reflux from "reflux";
import SearchStore from '../../stores/searchStore';
import SearchAction from '../../actions/searchAction';
import Contract from  '../../contract';
import Event from '../../event';

var List = React.createClass({
    mixins: [Reflux.listenTo(SearchStore, 'onChange')],
    getInitialState() {
        return {isLoading: true, results: [], page_no: 1, totalSearchCount: 0};
    },
    componentDidMount(){
        this.search();
        this.sub = Event.subscribe('search:change', this.search);
        this.subPageChange = Event.subscribe('pagination:change', ()=> {
            this.setState({page_no: Contract.getCurrentPage()});
        });
        this.subScrollChange = Event.subscribe('pagination:scroll', ()=> {
            this.setState({page_no: Contract.getCurrentPage()});
        });
    },
    search(){
        if (Contract.getSearchQuery() == '' || Contract.getView() != 'search') {
            return false;
        }
        debug('Search List search:change listening', Contract.getSearchQuery());
        this.setState({isLoading: true});
        SearchAction.getResults(Contract.getGuid(), Contract.getSearchQuery());
    },

    onChange (event, response) {
        Contract.setIsSearch(true);
        this.setState({isLoading: false, results: response.results ? response.results : []});
        this.setState({totalSearchCount: response.total_search_count});
        if (typeof response.results != 'undefined' && response.results.length > 0) {
            let param = {page_no: response.results[0].page_no, query: Contract.getSearchQuery(), res: response.results};
            Contract.setSearchQueries(response.results);
            Event.publish('search:updated', param);
            debug('Search List updated Published', param);
        }
    },

    componentWillUnmount() {
        this.sub.remove();
        this.subPageChange.remove();
        this.subScrollChange.remove();
    },

    renderItems(){
        return this.state.results.map((row, key) => {
            return (<Item key={key} result={row}/>);
        });
    },

    searchTotalCount() {
        let count = this.state.totalSearchCount;
        let match = '';
        if (count == 0 || count > 1) {
            match = LANG.matches;
        }
        else if (count == 1) {
            match = LANG.match;
        }

        return (<p><strong>{count}</strong> {match} {LANG.in_document}</p>);
    },

    currentPageSearchCount(){
        let count = 0;

        this.state.results.map((row) => {
            if (Contract.getCurrentPage() == row.page_no) {
                count += row.count;
            }
        });

        if (count == 0) {
            return LANG.no_matches_found_in_current_page;
        }
        else if (count == 1) {
            return (<p><strong> {count} </strong> {LANG.match} {LANG.on_current_page}</p>);
        }
        else {
            return (<p><strong>{count}</strong> {LANG.matches} {LANG.on_current_page}</p>);
        }
    },

    render() {
        if (this.state.isLoading) {
            return (
                <div className="search-loading">
                    {LANG.searching}
                </div>
            );
        }

        if (this.state.results.length < 1) {
            return (
                <div className="search-no-found">
                    {LANG.no_results_found}
                </div>
            );
        }

        return (
            <div>
                {this.searchTotalCount()}
                {this.currentPageSearchCount()}
                {this.renderItems()}
            </div>
        );
    }
});

export default List;
