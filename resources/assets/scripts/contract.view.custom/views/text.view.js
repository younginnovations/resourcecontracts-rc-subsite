var NavigationView = React.createClass({
    render: function () {
    var textClass =null;
    var pdfClass =null;
    var annotationClass =null;
    var metadataClass =null;
    if (this.props.contractApp.getView() === "pdf") {
            pdfClass = "active";
    }
    if(this.props.contractApp.getView() === "text"){
            textClass = "active";
        }
    if (this.props.contractApp.getView() === "annotation") {
        annotationClass = "active";
    }
    if(this.props.contractApp.getView() === "metadata") {
        metadataClass = "active";
    }
        return (
            <div className="navigation">
                <a href="#/text" className={textClass}>{lang.text}</a>
                <a href="#/pdf" className={pdfClass}>{lang.pdf}</a>
                <a href="#/annotation" className={annotationClass}>Annotation</a>
                <a href="#/metadata" className={metadataClass}>Metadata</a>
            </div>
        );
    }
});
//<a href="#/both">Both</a>
var TextPaginationView = React.createClass({
    getInitialState: function () {
        return {
            visiblePage: 1,
            totalPages: 0
        }
    },
    changePage: function (page_no) {
        this.refs.userInputText.getDOMNode().value = page_no;
        this.props.contractApp.setCurrentPage(page_no);
        this.setState({visiblePage: page_no});
        this.props.contractApp.triggerScrollToTextPage();
        // this.props.contractApp.trigger("scroll-to-page");
        // this.props.currentPage.set({"page_no": page_no});
        // this.props.currentPage.trigger("scroll-to-page");
    },
    clickPrevious: function (e) {
        e.preventDefault();
        if (this.state.visiblePage > 1) {
            this.changePage(this.state.visiblePage - 1);
        }
    },
    clickNext: function (e) {
        e.preventDefault();
        if (this.state.visiblePage < this.state.totalPages) {
            this.changePage(this.state.visiblePage + 1);
        }
    },
    handleKeyDown: function (e) {
        if (e.keyCode == 13) {
            var inputPage = parseInt(this.refs.userInputText.getDOMNode().value);
            if (inputPage > 0 && inputPage <= this.state.totalPages) {
                this.changePage(inputPage);
            } else {
                this.changePage(this.state.visiblePage);
            }
        }
    },
    componentDidMount: function () {
        var titleHeadHeight = $('.title-wrap').height();
        $(window).scroll(function(){
            if ($(window).scrollTop() > titleHeadHeight) {
                $('.title-head-wrap').addClass('fixed');
            }
            else {
                $('.title-head-wrap').removeClass('fixed');
            }
        });
        var self = this;
        self.setState({totalPages: self.props.contractApp.getTotalPages()});
        this.props.contractApp.on("update-text-pagination-page", function (page_no) {
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
    render: function () {
        return (
            <div className="text-pagination pagination" style={this.props.style}>
                <a href="#" className="previous" onClick={this.clickPrevious}>{lang.previous}</a>
                <input type="text" className="goto" ref="userInputText" onKeyDown={this.handleKeyDown} />
                <a href="#" className="next" onClick={this.clickNext}>{lang.next}</a>
                {lang.of} {this.state.totalPages}
            </div>
        );
    }
});

var TextPageView = React.createClass({
    getInitialState: function () {
        return {
            originalHtml: "",
            searchresultsHtml: ""
        };
    },
    _onEnter: function (msg, e) {
        this.props.contractApp.triggerUpdateTextPaginationPage(this.props.page.get("page_no"));
    },
    _onLeave: function (e) {
    },
    sanitizeTxt: function (text) {
        //replace the <  and > with &lt;%gt if they are not one of the tags below
        text = text.replace(/(<)(\/?)(?=span|div|br)([^>]*)(>)/g, "----lt----$2$3----gt----");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");
        text = text.replace(/----lt----/g, "<");
        text = text.replace(/----gt----/g, ">");
        return text;
    },
    highlightSearchQuery: function (text, highlightword) {
        highlightword = decodeURI(highlightword);
        var re = new RegExp("(" + highlightword + ")", "gi");
        return text.replace(re, "<span class='search-highlight-word'>$1</span>");
    },
    componentDidMount: function () {
        var self = this;
        this.props.contractApp.on("searchresults:close", function () {
            self.setState({
                searchresultsHtml: ""
            });
        });
        this.props.contractApp.on("searchresults:ready", function () {
            if (self.props.contractApp.getSearchQuery()) {
                var originalHtml = self.sanitizeTxt(self.props.page.get('text'));
                // var originalHtml = (self.state.originalHtml !== "")?self.state.originalHtml:React.findDOMNode(self.refs.text_content).innerHTML;;
                var searchresultsHtml = self.highlightSearchQuery(originalHtml, self.props.contractApp.getSearchQuery());
                if (!self.state.originalHtml) {
                    self.setState({
                        originalHtml: originalHtml,
                        searchresultsHtml: searchresultsHtml
                    });
                } else {
                    self.setState({
                        searchresultsHtml: searchresultsHtml
                    });
                }
            }
        });
    },
    render: function () {
        var text = "";
        if (!this.state.originalHtml) {
            text = this.sanitizeTxt(this.props.page.get('text'));
        } else {
            if (this.state.searchresultsHtml) {
                text = this.state.searchresultsHtml;
            } else {
                text = this.state.originalHtml;
            }
        }
        var page_no = this.props.page.get('page_no');
        return (
            <span className={page_no} >
                <span>{page_no}</span>
                <span ref="text_content" dangerouslySetInnerHTML={{__html: text}} />
                <Waypoint
                    onEnter={this._onEnter.bind(this, "enter" + page_no)}
                    onLeave={this._onLeave}
                    threshold={-0.4}/>
            </span>
        );
    }
});
var TextViewer = React.createClass({
    getInitialState: function () {
        return {}
    },
    handleClickWarning: function (e) {
        e.preventDefault();
        $(e.target).parent().hide(500);
    },
    loadAnnotations: function () {
        if (!this.annotator) {
            this.annotator = new AnnotatorjsView({
                el: ".text-annotator",
                api: this.props.contractApp.getLoadAnnotationsUrl(),
                availableTags: ["Country", "Local-Company-Name"],
                // collection: annotationCollection,
                annotationCategories: ["General information", "Country", "Local company name"],
                enablePdfAnnotation: false,
                contractApp: this.props.contractApp
            });
        }
    },
    scrollToPage: function (page) {
        if ($('.' + page).offset()) {
            var pageOffsetTop = $('.' + page).offset().top;
            var parentTop = $('.text-annotator ').scrollTop();
            var parentOffsetTop = $('.text-annotator').offset().top
            $('.text-annotator').animate({scrollTop: parentTop - parentOffsetTop + pageOffsetTop}, 100);
        }
    },
    componentDidMount: function () {
        var self = this;
        this.props.contractApp.on("searchresults:ready", function () {
            if (self.annotator) {
                setTimeout(self.annotator.reload(), 1000);
            }
        });
        this.props.contractApp.on("searchresults:close", function () {
            if (self.annotator) {
                setTimeout(self.annotator.reload(), 1000);
            }
        });
        this.props.pagesCollection.on("reset", function () {
            self.message = "";
            if (self.props.pagesCollection.models.length === 0) {
               self.message =  React.createElement('div', {class: "no-contract-error"}, lang.sorry_loading);
            }
            self.forceUpdate();
            self.loadAnnotations();
            self.props.contractApp.triggerScrollToTextPage();
        });
        this.props.contractApp.on("scroll-to-text-page", function () {
            self.scrollToPage(self.props.contractApp.getCurrentPage());
        });
    },
    render: function () {
        var self = this;
        var show_pdf_text = this.props.metadata.get('is_ocr_reviewed');

        var warningText = (this.message) ? "" : (<div className="text-viewer-warning">
            <span className="pull-right link close" onClick={this.handleClickWarning}>x</span>
            {            lang.text_created_automatically
            }
            <a target="_blank" href={app_url + "/faqs"}>Learn more</a>
        </div>);

        var pagesView = (this.message) ? this.message : lang.wait_while_loading;

        if (this.props.pagesCollection.models.length > 0) {
            pagesView = [];
            for (var i = 0; i < this.props.pagesCollection.models.length; i++) {
                var model = this.props.pagesCollection.models[i];
                pagesView.push(<TextPageView
                        key={i}
                        contractApp={self.props.contractApp}
                        page={model} />
                );
            }
        }

        if (typeof show_pdf_text === 'undefined') {
            warningText = '';
        }

        if (show_pdf_text == false) {
            warningText = (<div className="text-viewer-warning">{lang.processing_pdf_file}</div>);
            pagesView = "";
        }

        return (
            <div className="text-panel" id="textview" style={this.props.style}>
        {warningText}
                <div className="text-annotator">
                    <div></div>
                    <div className="text-viewer">
          {pagesView}
                    </div>
                </div>
            </div>
        );
    }

});