
var POSITIONS = {
  above: 'above',
  inside: 'inside',
  below: 'below',
};

/**
 * Calls a function when you scroll to the element.
 */
var Waypoint = React.createClass({displayName: "Waypoint",
  propTypes: {
    onEnter: React.PropTypes.func,
    onLeave: React.PropTypes.func,
    // threshold is percentage of the height of the visible part of the
    // scrollable ancestor (e.g. 0.1)
    threshold: React.PropTypes.number,
  },

  /**
   * @return {Object}
   */
  getDefaultProps: function() {
    return {
      threshold: 0,
      onEnter: function() {},
      onLeave: function() {},
    };
  },

  componentDidMount: function() {
    this.scrollableAncestor = this._findScrollableAncestor();
    this.scrollableAncestor.addEventListener('scroll', this._handleScroll);
    window.addEventListener('resize', this._handleScroll);
    this._handleScroll();
  },

  componentDidUpdate: function() {
    // The element may have moved.
    this._handleScroll();
  },

  componentWillUnmount: function() {
    if (this.scrollableAncestor) {
      // At the time of unmounting, the scrollable ancestor might no longer
      // exist. Guarding against this prevents the following error:
      //
      //   Cannot read property 'removeEventListener' of undefined
      this.scrollableAncestor.removeEventListener('scroll', this._handleScroll);
    }
    window.removeEventListener('resize', this._handleScroll);
  },

  /**
   * Traverses up the DOM to find an ancestor container which has an overflow
   * style that allows for scrolling.
   *
   * @return {Object} the closest ancestor element with an overflow style that
   *   allows for scrolling. If none is found, the `window` object is returned
   *   as a fallback.
   */
  _findScrollableAncestor: function() {
    var node = React.findDOMNode(this);

    while (node.parentNode) {
      node = node.parentNode;

      if (node === document) {
        // This particular node does not have a computed style.
        continue;
      }

      var style = window.getComputedStyle(node);
      var overflowY = style.getPropertyValue('overflow-y') ||
        style.getPropertyValue('overflow');

      if (overflowY === 'auto' || overflowY === 'scroll') {
        return node;
      }
    }

    // A scrollable ancestor element was not found, which means that we need to
    // do stuff on window.
    return window;
  },

  /**
   * @param {Object} event the native scroll event coming from the scrollable
   *   ancestor, or resize event coming from the window. Will be undefined if
   *   called by a React lifecyle method
   */
  _handleScroll: function(event) {
    var currentPosition = this._currentPosition();

    if (this._previousPosition === currentPosition) {
      // No change since last trigger
      return;
    }

    if (currentPosition === POSITIONS.inside) {
      this.props.onEnter.call(this, event);
    } else if (this._previousPosition === POSITIONS.inside) {
      this.props.onLeave.call(this, {event: event, position: currentPosition});
      // this.props.onLeave.call(this, event);
    }

    var isRapidScrollDown = this._previousPosition === POSITIONS.below &&
                              currentPosition === POSITIONS.above;
    var isRapidScrollUp =   this._previousPosition === POSITIONS.above &&
                              currentPosition === POSITIONS.below;
    if (isRapidScrollDown || isRapidScrollUp) {
      // If the scroll event isn't fired often enough to occur while the
      // waypoint was visible, we trigger both callbacks anyway.
      this.props.onEnter.call(this, event);
      this.props.onLeave.call(this, {event: event, position: currentPosition});
    }

    this._previousPosition = currentPosition;
  },

  /**
   * @param {Object} node
   * @return {Number}
   */
  _distanceToTopOfScrollableAncestor: function(node) {
    if (this.scrollableAncestor !== window && !node.offsetParent) {
      // throw new Error(
      //   'The scrollable ancestor of Waypoint needs to have positioning to ' +
      //   'properly determine position of Waypoint (e.g. `position: relative;`)'
      // );
    }

    if (node.offsetParent === this.scrollableAncestor || !node.offsetParent) {
      return node.offsetTop;
    } else {
      return node.offsetTop +
        this._distanceToTopOfScrollableAncestor(node.offsetParent);
    }
  },

  /**
   * @return {boolean} true if scrolled down almost to the end of the scrollable
   *   ancestor element.
   */
  _currentPosition: function() {
    var waypointTop =
      this._distanceToTopOfScrollableAncestor(React.findDOMNode(this));
    var contextHeight;
    var contextScrollTop;

    if (this.scrollableAncestor === window) {
      contextHeight = window.innerHeight;
      contextScrollTop = window.pageYOffset;
    } else {
      contextHeight = this.scrollableAncestor.offsetHeight;
      contextScrollTop = this.scrollableAncestor.scrollTop;
    }

    var thresholdPx = contextHeight * this.props.threshold;

    var isBelowTop = contextScrollTop <= waypointTop + thresholdPx;
    if (!isBelowTop) {
      return POSITIONS.above;
    }

    var contextBottom = contextScrollTop + contextHeight;
    var isAboveBottom = contextBottom >= waypointTop - thresholdPx;
    if (!isAboveBottom) {
      return POSITIONS.below;
    }

    return POSITIONS.inside;
  },

  /**
   * @return {Object}
   */
  render: function() {
    // We need an element that we can locate in the DOM to determine where it is
    // rendered relative to the top of its context.
    return React.createElement("span", {style: {fontSize: 0}});
  }
});
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
    return {
      message: ""
    };
  },
  loadFile: function() {
    var self = this;
    var content = this.props.pdfPage.get("content");

    if(content === "-1" || !content) {
      this.setState({
        page: "",
        content: "",
        message: React.createElement("div", {className: "no-contract-error"},  lang.sorry_loading, "  ", React.createElement("a", {href: "mailto: +{email} "}, email), " ", lang.to_let_us_know) //'
      });
    } else {
      if(content !== "-"){
        debug("react.pdf.js loadFile: getDocument content called");
        this.setState({
          message: "",
          content: content
        });
        PDFJS.getDocument(content).then(this._onDocumentComplete);
      } else {
        this.setState({
          page: "",
          message: "",
          content: ""
        });
      }
    }
  },
  componentDidMount: function() {
    var self = this;
    this.props.pdfPage.on("change:content", function() {
      debug("react.pdf.js pdfPage change:content called");
      self.loadFile();
    });
    this.props.contractApp.on("change:pdfscale", function() {
      debug("react.pdf.js pdfPage change:pdfscale called");
      self.forceUpdate();
      // self.loadFile();
    });
  },
  render: function() {
    var self = this;
    if (!!this.state.page) {
      setTimeout(function() {
        if(self.isMounted()) {
          var canvas = self.refs.pdfCanvas.getDOMNode();
          var context = canvas.getContext('2d');
          var scale = self.props.scale;
          var viewport = self.state.page.getViewport(1);
          if(viewport.width > 600 && scale === 1) {
            scale = 595.0/viewport.width;
          } else if(viewport.width > 600) {
            scale = scale * 595.0/viewport.width;
          }
          viewport = self.state.page.getViewport(scale);

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          var pageRendering = self.state.page.render(renderContext);
          var completeCallback = pageRendering._internalRenderTask.callback;
          pageRendering._internalRenderTask.callback = function (error) {
            //Step 2: what you want to do before calling the complete method
            debug("react.pdf pageRendering callback", error);
            completeCallback.call(this, error);
            //Step 3: do some more stuff
            if(!!self.props.onPageRendered && typeof self.props.onPageRendered === 'function'){
              if(!!self.state.content) {
                self.props.onPageRendered();  
              }
            }
          };
        }
      });
      return (React.createElement("canvas", {ref: "pdfCanvas"}));
    }
    if(this.state.message) {
      debug("react.pdf  showing generic message", this.state.message)
      return (React.createElement("div", null, this.state.message));
    } else {
      var page_no = this.props.contractApp.getCurrentPage();
      debug("react.pdf showing page loader", page_no);
      return (this.props.loading || React.createElement("div", null, lang.loading_page + page_no));
    }
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
var PdfPaginationView = React.createClass({displayName: "PdfPaginationView",
  getInitialState: function() {
    return {
      visiblePage: 1,
      totalPages: 0
    }
  },
  changePage: function(page_no) {
    this.refs.userInput.getDOMNode().value = page_no;
    this.setState({visiblePage: page_no});
    this.props.contractApp.setCurrentPage(page_no);
    $('.pdf-viewer').animate({scrollTop: 0}, 200);
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
      var inputPage = parseInt(this.refs.userInput.getDOMNode().value);
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
    this.props.contractApp.on("update-pdf-pagination-page", function(page_no) {
      self.refs.userInput.getDOMNode().value = page_no;
      self.setState({visiblePage: page_no});
    });    
    this.refs.userInput.getDOMNode().value = this.state.visiblePage;
  },
  render: function() {
    return (
      React.createElement("div", {className: "pdf-pagination pagination", style: this.props.style}, 
        React.createElement("a", {href: "#", className: "previous", onClick: this.clickPrevious}, lang.previous), 
        React.createElement("input", {type: "text", className: "goto", ref: "userInput", onKeyDown: this.handleKeyDown}), 
        React.createElement("a", {href: "#", className: "next", onClick: this.clickNext}, lang.next), " ", lang.of, " ", this.state.totalPages
      )
    );
  }
});

var PdfZoom = React.createClass({displayName: "PdfZoom",
  getInitialState: function() {
      return {
          scale: '1'
      }
  },
  handleClick: function(e) {
    var scale = event.target.innerHTML
    this.setState({scale: scale.replace(".","")});
    this.props.contractApp.setPdfScale(e.target.innerHTML);
  },
  render: function() {
    var selectedClass = "scale-" + this.state.scale;
    $('.pdf-zoom-options span').removeClass('scale-selected');
    $('.pdf-zoom-options .' + selectedClass).addClass('scale-selected');
    return (
      React.createElement("div", {className: "pdf-zoom-options", style: this.props.style}, " Zoom",  
        React.createElement("div", null, 
          React.createElement("span", {onClick: this.handleClick, className: "scale-1 scale-selected"}, "1"), 
          React.createElement("span", {onClick: this.handleClick, className: "scale-125"}, "1.25"), 
          React.createElement("span", {onClick: this.handleClick, className: "scale-15"}, "1.5")
        )
      )
    );
  }
});

var PdfViewer = React.createClass({displayName: "PdfViewer",
  getInitialState: function() {
    return {
      loadAnnotations: false
    };  
  },  
  componentDidMount: function() {
    this.loadAnnotationsFlag = false;
    var self = this;
    this.props.pagesCollection.on("reset", function() {
      debug("pdf.view.js pagesCollection reset called: triggering change:page_no");
      self.props.contractApp.trigger("change:page_no");
    });
    this.props.contractApp.on("change:pdfscale", function() {
      self.loadAnnotationsFlag = true;
      self.forceUpdate();
    });
    this.props.pdfPage.on("change:content", function() {
      self.loadAnnotationsFlag = true;
      // self.setState({loadAnnotations: true});
    });
  },
  render: function() {
      var page_no = this.props.contractApp.getCurrentPage();
      var pdfUrl = this.props.contractApp.getPdfUrl();
      return (
        React.createElement("div", {className: "pdf-viewer pdf-annotator", style: this.props.style}, 
        React.createElement(Pdf, {
          contractApp: this.props.contractApp, 
          pdfPage: this.props.pdfPage, 
          page: 1, 
          content: this.props.pdfPage.get("content"), 
          scale: parseFloat(this.props.contractApp.getPdfScale())||1, 
          onPageRendered: this._onPageRendered, 
          renderReady: this.state.renderReady})
        )
      );
  },
  loadAnnotations: function() {
    if(!this.annotator) {
      this.annotator = new PdfAnnotatorjsView({
        el: ".pdf-annotator",
        api: this.props.contractApp.getLoadAnnotationsUrl(),
        // api: "http://localhost:8009",
        availableTags: ["Country","Local-Company-Name"],
        // collection: annotationCollection,
        annotationCategories: ["General information","Country","Local company name"],
        enablePdfAnnotation: true,
        contractApp: this.props.contractApp
      });
    }
  },  
  _onPageRendered: function() {
    if(this.props.contractApp.getView() === "pdf" && this.loadAnnotationsFlag) {
      if(this.annotator) {
        this.annotator.pageUpdated();
        this.loadAnnotationsFlag = false;
        // this.setState({loadAnnotations: false});
      } 
      else if($(".pdf-viewer").is(":visible")) {
          this.loadAnnotations();
          this.loadAnnotationsFlag = false;
          // this.setState({loadAnnotations: false});
      }
    }
  },
});

var MetadataToggleButton = React.createClass({displayName: "MetadataToggleButton",
    getInitialState: function () {
        return {
            showMeta: true
        }
    },
    handleClick: function () {
        if (this.state.showMeta) {
            this.setState({showMeta: false});
            // this.props.contractApp.set({showMeta: true});
            $('.right-column-view').hide();
            $('.metadata-toggle-button').removeClass("metadata-shown");
            $('.pdf-viewer').css("width", "70%");
            $(".text-panel").css("width", "70%");
        }
        else {
            // this.props.contractApp.set({showMeta: false});
            // location.hash="/meta/hide";
            this.setState({showMeta: true});
            $('.metadata-toggle-button').addClass("metadata-shown");
            $('.right-column-view').show();
            $('.pdf-viewer').css("width", "50%");
            $(".text-panel").css("width", "50%");
        }
    },
    render: function () {
        return (
            React.createElement("div", {className: "metadata-toggle-button pull-right metadata-shown"}, 
                React.createElement("span", {onClick: this.handleClick}, "Meta")
            )
        );
    }
});


var MetadataView = React.createClass({displayName: "MetadataView",
    getInitialState: function () {
        return {
            showMoreMetadata: false
        }
    },
    componentDidMount: function () {
        var self = this;
        this.props.metadata.on("sync", function () {
            self.forceUpdate();
        });
    },
    clickShowMoreMetadata: function (e) {
        e.preventDefault();
        this.setState({showMoreMetadata: !this.state.showMoreMetadata});
        if (!this.state.showMoreMetadata) {
            $(".metadata-view .show-more-meta").show(500);
        } else {
            $(".metadata-view .show-more-meta").hide(500);
        }
    },
    render: function () {
        var showLabel = lang.show_more;
        if (this.state.showMoreMetadata) {
            showLabel = lang.show_less;
        }
        if (this.props.metadata.get("country")) {
            var countryCode = this.props.metadata.get("country").code.toLowerCase();
            var countryLink = app_url + "/countries/" + countryCode;

            var sigYear = this.props.metadata.get("signature_year");
            var sigYearLink = app_url + "/contracts?year=" + sigYear;

            var ct = this.props.metadata.get("type_of_contract");
            var contractType = ct.map(function (contractType, i) {
                if (i != ct.length - 1) {
                    return React.createElement('a', {href: app_url + "/search?q=&contract_type%5B%5D=" + contractType, key: i}, contractType + ' | ');
                } else {
                    return React.createElement('a', {href: app_url + "/search?q=&contract_type%5B%5D=" + contractType, key: i}, contractType);
                }
            });

            var re = new RegExp(' ', 'g');
            var resourceLinkBase = app_url + "/resources/";
            var resourceLength = this.props.metadata.get("resource").length;
            var resources = this.props.metadata.get("resource").map(function (resource, i) {
                if (i != resourceLength - 1) {
                    return React.createElement('a', {href: app_url + "/resource/" + resource, key: i}, resource + ' | ');
                } else {
                    return React.createElement('a', {href: app_url + "/resource/" + resource, key: i}, resource);
                }
            });

            if(this.props.metadata.get("contract_note") != "") {
                    var note = React.createElement("div", {className: "metadata-info"},
                    React.createElement("span", null, "Note"),
                    React.createElement("p", null, this.props.metadata.get("contract_note"))
                );
            }
            return (
                React.createElement("div", null, 
                    note, 
                    React.createElement("div", {className: "metadata-view"}, 
                        React.createElement("div", null, 
                            lang.metadata, 
                            React.createElement("div", {className: "metadata-view-footer pull-right"}, 
                                React.createElement("a", {href: this.props.contractApp.getMetadataSummaryLink()}, lang.see_summary)
                            )
                        ), 

                        React.createElement("div", {className: "metadata-country"}, 
                            React.createElement("span", null, lang.country), 
                            React.createElement("span", null, 
                                React.createElement("a", {href: countryLink}, this.props.metadata.get("country").name)
                            )
                        ), 
                        React.createElement("div", {className: "metadata-signature-year"}, 
                            React.createElement("span", null, lang.signature_year), 
                            React.createElement("span", null, 
                                React.createElement("a", {href: sigYearLink}, this.props.metadata.get("signature_year") || "-")
                            )
                        ), 
                        React.createElement("div", {className: "metadata-resource"}, 
                            React.createElement("span", null, lang.resource), 
                            React.createElement("span", null, resources)
                        ), 
                        React.createElement("div", {className: "metadata-type-contract"}, 
                            React.createElement("span", null, lang.type_contract), 
                            React.createElement("span", null, 
                               contractType
                            )
                        ), 
                        React.createElement("div", {className: "metadata-ocid"}, 
                            React.createElement("span", null, lang.open_contracting_id), 
                            React.createElement("span", null, this.props.metadata.get("open_contracting_id"))
                        ), 
                        React.createElement("div", {className: "metadata-ocid"}, 
                            React.createElement("span", null, lang.disclosure_mode), 
                            React.createElement("span", null, this.props.metadata.get("disclosure_mode") || "-")
                        ), 

                        React.createElement(LandMatrixView, {
                            metadata: this.props.metadata})
                    )
                )
            );
        } else {
            return (
                React.createElement("div", {className: "metadata-view"}, 
                    React.createElement("div", null, lang.metadata), 
                    React.createElement("span", null, lang.loading), 
                    React.createElement("div", {className: "metadata-view-footer"}, 
                        React.createElement("a", {href: this.props.contractApp.getMetadataSummaryLink()}, lang.see_summary)
                    )
                )
            );
        }

    }
});


var LandMatrixView = React.createClass({displayName: "LandMatrixView",
    componentDidMount: function () {
        var self = this;
        this.props.metadata.on("sync", function () {
            self.forceUpdate();
        });
    },
    render: function () {
        var id = '-';
        if (this.props.metadata.get("deal_number")) {
            id = '#' + this.props.metadata.get("deal_number");
        }

        if (this.props.metadata.get("category")[0] === 'olc') {
            return (
                React.createElement("div", {className: "metadata-ocid"}, 
                    React.createElement("span", null, "Land Matrix ID: "), 
                    React.createElement("a", {target: "_blank", href: this.props.metadata.get('matrix_page')}, id)
                )
            );
        }
        else {
            return (React.createElement("div", null));
        }
    }
});

var RelatedDocumentsView = React.createClass({displayName: "RelatedDocumentsView",
    componentDidMount: function () {
        var self = this;
        this.props.metadata.on("sync", function () {
            self.forceUpdate();
        });
    },
    render: function () {
        function truncate(text) {
            var words = (text + "").split(" ");
            var ellipsis = ""
            if (words.length > 10) {
                ellipsis = " ...";
            }
            words = words.splice(0, 10);
            return words.join(" ") + ellipsis;
        }

        var parentContracts = "",
            supportingContracts = [],
            moreContracts = "";
        if (this.props.metadata.get("parent_document")) {
            parentContracts = this.props.metadata.get("parent_document").map(function (doc) {
                var docUrl = app_url + "/contract/" + doc.open_contracting_id;
                if (doc.status === "published") {
                    return (
                        React.createElement("span", null, 
                            React.createElement("a", {href: docUrl}, doc.contract_name)
                        )
                    );
                }
            });
            var MaxAllowed = 3;
            var maxDocs = (this.props.metadata.get("supporting_contracts").length < MaxAllowed) ? this.props.metadata.get("supporting_contracts").length : MaxAllowed;
            for (var i = 0; i < maxDocs; i++) {
                var doc = this.props.metadata.get("supporting_contracts")[i];
                if (doc.status === "published") {
                    var docUrl = app_url + "/contract/" + doc.id;
                    supportingContracts.push(React.createElement("span", {id: i}, 
                        React.createElement("a", {href: docUrl}, truncate(doc.contract_name))
                    ));
                }
            }
            if (this.props.metadata.get("supporting_contracts").length > MaxAllowed) {
                moreContracts = (React.createElement("span", null, 
                    React.createElement("a", {href: this.props.contractApp.getMetadataSummaryLink() + "#relateddocs"}, lang.all_related)
                ));
            }
            if (parentContracts.length || supportingContracts.length) {
                return (
                    React.createElement("div", {className: "relateddocument-view"}, 
                        React.createElement("div", null, lang.related_docs), 
                        parentContracts, 
                        supportingContracts, 
                        moreContracts
                    )
                );
            } else {
                return (React.createElement("div", null));
            }
        } else {
            return (
                React.createElement("div", {className: "relateddocument-view"}, 
                    React.createElement("div", null, lang.related_docs), 
                    lang.loading
                )
            );
        }

    }
});
var RelatedDocumentsMoreView = React.createClass({displayName: "RelatedDocumentsMoreView",
    componentDidMount: function () {
        var self = this;
        this.props.metadata.on("sync", function () {
            self.forceUpdate();
        });
    },
    render: function () {
        if (this.props.metadata.get("country")) {
            var countryCode = this.props.metadata.get("country").code.toLowerCase();
            var countryLink = app_url + "/countries/" + countryCode;
            var country = React.createElement('a', {href: countryLink}, this.props.metadata.get("country").name);
            var resourceLinkBase = app_url + "/resources/";
            var resources = this.props.metadata.get("resource").map(function (resource, i) {
                return React.createElement('a', {href: app_url + "/resource/" + resource, key: i}, resource);
            });
            return (
                React.createElement("div", {className: "relateddocument-more-view"}, 
                    React.createElement("div", null, "More"), 
                    React.createElement("div", null, 
                        React.createElement("div", null, "From ", country), 
                        React.createElement("div", null, "For ", resources)
                    )
                )
            );
        } else {
            return (
                React.createElement("div", {className: "relateddocument-more-view"}, 
                    React.createElement("div", null, "More"), 
                    React.createElement("span", null, "Loading...")
                )
            );
        }
    }
});
var OtherSourcesView = React.createClass({displayName: "OtherSourcesView",
    componentDidMount: function () {
        var self = this;
        this.props.metadata.on("sync", function () {
            self.forceUpdate();
        });
    },
    render: function () {
        if (this.props.metadata.get("company")) {
            var amla_url = this.props.metadata.get("amla_url");
            var amlaUrlLink = (React.createElement("span", null, 
                React.createElement("a", {href: amla_url}, this.props.metadata.get("country").name), 
                "Legislation"));

            if (amla_url) {
                return (
                    React.createElement("div", {className: "other-sources-view"}, 
                        React.createElement("div", null, lang.other_sources), 
                        React.createElement("div", null, 
                            React.createElement("div", null, amlaUrlLink)
                        )
                    )
                );
            } else {
                return (React.createElement("div", null));
            }
        } else {
            return (
                React.createElement("div", {className: "other-sources-view"}, 
                    React.createElement("div", null, lang.other_sources), 
                    React.createElement("span", null, lang.loading)
                )
            );
        }
    }
});
var RightColumnView = React.createClass({displayName: "RightColumnView",
    render: function () {
        return (
            React.createElement("div", {className: "right-column-view"}, 
                React.createElement(MetadataView, {
                    contractApp: this.props.contractApp, 
                    metadata: this.props.metadata}), 

                React.createElement(RelatedDocumentsView, {
                    metadata: this.props.metadata})
            )
        );
    }
});
var NavigationView = React.createClass({displayName: "NavigationView",
    render: function () {
        if (this.props.contractApp.getView() === "pdf") {
            pdfClass = "active";
            textClass = "";
        } else {
            textClass = "active";
            pdfClass = "";
        }
        return (
            React.createElement("div", {className: "navigation"}, 
                React.createElement("a", {href: "#/text", className: textClass}, lang.text), 
                React.createElement("a", {href: "#/pdf", className: pdfClass}, lang.pdf)
            )
        );
    }
});
//<a href="#/both">Both</a>
var TextPaginationView = React.createClass({displayName: "TextPaginationView",
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
            React.createElement("div", {className: "text-pagination pagination", style: this.props.style}, 
                React.createElement("a", {href: "#", className: "previous", onClick: this.clickPrevious}, lang.previous), 
                React.createElement("input", {type: "text", className: "goto", ref: "userInputText", onKeyDown: this.handleKeyDown}), 
                React.createElement("a", {href: "#", className: "next", onClick: this.clickNext}, lang.next), 
                lang.of, " ", this.state.totalPages
            )
        );
    }
});

