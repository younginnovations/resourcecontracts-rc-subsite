var NavigationView = React.createClass({
  render: function() {
    if(this.props.contractApp.getView() === "pdf") {
      pdfClass = "active";
      textClass = "";
    } else {
      textClass = "active";
      pdfClass = "";
    }
    return (
      <div className="navigation">
        <a href="#/text" className={textClass}>Text</a>
        <a href="#/pdf" className={pdfClass}>Pdf</a>
      </div>
    );
  }
});
//<a href="#/both">Both</a>
var TextPaginationView = React.createClass({
  getInitialState: function() {
    return {
      visiblePage: 1,
      totalPages: 0
    }
  },
  changePage: function(page_no) {
    this.refs.userInputText.getDOMNode().value = page_no;
    this.props.contractApp.setCurrentPage(page_no);
    this.setState({visiblePage: page_no});
    this.props.contractApp.triggerScrollToTextPage();
    // this.props.contractApp.trigger("scroll-to-page");
    // this.props.currentPage.set({"page_no": page_no});  
    // this.props.currentPage.trigger("scroll-to-page");
  },
  clickPrevious: function(e) {
    e.preventDefault();
    if(this.state.visiblePage > 1) {
      this.changePage(this.state.visiblePage-1);
    }
  },
  clickNext: function(e) {
    e.preventDefault();
    if(this.state.visiblePage < this.state.totalPages) {
      this.changePage(this.state.visiblePage+1);
    }
  },
  handleKeyDown: function(e) {
    if(e.keyCode == 13) {
      var inputPage = parseInt(this.refs.userInputText.getDOMNode().value);
      if(inputPage > 0 && inputPage <= this.state.totalPages) {
        this.changePage(inputPage);
      } else {
        this.changePage(this.state.visiblePage);
      }     
    }
  },
  componentDidMount: function() {
    var self = this;
    self.setState({totalPages: self.props.contractApp.getTotalPages()});
    this.props.contractApp.on("update-text-pagination-page", function(page_no) {
      self.refs.userInputText.getDOMNode().value = page_no;
      self.setState({visiblePage: page_no});
    });
    // this.props.currentPage.on("update-pagination-page", function(page_no) {
    //   self.refs.userInputText.getDOMNode().value = page_no;
    //   self.setState({visiblePage: page_no});
    // });
    // this.props.pagesCollection.on("reset", function() {
    //   self.setState({totalPages: self.props.pagesCollection.length});
    // });
    this.refs.userInputText.getDOMNode().value = this.state.visiblePage;
  },  
  render: function() {
    return (
      <div className="text-pagination pagination" style={this.props.style}>
        <a href="#" className="previous" onClick={this.clickPrevious}>Previous</a>
        <input type="text" className="goto" ref="userInputText" onKeyDown={this.handleKeyDown} />
        <a href="#" className="next" onClick={this.clickNext}>Next</a> of {this.state.totalPages}
      </div>
    );
  }
});

var TextPageView = React.createClass({
  _onEnter: function(msg, e) {
    this.props.contractApp.triggerUpdateTextPaginationPage(this.props.page.get("page_no"));
  },
  _onLeave: function(e) {
  },
  sanitizeTxt: function(text) {
    //replace the <  and > with &lt;%gt if they are not one of the tags below
    text = text.replace(/(<)(\/?)([span|div|p|br])([^>]*)(>)/g,"----lt----$2$3$4----gt----");
    text = text.replace(/</g,"&lt;");
    text = text.replace(/>/g,"&gt;");
    text = text.replace(/----lt----/g,"<");
    text = text.replace(/----gt----/g,">");
    return text;
  },
  highlightSearchQuery: function(text, highlightword) {
    var re = new RegExp(highlightword, "gi");
    return text.replace(re,"<span style='background-color:#a1aeec;'>" + highlightword + "</span>");
  },
  render: function() {
    var text = this.sanitizeTxt(this.props.page.get('text'));
    var page_no = this.props.page.get('page_no');
    if(this.props.page.get('page_no') == 30) {
      var t = this.props.page.get('text');
      t = t.replace(/(<)(\/?)([span|div|p|br])([^>]*)(>)/g,"----lt----$2$3$4----gt----")
      t = t.replace(/</g,"&lt;");
      t = t.replace(/>/g,"&gt;");
      t = t.replace(/----lt----/g,"<");
      t = t.replace(/----gt----/g,">");
    }
    if(this.props.contractApp.getSearchQuery()) {
      text = this.highlightSearchQuery(text, this.props.contractApp.getSearchQuery());
    }
    return (      
      <span className={page_no} >
        <span>{page_no}</span>
        <span dangerouslySetInnerHTML={{__html: text}} />
        <Waypoint
            onEnter={this._onEnter.bind(this, "enter" + page_no)}
            onLeave={this._onLeave}
            threshold={-0.4}/> 
      </span>
    );
  }
});
var TextViewer = React.createClass({
  loadAnnotations: function() {
    if(!this.annotator) {
      this.annotator = new AnnotatorjsView({
          el: ".text-annotator",
          api: this.props.contractApp.getLoadAnnotationsUrl(),
          availableTags: ["Country","Local-Company-Name"],
          // collection: annotationCollection,
          annotationCategories: ["General information","Country","Local company name"],
          enablePdfAnnotation: false,
          contractApp: this.props.contractApp
      });
    }
  },
  scrollToPage: function(page) {
    if($('.'+page).offset()) {
      var pageOffsetTop = $('.'+page).offset().top;
      var parentTop = $('.text-annotator ').scrollTop();
      var parentOffsetTop = $('.text-annotator').offset().top
      $('.text-annotator').animate({scrollTop: parentTop - parentOffsetTop + pageOffsetTop},100);
    }
  },
  componentDidMount: function() {
    var self = this;
    this.props.pagesCollection.on("reset", function() {
      self.message = "";
      if(self.props.pagesCollection.models.length === 0) {
        self.message = "There seems to be problem with this contract text. Please contact administrator with the url.";
      }
      self.forceUpdate();
      self.loadAnnotations();
      self.props.contractApp.triggerScrollToTextPage();
    });
    this.props.contractApp.on("scroll-to-text-page", function() {
      self.scrollToPage(self.props.contractApp.getCurrentPage());
    });
  },
  render: function() {
    var self = this;
    var pagesView = (this.message)?this.message:"Please wait while loading ...";
    if(this.props.pagesCollection.models.length > 0) {
      pagesView = this.props.pagesCollection.models.map(function(model, i) {
        return (
          <TextPageView
            key={i}
            contractApp={self.props.contractApp}
            page={model} />
        );
      });
    }
    return (
      <div className="text-annotator" style={this.props.style}>
        <div></div>
        <div className="text-viewer">
        {pagesView}
        </div>
      </div>
    );
  }
});