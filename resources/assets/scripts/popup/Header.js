'use strict';

import React, {Component} from "react";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    siteName() {
        return {__html: this.props.site_name};
    }

    render() {
        var site_name = (this.props.site_name);
        return (
            <nav className="navbar navbar-static-top no--search--wrap">
                <div className="navbar-header">
                    <a className="navbar-brand" href={APP_URL} dangerouslySetInnerHTML={this.siteName()}/>
                </div>
                <div className="navbar-right">
                    <span className="title">{this.props.title}</span>
                </div>
            </nav>
        );
    }
}

export default Header;