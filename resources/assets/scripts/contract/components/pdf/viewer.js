import React, {Component} from "react";
import Page from './page';
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import Contract from "../../contract";

class Viewer extends Component {

    constructor(props) {
        super(props);
        this.state = ({pages: {}, currentPage: 1, scale: 1});
    }

    componentWillReceiveProps(props) {
        this.setState({
            pages: props.pages,
            currentPage: Contract.getCurrentPage(),
            scale: Contract.getPdfScale()
        });
    }

    getPage() {
        var page = {};
        _map(this.state.pages, (p) => {
            if (p.page_no == this.state.currentPage) {
                page = p;
            }
        });

        return page;
    }

    render() {
        var pageView = null;
        var page = this.getPage();
        if (!_isEmpty(page)) {
            pageView = (<Page scale={this.state.scale} page={this.getPage()}/>);
        }
        return (
            <div className="pdf-viewer pdf-annotator">
                {pageView}
            </div>
        );
    }
}

export default Viewer;