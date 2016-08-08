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

    getAFLink() {
        var link = '#/page/' + this.props.annotation.page_no;
        var link_text = this.props.annotation.article_reference;
        var page = this.props.annotation.page_no;

        if (this.props.annotation.article_reference == '') {
            link_text = this.props.annotation.page_no;
            page = null;
        }

        var page_link = '<a href="' + link + '">' + link_text + '</a>';

        if (page != 'null') {
            page_link = page + " (" + page_link + ")";
        }

        return {__html: page_link};
    }

    render() {
        return (
            <div className="detail">
                <p>{this.getCategory()}</p>
                <p>
                    {LANG.page} <span dangerouslySetInnerHTML={this.getAFLink()}/>
                </p>
            </div>
        );
    }
}

export default Detail;