'use strict';
import React from "react";
import {getHashPage} from "./Helper";
import Event from "./Event";

const Pagination = React.createClass({
    getInitialState() {
        return {current: 0, input: 0, total: 0};
    },
    nextPage(e) {
        e.preventDefault();
        let next = this.state.current + 1;
        Event.publish('page.change', {page: next});
        this.setPage(next);
    },

    prevPage(e) {
        e.preventDefault();
        let prev = this.state.current - 1;
        Event.publish('page.change', {page: prev});
        this.setPage(prev);
    },

    setPage(page)
    {
        if (page < 1 || page > this.state.total) {
            return;
        }
        this.setState({current: page, input: page});
        window.location.hash = '#/page/' + page;
    },

    changeHandler(e)
    {
        let input = e.target.value;
        this.setState({input: input});
    },

    changePage()
    {
        let page = getHashPage();
        if (page > 0) {
            this.setState({current: page, input: page});
        }
    },
    componentDidMount()
    {
        this.setState({
            current: this.props.annotation.pages[0].page_no,
            input: this.props.annotation.pages[0].page_no,
            total: this.props.annotation.total_pages
        });
        this.changePage();
        window.addEventListener("hashchange", this.changePage, false);
    },
    render()
    {
        let prev = (<a href="#" className="previous inactive">{LANG.previous}</a>);

        if (this.state.current != 1) {
            prev = (
                <a className="previous" onClick={this.prevPage} href="#">{LANG.previous}</a>
            );
        }

        let next = (<a href="#" className="next inactive">{LANG.next}</a>);
        if (this.state.current != this.state.total) {
            next = (
                <a className="next" onClick={this.nextPage} href="#">{LANG.next}</a>
            );
        }

        return (
            <div className="pdf-pagination pagination">
                {prev}
                <span>
                    <input type="text" onChange={e => this.changeHandler(e)} name="page_no" value={this.state.input}/>
                </span>
                {next}
                <span>of {this.state.total}</span>
            </div>
        );
    }

});

export default Pagination;