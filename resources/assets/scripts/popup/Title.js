'use strict';

import React, {Component} from "react";

class Title extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="title-head-wrap">
                <div className="title-wrap">
                    <div className="navbar-header">
                        <a className="navbar-brand" href={APP_URL} >{this.props.site_name}<span className="beta">Beta</span><span>Contracts</span></a>
                    </div>
                    <span>{this.props.title}</span>
                </div>
            </div>
        );
    }
}

export default Title;