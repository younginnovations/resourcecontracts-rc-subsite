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
    componentDidMount: function () {
        TextAction.getPages(Contract.getGuid());
    },
    onChange: function (event, response) {
        var pages = _sortBy(response.result, function (page) {
            return page.page_no;
        });
        this.setState({pages: pages, total: response.total, isLoading: false})
    },
    render() {
        if (this.state.isLoading) {
            return (<div id="view-pdf">
                <div className="pdf-viewer pdf-annotator"></div>
            </div>);
        }

        return (
            <div id="view-pdf">
                <Viewer pages={this.state.pages} total={this.state.total}/>
            </div>
        );
    }
});

export default Pdf;