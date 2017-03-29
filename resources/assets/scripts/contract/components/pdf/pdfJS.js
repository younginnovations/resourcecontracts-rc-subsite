import React from 'react';
import ReactDOM from 'react-dom';
import Config from '../../config';
import Contract from '../../contract';
PDFJS.workerSrc = Config.appUrl('js/pdfjs/pdf.worker.js');
var cachePDF = [];
var PdfJS = React.createClass({
    propTypes: {
        file: React.PropTypes.string,
        page: React.PropTypes.number,
        scale: React.PropTypes.number,
        onPageRendered: React.PropTypes.func
    },
    getInitialState() {
        return {
            page: 1,
            pageRendering: false,
            filePending: null,
            scale: 1,
            message: ''
        };
    },
    abortXhr(){
        if (this.xhr && this.xhr.readystate != 4) {
            //if the users clicks pagination quickly, abort previous ajax calls.
            this.xhr.abort();
        }
    },
    fetchBlob(uri, callback) {
        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', uri, true);
        this.xhr.onprogress = (evt)=> {
            if (evt.lengthComputable) {
                var percentComplete = (evt.loaded / evt.total) * 100;
                $('.percentage').text(' (' + Math.round(percentComplete) + '%)');

                if (percentComplete > 99) {
                    setTimeout(()=> {
                        $('.percentage').hide();
                    }, 600);
                } else {
                    $('.percentage').show();
                }
            }
        };

        this.xhr.responseType = 'blob';
        this.xhr.onload = (e) => {
            if (this.xhr.status == 200) {
                var blob = new Blob([this.xhr.response], {
                    type: 'application/pdf'
                });
                var url = URL.createObjectURL(blob);
                if (callback) {
                    cachePDF[uri] = url;
                    callback(url);
                }
            }
            else {
                cachePDF[uri] = '';
                callback('');
            }
        };

        this.xhr.send();
    },
    renderPage(file) {
        this.abortXhr();
        if (cachePDF[file]) {
            this.renderPdf(cachePDF[file]);
        } else {
            this.fetchBlob(file, this.renderPdf);
        }
    },
    renderPdf(file) {
        if (file == '') {
            this.state.pageRendering = false;
            if (this.state.filePending !== null) {
                this.renderPage(this.state.filePending);
                this.setState({filePending: null});
            }
            this.notice('<div class="no-contract-error">' + Config.message.pdf_not_loading + '</div>', true);
            return;
        }

        this.setState({pageRendering: true});
        var loadingTask = PDFJS.getDocument(file).then((pdfDoc) => {
            pdfDoc.getPage(this.state.page).then((page) => {
                var canvas = ReactDOM.findDOMNode(this.refs.pdfCanvas);
                if (!canvas) {
                    return;
                }
                var ctx = canvas.getContext('2d');

                var scale = this.props.scale;
                var viewport = page.getViewport(1);

                if (viewport.width > 600 && scale === 1) {
                    scale = 595.0 / viewport.width;
                } else if (viewport.width > 600) {
                    scale = scale * 595.0 / viewport.width;
                }

                viewport = page.getViewport(scale);

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
    notice (msg, clear = false) {
        this.setState({message: msg});
        if (clear) {
            var canvas = ReactDOM.findDOMNode(this.refs.pdfCanvas);
            $('.annotator-viewer').addClass('annotator-hide');
            $('.annotator-pdf-hl').hide();
            if (canvas) {
                var context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.fill();
            }
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
        this.loadPdf(this.props);
    },
    loadPdf (props) {
        debug('PDF JS Loading PDF ', props.page, props.file, props.scale);
        this.notice('Loading PDF ' + props.page + '<span class="percentage"></span>', true);
        this.queueRenderPage(props.file, props.scale);
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