var TextPageView = React.createClass({displayName: "TextPageView",
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
            React.createElement("span", {className: page_no}, 
                React.createElement("span", null, page_no), 
                React.createElement("span", {ref: "text_content", dangerouslySetInnerHTML: {__html: text}}), 
                React.createElement(Waypoint, {
                    onEnter: this._onEnter.bind(this, "enter" + page_no), 
                    onLeave: this._onLeave, 
                    threshold: -0.4})
            )
        );
    }
});
var TextViewer = React.createClass({displayName: "TextViewer",
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
        var show_pdf_text = this.props.metadata.get('show_pdf_text');

        var warningText = (this.message) ? "" : (React.createElement("div", {className: "text-viewer-warning"}, 
            React.createElement("span", {className: "pull-right link close", onClick: this.handleClickWarning}, "x"), 
                        lang.text_created_automatically, 
            
            React.createElement("a", {target: "_blank", href: app_url + "/faqs"}, "Learn more")
        ));

        var pagesView = (this.message) ? this.message : lang.wait_while_loading;

        if (this.props.pagesCollection.models.length > 0) {
            pagesView = [];
            for (var i = 0; i < this.props.pagesCollection.models.length; i++) {
                var model = this.props.pagesCollection.models[i];
                pagesView.push(React.createElement(TextPageView, {
                        key: i, 
                        contractApp: self.props.contractApp, 
                        page: model})
                );
            }
        }

        if (typeof show_pdf_text === 'undefined') {
            warningText = '';
        }

        if (show_pdf_text == 0) {
            warningText = (React.createElement("div", {className: "text-viewer-warning"}, lang.processing_pdf_file));
            pagesView = "";
        }

        return (
            React.createElement("div", {className: "text-panel", style: this.props.style}, 
        warningText, 
                React.createElement("div", {className: "text-annotator"}, 
                    React.createElement("div", null), 
                    React.createElement("div", {className: "text-viewer"}, 
          pagesView
                    )
                )
            )
        );
    }

});
var TextSearchForm = React.createClass({displayName: "TextSearchForm",
  handleSubmit: function(e) {
    e.preventDefault();
    var searchQuery = React.findDOMNode(this.refs.searchInput).value.trim();
    if(!searchQuery) {
      return;
    }
    document.location.hash = '#/search/' + encodeURI(searchQuery);
  },
  render: function() {
    return (
      React.createElement("div", {className: "text-search-container"}, 
      React.createElement("a", {className: "back", href: back_url}, "Back"), 
      React.createElement("div", {className: "text-search"}, 
      React.createElement("form", {onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", className: "", ref: "searchInput", placeholder: lang.search_in_this_document})
      )
      )
      )
    );
  }
});
var TextSearchResultRow = React.createClass({displayName: "TextSearchResultRow",
  handleClick: function() {
    this.props.contractApp.setCurrentPage(this.props.resultRow.get("page_no"));
    this.props.contractApp.triggerScrollToTextPage();
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
    text = "Pg " + this.props.resultRow.get("page_no") + "&nbsp;" + text;
    return(
      React.createElement("div", {className: "search-result-row link", onClick: this.handleClick}, 
        React.createElement("span", {dangerouslySetInnerHTML: {__html: text}})
      )
    );
  }
});
var TextSearchResultsList = React.createClass({displayName: "TextSearchResultsList",
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
          React.createElement(TextSearchResultRow, {
            key: i, 
            contractApp: self.props.contractApp, 
            resultRow: model})
        );
      });
    }
    else if(this.props.searchResultsCollection.searchCompleted === true || this.props.searchResultsCollection.length == 0) {
      resultsView = lang.no_results_found;
    }

    return (
      React.createElement("div", {style: this.props.style, className: "search-results-list"}, 
      React.createElement("span", {className: "pull-right link close", onClick: this.handleCloseSearchResults}, "x"), 
        resultsView
      )
    );
  }
});
/** @jsx React.Dom **/
var AnnotationHeader = React.createClass({displayName: "AnnotationHeader",
    componentDidMount: function () {
        var self = this;
        this.props.annotationsCollection.on("reset", function () {
            self.forceUpdate();
        });
    },
    render: function () {
        var count = this.props.annotationsCollection.length;
        if(count == 0){
           return ( React.createElement("div", {className: "annotation-title"}, count, " ", lang.annotations, " "))
        }
        return (
            React.createElement("div", {className: "annotation-title"}, count, " ", lang.annotations, 
            React.createElement("span", {className: "pull-right"}, 
                    React.createElement("a", {href: this.props.contractApp.getAnnotationsListAnchor()}, lang.see_all)
            )
            )
        );
    }
});

