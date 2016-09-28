var Pagination = React.createClass({
    clickHandler: function (e) {
        e.preventDefault();
        this.props.clipCollection.trigger('paginate', {page: $(e.target).text()});
        $.cookie("clippage", $(e.target).text(), {
            path: '/'
        });
        $.cookie("totalpages", this.props.pageState.total_pages, {
            path: '/'
        });
    },
    pages: function () {
        var page = [];
        var no_of_pages = 3;

        if ((this.props.pageState.current_page - no_of_pages) > 0) {
            page.push(<li><a style={{margin:'0px 20px'}} href="#" onClick={this.clickHandler}>langClip.firstPage</a></li>);
            page.push(<li><a style={{margin:'0px 20px'}} href="#" onClick={this.clickHandler}>langClip.prev</a></li>);
        }

        if ((this.props.pageState.current_page - no_of_pages) > 0) {
            page.push(<li><a href="javascript:void();">...</a></li>);
        }

        for (var i = no_of_pages - 1; i >= 0; i--) {
            if ((this.props.pageState.current_page - i) > 0) {
                page.push(<li><a href="#" onClick={this.clickHandler}>{this.props.pageState.current_page - i}</a></li>);
            }
        }

        page.push(<li className="active"><a href="javascript:void()">{ this.props.pageState.current_page + 1 }</a></li>);

        for (i = 2; i <= no_of_pages; i++) {
            if ((this.props.pageState.current_page + i) <= this.props.pageState.total_pages) {
                page.push(<li><a href="#" onClick={this.clickHandler}>{this.props.pageState.current_page + i}</a></li>);
            }
        }

        if ((this.props.pageState.current_page + 1 + no_of_pages) < this.props.pageState.total_pages) {
            page.push(<li><a href="javascript:void()">...</a></li>);
        }
        if ((this.props.pageState.total_pages - 1) != this.props.pageState.current_page) {
            page.push(<li className="num-text next"><a href="#" onClick={this.clickHandler}>{langClip.nextpage}</a></li>);
            page.push(<li className="num-text"><a href="#" onClick={this.clickHandler}>{langClip.lastpage}</a></li>);
        }

        return page;
    },
    render: function () {
        return (<div className="pagination-wrapper">
            <ul>
                {this.pages()}
            </ul>
        </div>);
    }
});

