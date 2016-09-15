'use strict';

import React, {Component} from "react";

class Title extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-static-top no--search--wrap">
                <div className="navbar-header">
                    <div className="navbar-brand" href={APP_URL}>
                        {this.props.site_name}
                        <span>Contracts</span>
                    </div>
                </div>

                <div className="navbar-right">
                    <span className="title">{this.props.title}</span>
                </div>
            </nav>
        );
    }
}

export default Title;