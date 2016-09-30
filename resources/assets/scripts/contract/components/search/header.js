import React, {Component} from "react";
import Contract from "../../contract";
import Event from "../../event";

class Header extends Component {

    closeSearch(e) {
        e.preventDefault();
        window.location.href = '#text';
        Event.publish('search:close');
    }

    render() {
        return (
            <div className="search-header">
                <div className="search-result-title">
                    {LANG.search_result} "<em><strong>{decodeURI(Contract.getSearchQuery())}</strong></em>"
                </div>
                <a href="#" onClick={this.closeSearch.bind(this)} className="pull-right link close">x</a>
            </div>
        );
    }
}

export default Header;