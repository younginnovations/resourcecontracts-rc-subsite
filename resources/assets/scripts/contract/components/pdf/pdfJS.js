import React from 'react';
import ReactDOM from 'react-dom';

var PdfJS = React.createClass({
    propTypes: {
        file: React.PropTypes.string,
        page: React.PropTypes.number,
        scale: React.PropTypes.number,
        onPageRendered: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            pageNum: 1,
            page: 1,
            pageRendering: false,
            filePending: null,
            scale: 1,
        };
    },
    renderPage: function (file) {
        this.setState({pageRendering: true});
        var self = this;
        var loadingTask = PDFJS.getDocument(file).then(function (pdfDoc) {
            pdfDoc.getPage(self.state.pageNum).then(function (page) {
                var viewport = page.getViewport(self.state.scale);
                var canvas = ReactDOM.findDOMNode(self.refs.pdfCanvas);
                var ctx = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.promise.then(function () {
                    self.state.pageRendering = false;
                    self.notice('');
                    self.props.onPageRendered();
                    if (self.state.filePending !== null) {
                        self.renderPage(self.state.filePending);
                        self.setState({filePending: null});
                    }
                });
            });
        }, function (exception) {
            var loadingErrorMessage = 'An error occurred while loading the PDF.';
            if (exception.name == 'InvalidPDFException') {
                loadingErrorMessage = 'Invalid or corrupted PDF file.';
            } else if (exception.name == 'MissingPDFException') {
                loadingErrorMessage = 'Missing PDF file.';
            } else if (exception.name == 'UnexpectedResponseException') {
                loadingErrorMessage = 'Unexpected server response.';
            }
            self.state.pageRendering = false;
            self.notice('<div class="no-contract-error">' + LANG.sorry_loading + ' <a href= "mailto:' + email + '">' + email + '</a> ' + LANG.to_let_us_know + '</div>', true);
        });
    },

    notice: function (msg, clear) {
        ReactDOM.findDOMNode(this.refs.notice).innerHTML = msg;

        if (clear) {
            var canvas = ReactDOM.findDOMNode(this.refs.pdfCanvas);
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    },

    queueRenderPage: function (file, scale) {
        if (this.state.pageRendering) {
            this.setState({filePending: file, scale: scale});
        } else {
            this.setState({scale: scale});
            this.renderPage(file);
        }
    },

    componentDidMount: function () {
        PDFJS.disableWorker = true;
    },
    componentWillMount: function () {
        debug('Loading PDF ' + this.props.page);
        this.queueRenderPage(this.props.file, this.props.scale);
        console.log('componentWillMount');
    },


    render: function () {
        return (
            <div>
                <div ref="notice"></div>
                <canvas ref="pdfCanvas"></canvas>
            </div>
        );
    }
});

export default PdfJS;
