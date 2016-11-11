import React, {Component} from "react";
import Contract from "../../contract";
import Event from "../../event";

class Header extends Component {

    closeSearch(e) {
        e.preventDefault();
        Contract.setIsSearch(false);
        Event.publish('search:close');
        window.location.href = '#/text';
    }

    render() {
        var query = Contract.getSearchQuery() ? Contract.getSearchQuery() : $('.text-search').find('input').val();
        return (
            <div className="search-header clearfix">
                <div className="search-result-title">
                    {LANG.search_result} "<em><strong>{decodeURI(query)}</strong></em>"
                </div>
                <a href="#" onClick={this.closeSearch.bind(this)} className="pull-right link close">x</a>
            </div>
        );
    }
}

export default Header;