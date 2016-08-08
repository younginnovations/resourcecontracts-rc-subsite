import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from "./Header";
import Detail from "./Detail";
import Pagination from "./Pagination";
import Pdf from "./Pdf";
import Event from "./Event";
import Zoom from "./Zoom";
import Loading from "./Loading";
import Alert from "./Alert";

class Popup extends Component {

    constructor(props) {
        super(props);
        this.state = {site: SITE_NAME};
    }

    render() {
        return (
            <div>
            sdfsdfsdf
                <Loading />
                <Header site_name={this.state.site} title={this.props.annotation.contract_title}/>
                <Alert />
                <div className="head-wrap clearfix info">
                    <div className="col-md-6">
                        <Detail annotation={this.props.annotation}/>
                    </div>
                    <div className="col-md-6">
                        <Pagination annotation={this.props.annotation}/>
                        <Zoom/>
                    </div>
                </div>
                <div className="pdf-wrapper">
                    <Pdf annotation={this.props.annotation}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Popup annotation={Annotation}/>, document.getElementById('app'));
