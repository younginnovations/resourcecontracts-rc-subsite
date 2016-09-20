import React, {Component} from "react";
import Contract from '../contract';
import Viewer from '../components/text/viewer';
import Reflux from "reflux";
import TextStore from '../stores/textStore';
import TextAction from '../actions/textAction';
import _sortBy from  'lodash/sortBy';
import Event from '../event';

var Text = React.createClass({
    mixins: [Reflux.listenTo(TextStore, 'onChange')],
    getInitialState() {
        return {
            isLoading: true,
            pages: [],
            total: 0
        }
    },
    componentDidMount(){
        this.subscribe = Event.subscribe('pagination:change', this.paginationHandler);
    },
    paginationHandler(page_no) {
        var view = Contract.getView();
        if (view == 'text' || view == 'search') {
            debug('subscribe Text pagination:change', page_no);
            var page = $('#text-' + page_no);
            var parentWindow = $('.text-annotator');
            if (page.offset()) {
                var pageOffsetTop = page.offset().top;
                var parentTop = parentWindow.scrollTop();
                var parentOffsetTop = parentWindow.offset().top;
                parentWindow.animate({scrollTop: parentTop - parentOffsetTop + pageOffsetTop}, 300);
            }
        }
    },
    componentWillUnmount() {
        this.subscribe.remove();
    },
    componentWillMount() {
        TextAction.getPages(Contract.getGuid());
    },
    onChange (event, response) {
        var pages = _sortBy(response.result, (page) => {
            return page.page_no;
        });
        this.setState({pages: pages, total: response.total, isLoading: false});
        this.paginationHandler(Contract.getCurrentPage());
    },
    render() {
        return (
            <div id="view-text">
                <Viewer pages={this.state.pages}/>
            </div>
        );
    }
});

export default Text;