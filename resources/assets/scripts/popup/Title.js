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
                        <a className="navbar-brand" href={APP_URL} >{this.props.site_name}<span className="beta">Beta</span><span>Contracts</span></a>
                    </div>

            <div className="navbar-right">
                <span>{this.props.title}</span>
            </div>
            </nav>
        );
    }
}

export default Title;