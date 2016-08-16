import React, {Component} from "react";
import Contract from '../contract';
import Viewer from '../components/pdf/viewer';
import Reflux from "reflux";
import TextStore from '../stores/textStore';
import TextAction from '../actions/textAction';
import _sortBy from  'lodash/sortBy';
import Event from '../event';

var Pdf = React.createClass({
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
        if (view == 'pdf') {
            debug('subscribe Pdf pagination:change', page_no);
            this.forceUpdate();
        }
    },
    componentWillUnmount() {
        this.subscribe.remove();
    },
    componentWillMount: function () {
        TextAction.getPages(Contract.getGuid());
    },
    onChange: function (event, response) {
        var pages = _sortBy(response.result, function (page) {
            return page.page_no;
        });
        this.setState({pages: pages, total: response.total, isLoading: false})
    },
    render() {
        return (
            <div id="view-pdf">
                <Viewer pages={this.state.pages} total={this.state.total}/>
            </div>
        );
    }
});

export default Pdf;