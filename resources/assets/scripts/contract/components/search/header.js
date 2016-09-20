import React, {Component} from "react";
import Contract from "../../contract";

class Header extends Component {
    render() {
        return (
            <div className="search-header">
                <div className="search-result-title">
                    {LANG.search_result} "<em><strong>{decodeURI(Contract.getSearchQuery())}</strong></em>"
                </div>
                <a href="#/text" class="pull-right link close">x</a>
            </div>
        );
    }
}

export default Header;