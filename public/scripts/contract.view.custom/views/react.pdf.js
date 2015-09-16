var Pdf = React.createClass({
  displayName: 'React-PDF',
  propTypes: {
    file: React.PropTypes.string,
    content: React.PropTypes.string,
    page: React.PropTypes.number,
    scale: React.PropTypes.number,
    onDocumentComplete: React.PropTypes.func,
    onPageComplete: React.PropTypes.func
  },
  getInitialState: function() {
    return { };
  },
  getDefaultProps: function() {
    return {
      page: 1, 
      scale: 1.0
    };
  },
  loadFile: function() {
    var self = this;
    var content = this.props.pdfPage.get("content")
    if(!!content){
      PDFJS.getDocument(content).then(this._onDocumentComplete);   
    }
    else {
      this.setState({ page: ""});
      // console.error('React_Pdf works with a file(URL) or (base64)content. At least one needs to be provided!')
    }
  },
  componentDidMount: function() {
    var self = this;
    this.props.pdfPage.on("change:content", function() {
      self.loadFile();
    });
  },
  render: function() {
    var self = this;
    if (!!this.state.page) {
      setTimeout(function() {
        if(self.isMounted()) {
          var canvas = self.refs.pdfCanvas.getDOMNode(),
            context = canvas.getContext('2d'),
            scale = self.props.scale,
            viewport = self.state.page.getViewport(scale);
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          var pageRendering = self.state.page.render(renderContext);
          var completeCallback = pageRendering._internalRenderTask.callback;
          pageRendering._internalRenderTask.callback = function (error) {
            //Step 2: what you want to do before calling the complete method                  
            completeCallback.call(this, error);
            //Step 3: do some more stuff
            if(!!self.props.onPageRendered && typeof self.props.onPageRendered === 'function'){
              self.props.onPageRendered();
            }
          };
        }
      });
      return (React.createElement("canvas", {ref: "pdfCanvas"}));
    }
    var page_no = this.props.contractApp.getCurrentPage();
    return (this.props.loading || React.createElement("div", null, "Loading pdf page " + page_no));
  },
  _onDocumentComplete: function(pdf){
    // this.setState({ pdf: pdf })
    if(!!this.props.onDocumentComplete && typeof this.props.onDocumentComplete === 'function'){
      this.props.onDocumentComplete(pdf.numPages);
    }
    pdf.getPage(parseInt(this.props.page)).then(this._onPageComplete);
  },
  _onPageComplete: function(page){
    this.setState({ page: page });
    if(!!this.props.onPageComplete && typeof this.props.onPageComplete === 'function'){
      this.props.onPageComplete(page.pageIndex + 1);
    }
  }
});