var AnnotationItem = React.createClass({displayName: "AnnotationItem",
    getInitialState: function () {
        return {
            maxWords: 10,
            showEllipse: false,
            showMoreFlag: false,
            annotationType: "",
            text: ""
        }
    },
    componentDidMount: function () {
        var self = this;

        function getText(annotation) {
            //return text + quote if both present, else either text or quote
            var text = (annotation.get('text') || "") + "";
            var quote = (annotation.get('quote') || "") + "";
            if (text && quote) {
                return text.trim() + " - " + quote.trim();
            }
            if (text && text.trim()) {
                return text.trim();
            }
            if (quote && quote.trim()) {
                return quote.trim();
            }
            return "";
        }

        function shallShowEllipse(text) {
            var words = (text + "").split(' ');
            if (words.length > self.state.maxWords) {
                return true;
            }
            return false;
        }

        function truncate(text) {
            var words = (text + "").split(" ");
            words = words.splice(0, self.state.maxWords);
            return words.join(" ");
        }

        var cluster = (this.props.annotation.get('cluster')) ? this.props.annotation.get('cluster') : "Other";
        var category = this.props.annotation.get('category');
        var categoryEn = category.split("//")[0];
        var categoryFr = category.split("//")[1];
        var id = this.props.annotation.get('id');
        var text = getText(this.props.annotation);
        var preamble = text.split("--")[1] || '';
        text = text.split("--")[0];
        var showEllipse = shallShowEllipse(text);
        var pageNo = this.props.annotation.get('page_no');
        var shortText = "";
        if (showEllipse) {
            shortText = truncate(text);
        }
        var annotationType = "text";
        if (this.props.annotation.get('shapes')) {
            annotationType = "pdf";
        }
        var highlight = (this.props.contractApp.getSelectedAnnotation() === id) ? true : false;
        var showMoreFlag = (this.props.contractApp.getSelectedAnnotation() === id) ? true : false;
        this.setState({
            id: id,
            text: text,
            preamble: preamble,
            cluster: cluster,
            shortText: shortText,
            categoryEn: categoryEn,
            categoryFr: categoryFr,
            pageNo: pageNo,
            annotationType: annotationType,
            showEllipse: showEllipse,
            highlight: highlight,
            showMoreFlag: showMoreFlag
        });
        this.props.contractApp.on("annotations:highlight", function (annotation) {
            if (annotation.id === self.state.id) {
                self.setState({
                    showMoreFlag: true,
                    highlight: true
                });
                location.hash = "#/pdf/page/" + self.state.pageNo + "/annotation/" + self.state.id;
            } else {
                self.setState({
                    showMoreFlag: false,
                    highlight: false
                });
            }
        });
        this.props.contractApp.on("change:selected_annotation_id-1", function () {
            if (self.props.contractApp.getSelectedAnnotation() === self.state.id) {
                self.setState({
                    showMoreFlag: true,
                    highlight: true
                });
                location.hash = "#/pdf/page/" + self.state.pageNo + "/annotation/" + self.state.id;
            } else {
                self.setState({
                    showMoreFlag: false,
                    highlight: false
                });
            }
        });
    },
    handleAnnotationClick: function (e) {
        var self = this;
        e.preventDefault();
        switch (this.state.annotationType) {
            case "pdf":
                this.props.contractApp.setView("pdf");
                location.hash = "#/pdf/page/" + self.state.pageNo + "/annotation/" + self.state.id;
                this.props.contractApp.setSelectedAnnotation(self.state.id);
                this.props.contractApp.trigger("annotations:highlight", {id: self.state.id});
                this.props.contractApp.setCurrentPage(self.state.pageNo);
                this.props.contractApp.triggerUpdatePdfPaginationPage(self.state.pageNo);
                // this.props.contractApp.trigger("annotationHighlight", this.props.annotation.attributes);
                break
            case "text":
                location.hash = "#/text/page/" + self.state.pageNo + "/annotation/" + self.state.id;
                this.props.contractApp.trigger("annotations:highlight", {id: self.state.id});
                this.props.contractApp.setView("text");
                this.props.contractApp.setCurrentPage(self.state.pageNo);
                setTimeout(this.props.contractApp.triggerScrollToTextPage());
                break;
        }
    },
    handleEllipsis: function (e) {
        e.preventDefault();
        var text = e.target.innerHTML;
        this.setState({showMoreFlag: !this.state.showMoreFlag});
    },
    render: function () {
        var currentAnnotationClass = (this.state.highlight) ? "annotation-item selected-annotation" : "annotation-item";
        var ellipsistext = "";
        var showText = this.state.text;
        if (this.state.showEllipse) {
            showText = this.state.text;
            ellipsistext = lang.less;
            if (!this.state.showMoreFlag) {
                ellipsistext = lang.more;
                showText = this.state.shortText;
            }
        }
        if (this.props.prevAnnotation === undefined || this.props.showClusterAnyway) {
            return (
                React.createElement("div", {className: currentAnnotationClass, id: this.state.id}, 
                    React.createElement("span", {className: "header annotation-cluster"}, this.state.cluster), 
                    React.createElement("span", {className: "link annotation-category-en"}, React.createElement("a", {href: "#", 
                                                                     onClick: this.handleAnnotationClick}, this.state.categoryEn)), 
                    React.createElement("span", {className: "link annotation-category-fr", 
                          onClick: this.handleAnnotationClick}, this.state.categoryFr), 
                    React.createElement("span", {className: "annotation-item-content"}, showText, 
                        React.createElement("nobr", null, React.createElement("a", {className: "annotation-item-ellipsis", href: "#", onClick: this.handleEllipsis, 
                                 dangerouslySetInnerHTML: {__html: ellipsistext}}))), 
                    React.createElement("span", {className: "annotation-item-preamble"}, this.state.preamble), 
                    React.createElement("span", {className: "link annotation-item-page", 
                          onClick: this.handleAnnotationClick}, "Page ", this.state.pageNo)
                )
            );
        } else if (this.props.annotation.attributes.category_key !== this.props.prevAnnotation.attributes.category_key) {
            return (
                React.createElement("div", {className: currentAnnotationClass, id: this.state.id}, 
                    React.createElement("span", {className: "link annotation-category-en"}, React.createElement("a", {href: "#", 
                                                                     onClick: this.handleAnnotationClick}, this.state.categoryEn)), 
                    React.createElement("span", {className: "link annotation-category-fr", 
                          onClick: this.handleAnnotationClick}, this.state.categoryFr), 
                    React.createElement("span", {className: "annotation-item-content"}, showText, 
                        React.createElement("nobr", null, React.createElement("a", {className: "annotation-item-ellipsis", href: "#", onClick: this.handleEllipsis, 
                                 dangerouslySetInnerHTML: {__html: ellipsistext}}))), 
                    React.createElement("span", {className: "annotation-item-preamble"}, this.state.preamble), 
                    React.createElement("span", {className: "link annotation-item-page", 
                          onClick: this.handleAnnotationClick}, "Page ", this.state.pageNo)
                )
            );
        } else if (this.props.annotation.attributes.text !== this.props.prevAnnotation.attributes.text) {
            return (
                React.createElement("div", {className: currentAnnotationClass, id: this.state.id}, 
                    React.createElement("span", {className: "annotation-item-content"}, showText, 
                        React.createElement("nobr", null, React.createElement("a", {className: "annotation-item-ellipsis", href: "#", onClick: this.handleEllipsis, 
                                 dangerouslySetInnerHTML: {__html: ellipsistext}}))), 
                    React.createElement("span", {className: "annotation-item-preamble"}, this.state.preamble), 
                    React.createElement("span", {className: "link annotation-item-page", 
                          onClick: this.handleAnnotationClick}, "Page ", this.state.pageNo)
                )
            );
        } else {
            return (
                React.createElement("span", {id: this.state.id, className: "link annotation-item-page", 
                      onClick: this.handleAnnotationClick}, ", ", this.state.pageNo)
            );
        }
        // return (
        //     <div className={currentAnnotationClass} id={this.state.id}>
        //         <span>{this.state.cluster}</span>
        //         <span className="link annotation-category-en"><a href="#" onClick={this.handleAnnotationClick}>{this.state.categoryEn}</a></span>
        //         <span className="link annotation-category-fr" onClick={this.handleAnnotationClick}>{this.state.categoryFr}</span>
        //         <span className="annotation-item-content" >{showText}<nobr><a className="annotation-item-ellipsis" href="#" onClick={this.handleEllipsis} dangerouslySetInnerHTML={{__html: ellipsistext}}></a></nobr></span>
        //         <span className="link annotation-item-page" onClick={this.handleAnnotationClick}>Page: {this.state.pageNo}</span>
        //     </div>
        // );
    }
});

