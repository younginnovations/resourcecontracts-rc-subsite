import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Config from '../../config';
import Contract from '../../contract';

class PDFImage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            page: 1,
            pageRendering: false,
            filePending: null,
            scale: 1,
            message: ''
        });
    }

    notice(msg, clear = false) {
        this.setState({message: msg});
        if (clear) {
            $('.annotator-viewer').addClass('annotator-hide');
            $('.annotator-pdf-hl').hide();
        }
    }

    componentDidMount() {
        this.loadPdf(this.props);
    }

    loadPdf(props) {
        debug('PDF JS Loading PDF ', props.page, props.file, props.scale);
        this.notice('Loading PDF ' + props.page, true);
        this.setState({img: props.file, scale: props.scale});
        this.notice('');
        this.props.onPageRendered(props.page);
    }

    componentWillReceiveProps(props) {
        this.loadPdf(props);
    }

    width() {
        return 612 * this.state.scale;
    }

    height() {
        return 792 * this.state.scale;
    }

    render() {
        return (
            <div className="pdf-container">
                <div className="message" dangerouslySetInnerHTML={{__html: this.state.message}}/>
                <div id={'img-' +this.props.page} className="imageWrapper">
                    <img className={'img-' +this.props.page}
                         width={this.width()}
                         height={this.height()}
                         src={this.state.img}/>
                </div>
            </div>
        );
    }
}

export default PDFImage;
