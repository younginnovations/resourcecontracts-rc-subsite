var TextSearchForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var searchQuery = React.findDOMNode(this.refs.searchInput).value.trim();
        if (!searchQuery) {
            return;
        }
        document.location.hash = '#/search/' + encodeURI(searchQuery);
    },
    componentDidMount: function () {
        console.log('cmd',this.props.contractApp.getSearchQuery());
        React.findDOMNode(this.refs.searchInput).value = decodeURI(this.props.contractApp.getSearchQuery());
    },
    render: function () {
        return (
            <div className="text-search-container">
                <div className="text-search">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="" ref="searchInput" placeholder={lang.search_in_this_document}/>
                    </form>
                </div>
            </div>
        );
    }
});

var TextSearchResultRow = React.createClass({
    getInitialState: function () {
        return {
            maxWords: 30,
            text: '',
            shortText: '',
            showEllipse: '',
            showMoreFlag: ''
        };
    },
    componentDidMount: function () {
        if (this.props.resultRow.get('type') == "annotation") {
            var text = this.props.resultRow.get('text');
            var showEllipse = this.shallShowEllipse(text);
            var shortText = "";
            if (showEllipse) {
                shortText = this.truncate(text);
            }

            this.setState({
                text: text,
                showEllipse: showEllipse,
                shortText: shortText,
                showMoreFlag: true
            });
        }
    },
    componentWillReceiveProps: function (prev) {
        var result = prev.resultRow;
        var text = result.get('text');
        var showEllipse = this.shallShowEllipse(text);
        var shortText = "";
        if (showEllipse) {
            shortText = this.truncate(text);
        }

        this.setState({
            text: text,
            showEllipse: showEllipse,
            shortText: shortText,
            showMoreFlag: true
        });
    },
    truncate: function (text) {

        var words = (text + "").split(" ");
        words = words.splice(0, this.state.maxWords);

        return words.join(" ");
    },
    shallShowEllipse: function (text) {
        var words = (text + "").split(' ');
        if (words.length >= this.state.maxWords) {
            return true;
        }
        return false;
    },
    handleClickLessMore: function (e) {
        e.preventDefault();
        this.toggleShowMore();
    },
    toggleShowMore: function () {
        this.setState({showMoreFlag: !this.state.showMoreFlag})
    },
    getShowText: function (highlight) {
        var more = '';
        var texToShow = "";
        var textToReturn = '';

        if (this.state.showMoreFlag && this.state.shortText.length > 0) {
            texToShow = this.state.shortText;
            more = "...more";
        }
        if (!this.state.showMoreFlag && this.state.text.length > 0) {

            texToShow = this.state.text;

            more = " less";
        }
        if (texToShow.length == 0) {
            texToShow = this.state.text;
        }
        console.log(texToShow);

        texToShow = <HighLight  text={texToShow}/>;
        more = (<a onClick={this.handleClickLessMore}>{more}</a>);
        textToReturn = (<span>{texToShow} {more} </span>);
        return textToReturn;
    },
    handleClick: function () {

        if (this.props.resultRow.get('type') == "text") {
            location.hash = "#/text";
            this.props.contractApp.setIsSearch(true);
            this.props.contractApp.setCurrentPage(this.props.resultRow.get("page_no"));
            this.props.contractApp.triggerScrollToTextPage();
        }

        else {
            location.hash = "#/" + this.props.resultRow.get("annotation_type") + "/page/" + this.props.resultRow.get("page_no") + "/annotation/" + this.props.resultRow.get("annotation_id");
            switch (this.props.resultRow.get('annotation_type')) {
                case "pdf":
                    self = this;
                    this.props.contractApp.setView("pdf");
                    this.props.contractApp.setIsSearch(true);
                    this.props.contractApp.setSelectedAnnotation(self.props.resultRow.get('annotation_id'));
                    this.props.contractApp.trigger("annotations:highlight", {id: self.props.resultRow.get('annotation_id')});
                    this.props.contractApp.setCurrentPage(self.props.resultRow.get('page_no'));
                    this.props.contractApp.triggerUpdatePdfPaginationPage(self.props.resultRow.get('page_no'));
                    break;
                case "text":
                    self = this;
                    this.props.contractApp.setView("text");
                    this.props.contractApp.setIsSearch(true);
                    this.props.contractApp.trigger("annotations:highlight", {id: self.props.resultRow.get('annotation_id')});
                    this.props.contractApp.setCurrentPage(self.props.resultRow.get('page_no'));
                    this.props.contractApp.showTextAnnotationPopup(self.props.resultRow.get('annotation_id'));
                    break;
            }
        }
    },
    highlightSearchQuery: function (text, highlightword) {
        highlightword = decodeURI(highlightword);
        var re = new RegExp(highlightword, "gi");
        return text.replace(re, "<span class='search-highlight-word'>" + highlightword + "</span>");
    },
    render: function () {
        var text = this.highlightSearchQuery(this.props.resultRow.get("text"), this.props.contractApp.getSearchQuery());
        var type = "<a class='text' title='Text'>Text</a>";
        text = "<span>Pg " + this.props.resultRow.get("page_no") + "&nbsp;" + text + "</span>" + type;
        if (this.props.resultRow.get("type") == "annotation") {
            type = "<a class='annotations' title='Annotation'>" + lang.annotation + "</a>";
            text = this.getShowText(this.props.contractApp.getSearchQuery());
        }

        if (this.props.resultRow.get('type') == "annotation") {
            return (
                <div className="search-result-row link" onClick={this.handleClick}>
                    {text} <span dangerouslySetInnerHTML={{__html: type}}/>
                </div>
            );
        }
        else {
            return (
                <div className="search-result-row link" onClick={this.handleClick}>
                    <span dangerouslySetInnerHTML={{__html: text}}/>
                </div>
            );
        }

    }
});
var TextSearchResultsList = React.createClass({
    componentDidMount: function () {
        var self = this;
        this.props.searchResultsCollection.on("reset", function () {
            self.forceUpdate();
            self.props.contractApp.trigger("searchresults:ready");
            if (self.props.searchResultsCollection.models.length > 0) {
                self.props.contractApp.trigger("update-text-pagination-page", self.props.searchResultsCollection.models[0].get('page_no'));
                self.props.contractApp.triggerScrollToTextPage();
            }
        });
    },
    handleCloseSearchResults: function () {
        this.props.contractApp.trigger("searchresults:close");
        document.location.hash = '#/text';
        this.props.contractApp.setView("text");
    },
    render: function () {
        var self = this;
        var resultsView = lang.searching;
        if (this.props.searchResultsCollection.models.length > 0) {
            resultsView = this.props.searchResultsCollection.models.map(function (model, i) {
                return (
                    <TextSearchResultRow
                        key={i}
                        contractApp={self.props.contractApp}
                        resultRow={model}/>
                );
            });
        }
        else if (this.props.searchResultsCollection.searchCompleted === true && this.props.searchResultsCollection.length == 0) {
            resultsView = lang.no_results_found;
        }
        if (this.props.searchResultsCollection.models.length > 0) {
            return (
                <div style={this.props.style} className="search-results-list">
                    <div
                        className="search-result-title"> {lang.search_result} {decodeURI(this.props.contractApp.getSearchQuery())}</div>
                    <span className="pull-right link close" onClick={this.handleCloseSearchResults}>x</span>
                    {resultsView}
                </div>
            );
        } else {
            return (
                <div style={this.props.style} className="search-results-list">
                    <span className="pull-right link close" onClick={this.handleCloseSearchResults}>x</span>
                    {resultsView}
                </div>
            );
        }
    }

});


var HighLight = React.createClass({
    render: function () {
        return (
            <span
                dangerouslySetInnerHTML={{
          __html : this.props.text
            }}/>
        );
    }
});