var AnnotationsSort = React.createClass({displayName: "AnnotationsSort",
    getInitialState: function () {
        return {
            show: false,
            sortBy: "cluster"
        }
    },
    componentDidMount: function () {
        var self = this;
        this.props.annotationsCollection.on("reset", function () {
            if (self.props.annotationsCollection.models.length > 0) {
                self.setState({show: true});
            }
        });
        this.setState({sortBy: "cluster"});
    },
    onClickPage: function (e) {
        e.preventDefault();
        this.props.annotationsCollection.setSortByKey("page_no");
        this.props.contractApp.resetSelectedAnnotation();
        this.props.contractApp.trigger("annotations:render");
        this.setState({sortBy: "page_no"});
    },
    onClickTopic: function (e) {
        e.preventDefault();
        this.props.annotationsCollection.setSortByKey("category");
        this.props.contractApp.resetSelectedAnnotation();
        this.props.contractApp.trigger("annotations:render");
        this.setState({sortBy: "cluster"});
    },
    render: function () {
        var topicList = "";
        var pageClassName = "active", topicClassName = "";
        if (this.state.sortBy == "cluster") {
            pageClassName = "";
            topicClassName = "active";
            topicList = React.createElement(AnnotationTopicList, {contractApp: this.props.contractApp})
        }
        var activeClass = this.state.sortBy;
        if (this.state.show) {
            return (
                React.createElement("div", {className: "annotation-sort"}, 
                    React.createElement("span", {className: pageClassName, onClick: this.onClickPage}, lang.by_page), 
                    React.createElement("span", {className: topicClassName, onClick: this.onClickTopic}, lang.by_topic), 
                    topicList
                )
            );
        } else {
            return (React.createElement("div", null));
        }
    }
});

