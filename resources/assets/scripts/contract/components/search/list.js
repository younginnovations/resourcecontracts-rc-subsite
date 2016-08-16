import React, {Component} from "react";
import Item from './item';
import Reflux from "reflux";
import SearchStore from '../../stores/searchStore';
import SearchAction from '../../actions/searchAction';
import Contract from  '../../contract';
import Event from '../../event';
import _map from 'lodash/map';

var List = React.createClass({
    mixins: [Reflux.listenTo(SearchStore, 'onChange')],
    getInitialState() {
        return {isLoading: true, results: {}};
    },
    componentDidMount(){
        this.sub = Event.subscribe('search:change', this.search);
    },
    componentWillMount() {
        this.search();
    },
    search(){
        console.log('Search List search:change listening');
        this.setState({isLoading: true});
        SearchAction.getResults(Contract.getGuid(), Contract.getSearchQuery());
    },
    onChange (event, response) {
        this.setState({isLoading: false, results: response.results});
    },
    componentWillUnmount() {
        this.sub.remove();
    },
    renderItems(){
        return _map(this.state.results, function (row, key) {
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