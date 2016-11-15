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
        return {isLoading: true, results: {}};
    },
    componentDidMount(){
        this.search();
        this.sub = Event.subscribe('search:change', this.search);
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
        this.setState({isLoading: false, results: response.results});
        if (response.results.length > 0) {
            let param = {page_no: response.results[0].page_no, query: Contract.getSearchQuery()};
            Event.publish('search:updated', param);
            debug('Search List updated Published', param);
        }
    },
    componentWillUnmount() {
        this.sub.remove();
    },
    renderItems(){
        return this.state.results.map((row, key) => {
            return (<Item key={key} result={row}/>);
        });
    },
    render() {
        if (this.state.isLoading) {
            return (
                <div className="search-loading">
                    Searching ...
                </div>
            );
        }

        if (this.state.results.length < 1) {
            return (
                <div className="search-no-found">
                    No results found
                </div>
            );
        }

        return (
            <div>
                {this.renderItems()}
            </div>
        );
    }
});

export default List;