var AnnotationTopicList = React.createClass({displayName: "AnnotationTopicList",
    getInitialState: function () {
        return {
            show: false
        };
    },
    handleClick: function (e) {
        e.preventDefault();
        this.props.contractApp.trigger("annotations:scroll-to-cluster", e.target.innerHTML);
        $(".annotations-topic-list > span").removeClass("selected-topic");
        $(e.target).addClass("selected-topic");
    },
    render: function () {
        return (
            React.createElement("div", {className: "annotations-topic-list"}, 
                React.createElement("span", {onClick: this.handleClick}, lang.general), 
                React.createElement("span", {onClick: this.handleClick}, lang.environment), 
                React.createElement("span", {onClick: this.handleClick}, lang.fiscal), 
                React.createElement("span", {onClick: this.handleClick}, lang.operations), 
                React.createElement("span", {onClick: this.handleClick}, lang.social), 
                React.createElement("span", {onClick: this.handleClick}, lang.other)
            )
        );
    }
});
var AnnotationsList = React.createClass({displayName: "AnnotationsList",
    getInitialState: function () {
        return {
            message: lang.loading_annotations
        }
    },
    componentDidMount: function () {
        var self = this;
        this.props.annotationsCollection.on("reset", function () {
            if (self.props.annotationsCollection.models.length > 0) {
                self.setState({message: ""});
            } else {
                self.setState({message: lang.no_annotation_msg});
            }
            if (self.props.contractApp.getSelectedAnnotation()) {
                self.props.contractApp.trigger("annotations:scroll-to-selected-annotation");
            }
        });
        this.props.contractApp.on("annotations:render", function (sortBy) {
            self.forceUpdate();
        });
        this.props.contractApp.on("annotations:highlight", function (annotation) {
            setTimeout(self.scrollToAnnotation(annotation.id), 1000);
        });
        this.props.contractApp.on("annotations:scroll-to-selected-annotation", function () {
            self.scrollToAnnotation(self.props.contractApp.getSelectedAnnotation());
        });
        this.props.contractApp.on("annotations:scroll-to-top", function () {
            self.scrollToTop();
        });
        this.props.contractApp.on("annotations:scroll-to-cluster", function (cluster) {
            self.scrollToCluster(cluster);
        });
    },
    scrollToCluster: function (cluster) {
        if ($('#' + cluster).offset()) {
            var pageOffsetTop = $('#' + cluster).offset().top;
            var parentTop = $('.annotation-inner-viewer').scrollTop();
            var parentOffsetTop = $('.annotation-inner-viewer').offset().top
            $('.annotation-inner-viewer').animate({scrollTop: parentTop - parentOffsetTop + pageOffsetTop}, 200);
        }
    },
    scrollToAnnotation: function (annotation_id) {
        if (annotation_id) {
            var pageOffsetTop = $('#' + annotation_id).offset().top;
            var parentTop = $('.annotation-inner-viewer').scrollTop();
            var parentOffsetTop = $('.annotation-inner-viewer').offset().top
            $('.annotation-inner-viewer').animate({scrollTop: parentTop - parentOffsetTop + pageOffsetTop}, 200);
            this.props.contractApp.resetSelectedAnnotation();
        }
    },
    scrollToTop: function (e) {
        e.preventDefault();
        $('.annotation-inner-viewer').animate({scrollTop: 0}, 500);
    },
    getAnnotationItemsComponent: function (annotationsCollectionForList, showClusterAnyway) {
        var annotationsList = [];
        if (annotationsCollectionForList.models.length > 0) {
            for (var i = 0; i < annotationsCollectionForList.models.length; i++) {
                annotationsList.push((React.createElement(AnnotationItem, {
                        showClusterAnyway: showClusterAnyway, 
                        key: annotationsCollectionForList.models[i].get("id"), 
                        contractApp: this.props.contractApp, 
                        prevAnnotation: annotationsCollectionForList.models[i-1], 
                        annotation: annotationsCollectionForList.models[i]})
                ));
            }
        }
        return annotationsList;
    },
    sortByPage: function () {
        if (this.props.annotationsCollection.models.length > 0) {
            this.props.annotationsCollection.sort();
            return (
                React.createElement("div", {className: "annotations-list", id: "id-annotations-list"}, 
                    this.getAnnotationItemsComponent(this.props.annotationsCollection, true), 
                    React.createElement("div", {className: "annotations-list-footer"}, 
                        React.createElement("a", {href: this.props.contractApp.getAnnotationsListAnchor()}, lang.see_all_annotations)
                    )
                )
            );
        }
        return [];
    },
    sortByCluster: function () {
        var annotationsList = [];
        var self = this;
        this.props.annotationsCollection.sort();
        var clusters = ["General", "Environment", "Fiscal", "Operations", "Social", "Other"];
        _.map(clusters, function (cluster) {
            var filtered = self.props.annotationsCollection.filter(function (model) {
                return model.get("cluster") === cluster;
            });
            if (filtered.length) {
                var newCol = new AnnotationsCollection(filtered);
                annotationsList.push(React.createElement("div", {id: cluster, 
                                          key: cluster}, self.getAnnotationItemsComponent(newCol, false)));
            }
        });
        return (
            React.createElement("div", {className: "annotations-list", id: "id-annotations-list"}, 
                annotationsList
            )
        );
    },
    render: function () {
        var annotationsList = [];
        var self = this;
        if (this.props.annotationsCollection.models.length > 0) {
            if (this.props.annotationsCollection.sort_key === "category") {
                return this.sortByCluster();
            }
            return this.sortByPage();
        } else {
            return (
                React.createElement("div", {className: "annotations-list", id: "id-annotations-list"}, 
                    this.state.message
                )
            );
        }
    }
});

