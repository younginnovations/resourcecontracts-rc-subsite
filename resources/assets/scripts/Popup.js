import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './popup/Title';
import Detail from './popup/Detail';
import Pagination from './popup/Pagination';
import Pdf from './popup/Pdf';
import Event from "./popup/Event";
import Zoom from "./popup/Zoom";
import Loading from "./popup/Loading";
import Alert from "./popup/Alert";

class Popup extends Component {

    constructor(props) {
        super(props);
        this.state = {site: SITE_NAME};
    }

    render() {
        return (
            <div>
                <Loading />
                <Header site_name={this.state.site} title={this.props.annotation.contract_title}/>
                <Alert />
                <div className="info">
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
