import React, {Component} from "react";
import Page from './page';
import Contract from "../../contract";
import Event from '../../event';

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = ({pages: {}, currentPage: 1});
    }

    componentDidMount() {
        console.log('dd................');
        this.subscribe = Event.subscribe('pagination:change', this.paginationHandler.bind(this));
        this.setState({
            pages: this.props.pages,
            currentPage: Contract.getCurrentPage(),
            scale: Contract.getPdfScale()
        });
    }

    paginationHandler(page_no) {
        var view = Contract.getView();
        if (view == 'pdf' && this.state.currentPage != page_no) {
            this.setState({
                pages: this.props.pages,
                currentPage: Contract.getCurrentPage(),
                scale: Contract.getPdfScale()
            });
        }
    }

    componentWillUnmount() {
        this.subscribe.remove();
    }

    getPage() {
        var page = {};
        this.state.pages.forEach(p => {
            if (p.page_no == this.state.currentPage) {
                page = p;
            }
        });

        return page;
    }

    render() {
        var pageView = null;
        var page = this.getPage();

        if (typeof page.pdf_url != 'undefined') {
            pageView = (<Page page={page}/>);
        }

        return (
            <div className="pdf-viewer pdf-annotator">
                {pageView}
            </div>
        );
    }
}

export default Viewer;