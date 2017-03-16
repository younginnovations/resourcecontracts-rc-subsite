'use strict';
import React, {Component} from "react";
import {lang} from "./Helper";
import _SortBy from 'lodash/sortBy';
import _GroupBy from 'lodash/groupBy';
import _Map from 'lodash/map';

class Detail extends Component {
    constructor(props) {
        super(props);
    }

    getCategory() {
        return lang(this.props.annotation.category_key, this.props.annotation.category)
    }

    renderArticleReference() {
        let pageURL = [];
        let articleRef = '';
        let url = '';
        let ref = '';
        let pages = _SortBy(this.props.annotation.pages, 'page_no');
        pages = _GroupBy(pages, 'page_no');
        _Map(pages, (page, pagenumber) => {
            articleRef = [];
            page.map((p, i)=> {
                url = '#/page/' + pagenumber;
                ref = p.article_reference ? p.article_reference : p.page_no;
                articleRef.push(' ( <a href=' + url + '>' + ref + '</a> ) ');
            });
            pageURL.push(LANG.page + " " + pagenumber + articleRef.join(', '));
        });

        return pageURL.join(', ');
    }

    render() {
        return (
            <div className="detail">
                <p>{this.getCategory()}</p>
                <span dangerouslySetInnerHTML={{__html: this.renderArticleReference()}}/>
            </div>
        );
    }
}

export default Detail;
