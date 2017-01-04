import React, {Component} from "react";
import Contract from '../contract';
import Viewer from '../components/pdf/viewer';
import Reflux from "reflux";
import TextStore from '../stores/textStore';
import TextAction from '../actions/textAction';
import _sortBy from  'lodash/sortBy';
import Event from '../event';

let Pdf = React.createClass({
    mixins: [Reflux.listenTo(TextStore, 'onChange')],
    getInitialState() {
        return {
            isLoading: true,
            pages: [],
            currentPage: 1
        };

    },
    componentDidMount: function () {
        TextAction.getPages(Contract.getGuid());
        this.subscribe = Event.subscribe('pagination:change', this.paginationHandler.bind(this));
    },
    paginationHandler(page_no) {
        let view = Contract.getView();
        if (view == 'pdf' && this.state.currentPage.page_no != page_no) {
            $('.pdf-viewer').animate({scrollTop: 0}, 'slow');
            this.setState({currentPage: this.getSelectedPage(this.state.pages)})
        }
    },
    onChange: function (event, response) {
        let pages = _sortBy(response.result, function (page) {
            return page.page_no;
        });

        this.setState({pages, currentPage: this.getSelectedPage(pages), isLoading: false})
    },
    getSelectedPage(pages)
    {
        let currentPage = {};
        pages.forEach(p => {
            if (p.page_no == Contract.getCurrentPage()) {
                currentPage = p;
            }
        });

        return currentPage;
    },

    render() {
        if (this.state.isLoading) {
            return (<div id="view-pdf">
                <div className="pdf-viewer pdf-annotator message">{LANG.loading}</div>
            </div>);
        }
        return (
            <div id="view-pdf">
                <Viewer pages={this.state.pages} />
            </div>
        );
    }
});

export default Pdf;