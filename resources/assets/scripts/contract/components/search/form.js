import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Contract from '../../contract';

class Form extends Component {
    handleSubmit(e) {
        e.preventDefault();
        var searchQuery = this.refs.searchQuery.value.trim();
        if (!searchQuery) {
            return;
        }
        window.location.hash = '#/search/' + encodeURI(searchQuery);
    }

    componentDidMount() {
        this.refs.searchQuery.value = Contract.getSearchQuery();
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