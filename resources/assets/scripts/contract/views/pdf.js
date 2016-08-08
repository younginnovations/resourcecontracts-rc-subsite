import React, {Component} from "react";
import Contract from '../contract';
import Viewer from '../components/pdf/viewer';
import Reflux from "reflux";
import TextStore from '../stores/textStore';
import TextAction from '../actions/textAction';
import _ from  'lodash';

var Pdf = React.createClass({
    mixins: [Reflux.listenTo(TextStore, 'onChange')],
    getInitialState() {
        return {
            isLoading: true,
            pages: [],
            total: 0
        }
    },
    componentWillMount: function () {
        TextAction.getPages(Contract.getGuid());
    },
    onChange: function (event, response) {
        var pages = _.sortBy(response.result, function (page) {
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