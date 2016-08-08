import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Contract from '../contract';
import Event from '../event';
class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = ({total: 1, page: 1});
    }

    componentDidMount() {
        this.setState({total: Contract.getTotalPages()});
        this.refs.pageNumber.value = this.state.page;

        this.subscribeScroll = Event.subscribe('pagination:scroll', number=> {
            if (this.state.page != number) {
                this.refs.pageNumber.value = number;
                this.setState({page: number});
            }
        });

        this.subscribeUpdate = Event.subscribe('pagination:update', number=> {
            if (this.state.page != number) {
                this.changePage(number);
            }
            debug('subscribe pagination:update', number);
        })
    }

    componentWillUnmount() {
        this.subscribeScroll.remove();
        this.subscribeUpdate.remove();
    }

    changePage(page_no) {
        this.refs.pageNumber.value = page_no;
        this.setState({page: page_no});
        Event.publish('pagination:change', page_no);
        debug('publish pagination:change', page_no);
    }

    clickPrevious(e) {
        e.preventDefault();
        if (this.state.page > 1) {
            this.changePage(this.state.page - 1);
        }
    }

    clickNext(e) {
        e.preventDefault();
        if (this.state.page < this.state.total) {
            this.changePage(this.state.page + 1);
        }
    }

    handleKeyDown(e) {
        if (e.keyCode == 13) {
            var inputPage = parseInt(this.refs.pageNumber.value);
            if (inputPage > 0 && inputPage <= this.state.total) {
                this.changePage(inputPage);
            } else {
                this.changePage(this.state.page);
            }
        }
    }

    render() {
        return (
            <div className="text-pagination pagination">
                <a href="#" className="previous" onClick={this.clickPrevious.bind(this)}>{LANG.previous}</a>
                <input type="text" className="goto" ref="pageNumber" onKeyDown={this.handleKeyDown.bind(this)}/>
                <a href="#" className="next" onClick={this.clickNext.bind(this)}>{LANG.next}</a>
                {LANG.of} {this.state.total}
            </div>
        );
    }
}

export default Pagination;