var AnnotationsViewer = React.createClass({displayName: "AnnotationsViewer",
    getInitialState: function () {
        return {
            scrollBtnStyle: 'display:none'
        }
    },
    handleGotoTop: function (e) {
        e.preventDefault();
        this.props.contractApp.trigger("annotations:scroll-to-top");
    },
    componentDidMount: function () {
        var offset = 150;
        var duration = 200;

        $("#annotations-box").scroll(function () {
            if ($(this).scrollTop() > offset) {
                $('.back-to-top').fadeIn(duration);
            } else {
                $('.back-to-top').fadeOut(duration);
            }
        });

        $('.back-to-top').click(function (event) {
            event.preventDefault();
            $('.annotation-inner-viewer').animate({scrollTop: 0}, duration);
            return false;
        })
    },
    render: function () {
        return (
            React.createElement("div", {className: "annotations-viewer", style: this.props.style}, 
                React.createElement("div", {className: "annotation-inner-viewer", id: "annotations-box"}, 
                    React.createElement(AnnotationHeader, {
                        contractApp: this.props.contractApp, 
                        annotationsCollection: this.props.annotationsCollection}), 
                    React.createElement(AnnotationsSort, {
                        contractApp: this.props.contractApp, 
                        annotationsCollection: this.props.annotationsCollection}), 
                    React.createElement(AnnotationsList, {
                        contractApp: this.props.contractApp, 
                        annotationsCollection: this.props.annotationsCollection})
                ), 
                React.createElement("a", {href: "#", className: "back-to-top btn btn-primary"}, React.createElement("i", {className: "fa fa-arrow-up"}))
            )
        );
    }
});