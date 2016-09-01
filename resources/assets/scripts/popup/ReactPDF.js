import React from 'react';
import ReactDOM from 'react-dom';
import Event from './Event';

const ReactPDF = React.createClass({
    getInitialState(){
        return {
            pageNum: 1,
            page: 1,
            pageRendering: false,
            filePending: null,
            scale: 1
        };
    },
    renderPage(file) {
        this.setState({pageRendering: true});
        var loadingTask = PDFJS.getDocument(file).then((pdfDoc)=> {
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
                renderTask.promise.then(() => {
                    this.setState({pageRendering : false});
                    Event.publish('loading', false);
                    if (this.state.filePending !== null) {
                        this.renderPage(this.state.filePending);
                        this.setState({filePending: null});
                    }
                });
            });
        }, (exception) => {
            var loadingErrorMessage = lang.loading_error;
            if (exception.name == 'InvalidPDFException') {
                loadingErrorMessage = lang.corrupted_pdf;
            } else if (exception.name == 'MissingPDFException') {
                loadingErrorMessage = lang.missing_pdf;
            } else if (exception.name == 'UnexpectedResponseException') {
                loadingErrorMessage = LANG.unexpected_server;
            }
            Event.publish('loading', false);
            this.setState({pageRendering : false});
            var error_message = LANG.sorry_loading + '<a href= "mailto:' +CONTACT_EMAIL+'">'+CONTACT_EMAIL+'</a> '+LANG.to_let_us_know;
            Event.publish('alert', ['danger', error_message]);
        });

        loadingTask.onProgress = function getDocumentProgress(progressData) {
           console.log(progressData);
        };
    },

    queueRenderPage(file) {
        if (this.state.pageRendering) {
            this.setState({filePending: file});
        } else {
            this.renderPage(file);
        }
    },

    componentDidMount()
    {
        PDFJS.disableWorker = true;
        this.queueRenderPage(this.props.file);
        Event.subscribe('zomm.scale', zoom => {
            this.setState({scale: zoom.scale});
        });
        Event.publish('loading', [true, 'Loading pdf ' + this.props.page]);
    },

    componentWillReceiveProps(props)
    {
        Event.publish('loading', [true, 'Loading pdf ' + props.page]);
        this.queueRenderPage(props.file);
    },

    render()
    {
        return (
            <div className="canvas-wrap">
                <canvas ref="pdfCanvas"></canvas>
            </div>
        );
    }
});
export default ReactPDF;
