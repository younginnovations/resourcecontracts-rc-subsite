import React, {Component} from "react";
import Contract from '../contract';
import Viewer from '../components/text/viewer';
import Reflux from "reflux";
import TextStore from '../stores/textStore';
import TextAction from '../actions/textAction';
import _sortBy from  'lodash/sortBy';
import Event from '../event';
import Config from '../config';

var Text = React.createClass({
    mixins: [Reflux.listenTo(TextStore, 'onChange')],
    getInitialState() {
        return {
            isLoading: true,
            pages: [],
            total: 0
        }
    },
    componentDidMount() {
        TextAction.getPages(Contract.getGuid());
    },
    onChange (event, response) {
        var pages = _sortBy(response.result, (page) => {
            return page.page_no;
        });
        this.setState({pages: pages, total: response.total, isLoading: false});
    },
    hasTextPublished(){
        return Contract.getMetadata().is_ocr_reviewed;
    },
    render() {
        if (!this.hasTextPublished()) {
            return (<div id="view-text">
                <div className="text-panel">
                    <div className="text-annotator">
                        <div></div>
                        <div className="text-viewer">
                            <div className="no-contract-error" dangerouslySetInnerHTML={{__html: Config.message.text_not_published}}  />
                        </div>
                    </div>
                </div>
            </div>);
        }
        return (
            <div id="view-text">
                <Viewer pages={this.state.pages}/>
            </div>
        );
    }
});

export default Text;