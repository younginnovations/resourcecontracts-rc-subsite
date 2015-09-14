var TextSearchForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var searchQuery = React.findDOMNode(this.refs.searchInput).value.trim();
    if(!searchQuery) {
      return;
    }
    document.location.hash = '#/search/' + searchQuery;
  },
  render: function() {
    return (
      <div className="text-search">
      <form onSubmit={this.handleSubmit}>
        <input type="text" className="" ref="searchInput" placeholder="Search in this document" />
      </form>
      </div>
    );
  }
});
var TextSearchResultRow = React.createClass({
  handleClick: function() {
    this.props.contractApp.setCurrentPage(this.props.resultRow.get("page_no"));
    this.props.contractApp.triggerScrollToTextPage();
    // this.props.currentPage.set({"page_no": this.props.resultRow.get("page_no")});
    // this.props.currentPage.trigger("scroll-to-page");
  },
  render: function() {
    return(
      <div className="search-result-row" onClick={this.handleClick}>
        {this.props.resultRow.get("text")} [Pg {this.props.resultRow.get("page_no")}]
      </div>
    );
  }
});
var TextSearchResultsList = React.createClass({
  componentDidMount: function() {
    var self = this;
    this.props.searchResultsCollection.on("reset", function() {
      self.forceUpdate();
    });
  },
  render: function() {
    var self = this;
    var resultsView = "searching ...";
    if(this.props.searchResultsCollection.models.length > 0) {
      resultsView = this.props.searchResultsCollection.models.map(function(model) {
        return (
          <TextSearchResultRow contractApp={self.props.contractApp} resultRow={model} />
        );
      });
    } 
    else if(this.props.searchResultsCollection.searchCompleted === true) {
      resultsView = "No results found";
    }
    return (
      <div style={this.props.style} className="search-results-list">
        {resultsView}
      </div>
    );
  }
});