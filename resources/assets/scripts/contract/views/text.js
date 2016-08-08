import React, {Component} from "react";
import Contract from '../contract';
import Viewer from '../components/text/viewer';
import Reflux from "reflux";
import TextStore from '../stores/textStore';
import TextAction from '../actions/textAction';
import _sortBy from  'lodash/sortBy';

var Text = React.createClass({
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
        var pages = _sortBy(response.result, function (page) {
            return page.page_no;
        });
        this.setState({pages: pages, total: response.total, isLoading: false})
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