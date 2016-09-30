import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Contract from '../../contract';
import Event from '../../event';

class Form extends Component {
    handleSubmit(e) {
        e.preventDefault();
        var searchQuery = this.refs.searchQuery.value.trim();
        if (!searchQuery) {
            return;
        }
        window.location.hash = '#/search/' + encodeURI(searchQuery);
    }

    fireEvent(query) {
        if (query != '') {
            Event.publish('search:change', query);
            debug('Search form publish search:change', query);
        }
    }

    componentDidMount() {
        this.refs.searchQuery.value = Contract.getSearchQuery();
        if ("onhashchange" in window) {
            var locationHashChanged = () => {
                if (Contract.getView() == 'search') {
                    var query = Contract.getSearchQuery();
                    this.refs.searchQuery.value = query;
                    this.fireEvent(query);
                }
            };
            window.onhashchange = locationHashChanged;
        }
    }

    render() {
        return (
            <div className="text-search-container">
                <div className="text-search">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input type="text" className="" ref="searchQuery" placeholder={LANG.search_in_this_document}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;