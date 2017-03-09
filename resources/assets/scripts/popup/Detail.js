'use strict';

import React, {Component} from "react";

import {lang} from "./Helper";

class Detail extends Component {
    constructor(props) {
        super(props);
    }

    getCategory() {
        return lang(this.props.annotation.category_key, this.props.annotation.category)
    }

    render() {
        var link = '#/page/' + this.props.annotation.page_no;
        var reference = this.props.annotation.article_reference?
            this.props.annotation.article_reference:
            this.props.annotation.page_no
        return (
            <div className="detail">
                <p>{this.getCategory()}</p>
                <p><span className="for_detail_space">{LANG.page} {this.props.annotation.page_no}</span>
                    ( <a href={link}>{reference} </a>)
                </p>
            </div>
        );
    }
}

export default Detail;