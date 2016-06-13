'use strict';

import React, {Component} from "react";
import {getHashPage} from "./Helper";
import ReactPDF from "./ReactPDF";
import Event from './Event';

class Pdf extends Component {
    constructor(props) {
        super(props);
        this.state = {page: 0, scale: 1, isLoading: true};
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        window.addEventListener("hashchange", this.changePage, false);
        Event.subscribe('zomm.scale', zoom=> {
            this.setState({scale: zoom.scale});
        });
    }

    componentWillMount() {
        this.setState({
            page: this.props.annotation.page_no,
            contract_id: this.props.annotation.contract_id,
            isLoading: false
        });
        this.changePage();
        Event.publish('loading', false);
    }

    changePage() {
        let page = getHashPage();
        if (page > 0) {
            this.setState({page: page});
        }
    }

    getFile() {
        return AWS_URL + "/" + this.state.contract_id + "/" + this.state.page + ".pdf";
    }

    render() {
        if (this.state.isLoading) {
            return null;
        }
        return (
            <div>
                <ReactPDF file={this.getFile()} page={this.state.page} scale={this.state.scale}/>
            </div>
        );
    }
}

export default Pdf;