import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Title';
import Detail from './Detail';
import Pagination from './Pagination';
import Pdf from './Pdf';
import Event from "./Event";
import Zoom from "./Zoom";
import Loading from "./Loading";
import Alert from "./Alert";
import Config from "./config";
import Contract from "./Contract";
import { setPageHash } from "./Helper";

class Popup extends Component {

    constructor(props) {
        super(props);
        this.state = {site: SITE_NAME};
    }

    componentDidMount() {
        this.changeAnnotationPageHash();
    }

    changeAnnotationPageHash() {
        var annotation = this.props.annotation;
        var page = this.getAnnotationPage(annotation);
        if (page) {
            setPageHash(page);
        }
    }

    getAnnotationPage(annotation){
        debugger
        var annotationData = Config.contract.annotations.result.filter( item => item.annotation_id == annotation.annotation_id && (typeof item.shapes == 'object'));
        if ( annotationData && annotationData[0].page_no) {
            return annotationData[0].page_no;
        }

        return 1;
    }

    render() {
        return (
            <div className="popup-wrapper">
                <Loading />
                <Header site_name={this.state.site} title={this.props.annotation.contract_title}/>
                <Alert />
                <div className="info head-wrap clearfix">
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

ReactDOM.render(<Popup annotation={Config.popupAnnotation}/>, document.getElementById('app'));
