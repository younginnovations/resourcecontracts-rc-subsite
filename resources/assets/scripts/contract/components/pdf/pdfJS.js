import React from 'react';
import ReactDOM from 'react-dom';
import Config from '../../config';

var PdfJS = React.createClass({
    propTypes: {
        file: React.PropTypes.string,
        page: React.PropTypes.number,
        scale: React.PropTypes.number,
        onPageRendered: React.PropTypes.func
    },
    getInitialState() {
        return {
            pageNum: 1,
            page: 1,
            pageRendering: false,
            filePending: null,
            scale: 1,
            message: ''
        };
    },
    renderPage (file) {
        this.setState({pageRendering: true});
        var loadingTask = PDFJS.getDocument(file).then((pdfDoc) => {
            pdfDoc.getPage(this.state.pageNum).then((page) => {
                var viewport = page.getViewport(this.state.scale);
                var canvas = ReactDOM.findDOMNode(this.refs.pdfCanvas);
                var ctx = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.promise.then(()=> {
                    this.state.pageRendering = false;
                    this.notice('');
                    this.props.onPageRendered();
                    if (this.state.filePending !== null) {
                        this.renderPage(this.state.filePending);
                        this.setState({filePending: null});
                    }
                });
            });
        }, (exception) => {
            this.state.pageRendering = false;
            this.notice('<div class="no-contract-error">' + Config.message.pdf_not_loading + '</div>', true);
        });
    },
    notice (msg, clear) {
        this.setState({message: msg});
        if (clear) {
            var canvas = ReactDOM.findDOMNode(this.refs.pdfCanvas);
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    },
    queueRenderPage (file, scale) {
        if (this.state.pageRendering) {
            this.setState({filePending: file, scale: scale});
        } else {
            this.setState({scale: scale});
            this.renderPage(file);
        }
    },
    componentDidMount () {
        PDFJS.disableWorker = true;
        PDFJS.verbosity = 0;
    },
    loadPdf (props) {
        debug('PDF JS Loading PDF ', props.page, props.file, props.scale);
        this.notice('Loading PDF ' + props.page);
        this.queueRenderPage(props.file, props.scale);
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return JSON.stringify(nextProps) !== JSON.stringify(nextState)
    },
    componentWillReceiveProps (props) {
        this.loadPdf(props);
    },
    render () {
        return (
            <div className="pdf-container">
                <div className="message" dangerouslySetInnerHTML={{__html: this.state.message}}/>
                <canvas ref="pdfCanvas"></canvas>
            </div>
        );
    }
});

export default PdfJS;
