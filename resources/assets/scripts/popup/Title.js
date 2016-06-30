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
                <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" className="pull-left trigger">trigger</span>
                    <a className="navbar-brand" href={APP_URL} >{this.props.site_name}<span className="beta">Beta</span><span>Contracts</span></a>
                </div>

                <div className="col-sm-12 col-md-9 col-lg-10 navbar-right">
                    <span className="title">{this.props.title}</span>
                </div>
            </nav>
        );
    }
}

export default Title;