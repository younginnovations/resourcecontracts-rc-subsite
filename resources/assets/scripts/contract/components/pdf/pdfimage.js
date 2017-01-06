import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Config from '../../config';
import Contract from '../../contract';
import Waypoint from '../waypoint';
import Event from '../../event';

class PDFImage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            page: 1,
            pageRendering: false,
            filePending: null,
            scale: 1,
            message: '',
            img: '',
            threshold: 0
        });
    }

    notice(msg, clear = false) {
        this.setState({message: msg});
        if (clear) {
            $('.annotator-viewer').addClass('annotator-hide');
        }
    }

    componentDidMount() {
        var threshold = this.props.page.page_no == 1 ? 0 : -0.4;
        this.setState({threshold: threshold});
        this.loadPdf(this.props);
    }

    loadPdf(props) {
        debug('PDF JS Loading PDF ', props.page, props.file, props.scale);
        this.notice('Loading PDF ' + props.page, true);
        this.setState({img: props.file, scale: props.scale});
        this.notice('');

        var divStyle = {
            'background-image': 'url(' + props.file + ')',
            height: this.height() + 'px',
            width: this.width() + 'px',
            'background-size': '100%'
        };

        $('<img/>').attr('src', props.file).load(()=> {
            $(this).remove(); // prevent memory leaks
            $('#img-' + props.page + ' .pdf-image').html('').css(divStyle);

            setTimeout(()=> {
                this.props.onPageRendered(props.page);
            }, 500);
        });

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

    _onEnter(number) {
        if (Contract.isDisablePagination()) {
            return;
        }
        Event.publish('pagination:scroll', number);
        debug('publish onEnter pagination:scroll', number);
    }

    _onLeave(number, e) {
        if (Contract.isDisablePagination()) {
            return;
        }
        if (e.position == 'below' && number > 0) {
            Event.publish('pagination:scroll', (number - 1));
            debug('publish onLeave pagination:scroll', (number - 1));
        }
    }

    render() {
        var divStyle = {
            height: this.height() + 'px',
            width: this.width() + 'px',
        };
        return (
            <div className="pdf-container">
                <div className="message" dangerouslySetInnerHTML={{__html: this.state.message}}/>
                <div id={'img-' +this.props.page} className="imageWrapper">
                    <Waypoint
                        onEnter={(e)=>{this._onEnter(this.props.page)}}
                        onLeave={(e)=>{this._onLeave(this.props.page,e)}}
                        threshold={this.state.threshold}/>

                    <div className={'pdf-image pdf-image-' +this.props.page} style={divStyle}>
                        loading...
                    </div>
                </div>
            </div>
        );
    }
}

export default PDFImage;
