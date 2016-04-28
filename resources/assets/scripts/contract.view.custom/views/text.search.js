var TextSearchForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var searchQuery = React.findDOMNode(this.refs.searchInput).value.trim();
    if(!searchQuery) {
      return;
    }
    document.location.hash = '#/search/' + encodeURI(searchQuery);
  },
  componentDidMount:function(){
    React.findDOMNode(this.refs.searchInput).value =this.props.contractApp.getSearchQuery();
  },
  render: function() {
    return (
      <div className="text-search-container">
      <a className="back" href={back_url}>Back</a>
      <div className="text-search">
      <form onSubmit={this.handleSubmit}>
        <input type="text" className="" ref="searchInput" placeholder= {lang.search_in_this_document} />
      </form>
      </div>
      </div>
    );
  }
});

var TextSearchResultRow = React.createClass({

  handleClick: function() {

  if(this.props.resultRow.get('type')=="text")
    {
      location.hash = "#/text";
      this.props.contractApp.setIsSearch(true);
      this.props.contractApp.setCurrentPage(this.props.resultRow.get("page_no"));
      this.props.contractApp.triggerScrollToTextPage();
    }

  else {
      location.hash = "#/"+this.props.resultRow.get("annotation_type")+"/page/"+this.props.resultRow.get("page_no")+"/annotation/"+this.props.resultRow.get("annotation_id");
      switch (this.props.resultRow.get('annotation_type')) {
        case "pdf":
          self = this;
          this.props.contractApp.setView("pdf");
          this.props.contractApp.setIsSearch(true);
          this.props.contractApp.setSelectedAnnotation(self.props.resultRow.get('annotation_id'));
          this.props.contractApp.trigger("annotations:highlight", {id: self.props.resultRow.get('annotation_id')});
          this.props.contractApp.setCurrentPage(self.props.resultRow.get('page_no'));
          this.props.contractApp.triggerUpdatePdfPaginationPage(self.props.resultRow.get('page_no'));
          //this.props.contractApp.trigger("annotationHighlight", this.props.annotation.attributes);
          break;
        case "text":
          self = this;
          this.props.contractApp.setView("text");
          this.props.contractApp.setIsSearch(true);
          this.props.contractApp.trigger("annotations:highlight", {id: self.props.resultRow.get('annotation_id')});
          this.props.contractApp.setCurrentPage(self.props.resultRow.get('page_no'));

          this.props.contractApp.showTextAnnotationPopup(self.props.resultRow.get('annotation_id'));
          //setTimeout(this.props.contractApp.triggerScrollToTextPage());
          break;
      }
  }
    // this.props.currentPage.set({"page_no": this.props.resultRow.get("page_no")});
    // this.props.currentPage.trigger("scroll-to-page");
  },
  highlightSearchQuery: function(text, highlightword) {
    highlightword = decodeURI(highlightword);
    var re = new RegExp(highlightword, "gi");
    return text.replace(re,"<span class='search-highlight-word'>" + highlightword + "</span>");
  },
  render: function() {
    var text = this.highlightSearchQuery(this.props.resultRow.get("text"), this.props.contractApp.getSearchQuery());
    var type = "<a class='text' title='Text'>Text</a>";
    if(this.props.resultRow.get("type")=="annotation")
    {
       type = "<a class='annotations' title='Annotation'>Annotation</a>";
    }
    text = "<span>Pg " + this.props.resultRow.get("page_no") + "&nbsp;" + text+"</span>" +type;
    return(

      <div className="search-result-row link" onClick={this.handleClick}>

        <span dangerouslySetInnerHTML={{__html: text}} />
      </div>
    );
  }
});
var TextSearchResultsList = React.createClass({
  componentDidMount: function() {
    var self = this;
    this.props.searchResultsCollection.on("reset", function() {
      self.forceUpdate();
      self.props.contractApp.trigger("searchresults:ready");
    });
  },
  handleCloseSearchResults: function() {
    this.props.contractApp.trigger("searchresults:close");
    document.location.hash = '#/text';
    this.props.contractApp.setView("text");
  },
  render: function() {
    var self = this;
    var resultsView = lang.searching;
    if(this.props.searchResultsCollection.models.length > 0) {
      resultsView = this.props.searchResultsCollection.models.map(function(model, i) {
        return (
          <TextSearchResultRow
            key={i}
            contractApp={self.props.contractApp}
            resultRow={model} />
        );
      });
    }
    else if(this.props.searchResultsCollection.searchCompleted === true && this.props.searchResultsCollection.length == 0) {
      resultsView = lang.no_results_found;
    }
if(this.props.searchResultsCollection.models.length > 0) {
    return (
      <div style={this.props.style} className="search-results-list">
       <div className="search-result-title">Search result for {decodeURI(this.props.contractApp.getSearchQuery())}</div>
       <span className="pull-right link close" onClick={this.handleCloseSearchResults}>x</span>
        {resultsView}
      </div>
    );
    }else{
      return (
          <div style={this.props.style} className="search-results-list">
            <span className="pull-right link close" onClick={this.handleCloseSearchResults}>x</span>
          {resultsView}
          </div>
    );
    }
  }

});