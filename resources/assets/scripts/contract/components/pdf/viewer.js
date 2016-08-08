import React, {Component} from "react";
import Page from './page';
import _map from "lodash/map";

class Viewer extends Component {

    constructor(props) {
        super(props);
        this.state = ({pages: {}});
    }

    componentWillReceiveProps(props) {
        this.setState({
            pages: props.pages
        });
    }

    renderPdfs() {
        return _map(this.state.pages, function (page) {
            return (<Page key={page.id} page={page}/>);
        });
    }

    render() {
        return (
            <div className="pdf-viewer pdf-annotator">
                {this.renderPdfs()}
            </div>
        );
    }
}

export default Viewer;