function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

var contractApp = new ContractApp({
    contract_id: contract.metadata.id,
    guid: contract.metadata.open_contracting_id,
    total_pages: contract.metadata.number_of_pages,
    esapi: esapi
});
debug("initializing contract ", contractTitle, contractApp.get("contract_id"));

var pagesCollection = new ViewerPageCollection();
pagesCollection.url = contractApp.getAllPageUrl();
pagesCollection.fetch({reset: true});
pagesCollection.on("reset", function () {
    debug("view.blade pageCollection reset, trigger change:page_no")
    contractApp.trigger("change:page_no");
});

var annotationsCollection = new AnnotationsCollection();
annotationsCollection.url = contractApp.getAllAnnotationsUrl();
annotationsCollection.fetch({reset: true});


var searchResultsCollection = new SearchResultsCollection();
searchResultsCollection.url = contractApp.getSearchUrl();

var pdfPage = new PdfPage({
    contractApp: contractApp
});


var DownloadUrl = React.createClass({

    getInitialState: function () {
        return {
            dropdown: false, socialdropdown: false,
            dropdownM: false,
            view: {showModal: false}
        };
    },
    handleShowModal: function (e) {
        e.preventDefault();
        this.setState({view: {showModal: true}})
    },
    handleHideModal: function (e) {
        e.preventDefault();
        this.setState({view: {showModal: false}})
    },
    toggleDropdown: function (e) {
        e.preventDefault();
        this.setState({dropdown: !this.state.dropdown})
    },
    socialDropdown: function (e) {
        e.preventDefault();
        this.setState({socialdropdown: !this.state.socialdropdown})
    },
    componentDidMount: function () {
        var self = this;
        $(document).click(function (event) {
            if (!$(event.target).closest('.social-share').length && !$(event.target).is('.social-share')) {
                if ($('.social-share').is(":visible")) {
                    self.setState({socialdropdown: false});
                }
            }

            if (!$(event.target).closest('.download-dropdown').length && !$(event.target).is('.download-dropdown')) {
                if ($('.download-dropdown').is(":visible")) {
                    self.setState({dropdown: false});
                }
            }

            self.setState({dropdown: false});
        });
    },
    render: function () {
        var show = {'display': 'block'};
        var hide = {'display': 'none'};
        var style = this.state.dropdown ? show : hide;
        var socialStyle = this.state.socialdropdown ? show : hide;
        var current_url = encodeURIComponent(window.location.href);
        if (!this.props.annotations_url && !this.props.text_url) {
            return (
                <div className="right-column-view">
                    <div className="download-dropdown">
                        <a href="#" onClick={this.toggleDropdown}><span>{lang.download}</span></a>
                        <ul className="dropdown-menu" style={style}>
                            <li><a href={this.props.pdf_url}>{lang.pdf}</a></li>
                        </ul>
                    </div>
                    <div className="social-share download-wrap">
                        <a href="#" onClick={this.socialDropdown}><span>share</span></a>
                        <ul className="dropdown-menu" style={socialStyle}>
                            <li className="facebook"><a href={ facebook_share + current_url} target="_blank">FB</a></li>
                            <li className="google-plus"><a href={ google_share + current_url} target="_blank">G+</a>
                            </li>
                            <li className="twitter"><a href={ twitter_share } target="_blank">T</a></li>
                            <li className="email"><a onClick={this.handleShowModal}>1Email</a>
                            </li>

                        </ul>
                    </div>
                    {this.state.view.showModal ? <Email handleHideModal={this.handleHideModal}/> : null}
                    <ClipSwitchButton/>
                </div>
            );
        }
        else if (!this.props.text_url) {
            return (
                <div className="right-column-view">
                    <div className="download-dropdown">
                        <a href="#" onClick={this.toggleDropdown}><span>{lang.download}</span></a>
                        <ul className="dropdown-menu" style={style}>
                            <li><a href={this.props.pdf_url}>{lang.pdf}</a></li>
                            <li><a href={this.props.annotations_url}>
                                <div dangerouslySetInnerHTML={{__html: lang.annotations_excel}}/>
                            </a></li>
                        </ul>
                    </div>
                    <div className="social-share dropdown-wrap">
                        <a href="#" onClick={this.socialDropdown}><span>share</span></a>
                        <ul className="dropdown-menu" style={socialStyle}>
                            <li className="facebook"><a href={ facebook_share + current_url} target="_blank">FB</a></li>
                            <li className="google-plus"><a href={ google_share + current_url} target="_blank">G+</a>
                            </li>
                            <li className="twitter"><a href={ twitter_share } target="_blank">T</a></li>
                            <li className="email"><a onClick={this.handleShowModal}>2Email</a>
                            </li>
                        </ul>
                    </div>
                    {this.state.view.showModal ? <Email handleHideModal={this.handleHideModal}/> : null}
                    <ClipSwitchButton/>
                </div>

            );
        }
        else if (!this.props.annotations_url) {
            return (
                <div className="right-column-view">
                    <div className="download-dropdown">
                        <a href="#" onClick={this.toggleDropdown}><span>{lang.download}</span></a>
                        <ul className="dropdown-menu" style={style}>
                            <li><a href={this.props.pdf_url}>{lang.pdf}</a></li>
                            <li><a href={this.props.text_url}>{lang.word_file}</a></li>
                        </ul>
                    </div>
                    <div className="social-share dropdown-wrap">
                        <a href="#" onClick={this.socialDropdown}><span>share</span></a>
                        <ul className="dropdown-menu" style={socialStyle}>
                            <li className="facebook"><a href={ facebook_share + current_url} target="_blank">FB</a></li>
                            <li className="google-plus"><a href={ google_share + current_url} target="_blank">G+</a>
                            </li>
                            <li className="twitter"><a href={ twitter_share } target="_blank">T</a></li>
                            <li className="email"><a onClick={this.handleShowModal}>3Email</a>
                            </li>
                        </ul>
                    </div>
                    {this.state.view.showModal ? <Email handleHideModal={this.handleHideModal}/> : null}

                    <ClipSwitchButton/>
                </div>
            );
        }
        else {
            return (
                <div className="right-column-view">
                    <div className="download-dropdown">
                        <a onClick={this.toggleDropdown}><span>{lang.download}</span></a>
                        <ul className="dropdown-menu" style={style}>
                            <li><a href={this.props.pdf_url}>{lang.pdf}</a></li>
                            <li><a href={this.props.text_url}>{lang.word_file}</a></li>
                            <li><a href={this.props.annotations_url}>
                                <div dangerouslySetInnerHTML={{__html: lang.annotations_excel}}/>
                            </a></li>
                        </ul>
                    </div>
                    <div className="social-share dropdown-wrap">
                        <a href="#" onClick={this.socialDropdown}><span>share</span></a>
                        <ul className="dropdown-menu" style={socialStyle}>
                            <li className="facebook"><a href={ facebook_share + current_url} target="_blank">FB</a></li>
                            <li className="google-plus"><a href={ google_share + current_url} target="_blank">G+</a>
                            </li>
                            <li className="twitter"><a href={ twitter_share } target="_blank">T</a></li>
                            <li className="email"><a onClick={this.handleShowModal}>Email</a>
                            </li>
                        </ul>
                    </div>
                    {this.state.view.showModal ?
                        <Email handleHideModal={this.handleHideModal}/> : null}

                    <ClipSwitchButton/>
                </div>
            );
        }
    }

});


var Email = React.createClass({
    getInitialState: function () {
        return {
            to: '',
            from: '',
            subject: '',
            body: '',
            url: '',
            errors: [],
            processing: false
        };
    },
    componentDidMount: function () {
        var pageTitle = document.title;
        var url = window.location.href;
        this.setState({url: url, subject: pageTitle});
        $(this.getDOMNode()).modal('show');
        $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var formData = {
            to: this.state.to,
            from: this.state.from,
            subject: this.state.subject,
            body: this.state.body,
            url: this.state.url
        };
        this.state.errors = [];
        $('div.alert').remove();
        this.postFormData(formData, e.target);
    },
    setError: function (key, err) {
        var errors = this.state.errors;
        errors.push({key: key, error: (<span className="required">{err}</span>)});
        this.setState({errors: errors});
    },
    getError: function (key) {
        var error = '';
        this.state.errors.map(function (v, k) {
            if (v.key == key) {
                error = v.error;
            }
        });

        return error;
    },
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    isValidEmails: function (emails) {
        emails = emails.split(',');
        var valid = 0;
        var self = this;
        emails.map(function (val) {
            if (!self.validateEmail(val.trim())) {
                valid = valid + 1;
            }
        });

        return valid == 0;
    },
    validate: function () {
        if (this.state.to == '' || !this.isValidEmails(this.state.to)) {
            this.setError('to', 'Please enter valid email address.');
        }

        if (this.state.from == '' || !this.validateEmail(this.state.from)) {
            this.setError('from', 'Please enter valid email address.');
        }

        if (this.state.subject == '') {
            this.setError('subject', 'Subject is required');
        }

        if (this.state.body == '') {
            this.setError('body', 'Message is required');
        }

        return this.state.errors.length > 0;
    },
    postFormData: function (formData) {
        if (this.validate() || this.state.processing) {
            return false;
        }
        this.setState({errors: [], processing: true});
        var self = this;
        $.ajax({
            type: "POST",
            url: app_url + '/clip/email',
            data: formData
        }).error(function () {
            $('.email-result').append("<div class='alert alert-danger'>Something went wrong.</div>");
            self.setState({
                processing: false
            });
        }).success(function (res) {
            if (res.status) {
                $('.email-result').append("<div class='alert alert-success'>" + res.message + "</div>");
            } else {
                $('.email-result').append("<div class='alert alert-danger'>" + res.message + "</div>");
            }
            self.setState({
                to: '',
                body: '',
                processing: false
            });
        })
    },
    render: function () {
        var self = this;
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Share via email</h4>
                        </div>
                        <div className="modal-body">
                            <div className="email-result"></div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label for="emailto">To</label>
                                    <input type="text" onChange={function(e) {self.setState({to:e.target.value})}}
                                           value={this.state.to} className="form-control"/>
                                    {this.getError('to')}
                                </div>
                                <div className="form-group">
                                    <label for="emailfrom">From</label>
                                    <input type="text"
                                           onChange={function(e) {self.setState({from:e.target.value})}}
                                           value={this.state.from} className="form-control"/>
                                    {this.getError('from')}
                                </div>
                                <div className="form-group">
                                    <label for="subject">Subject</label>
                                    <input type="text" onChange={function(e) {self.setState({subject:e.target.value})}}
                                           value={this.state.subject} className="form-control"/>
                                    {this.getError('subject')}
                                </div>
                                <div className="form-group">
                                    <label for="emailbody">Message</label>
                                    <textarea type="text" onChange={function(e) {self.setState({body:e.target.value})}}
                                              value={this.state.body} className="form-control"/>
                                    {this.getError('body')}
                                </div>
                                <div className="form-group url-wrap">
                                    URL : <a target="_blank" href={this.state.url}> {this.state.url}</a>
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" className="btn"
                                           value={this.state.processing ? 'Sending...' : 'Send Email'}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    propTypes: function () {
        handleHideModal: React.PropTypes.func.isRequired
    }
});


var SelectLanguage = React.createClass({
    handleChange: function (e) {
        console.log("hello", e);
    },
    render: function () {
        var language = [];
        language = JSON.parse(languages);
        var availableLang = [];
        var imageStyle = {width: '16px', height: '16px', 'margin-right': '6px'};
        var ulStyle = {'min-width': '110px'};
        _.each(language, function (value, key) {
            var url = currentUrl + '?lang=' + key;
            var flagUrl = "https://raw.githubusercontent.com/younginnovations/country-flags/master/png250px/" + value['country_code'] + ".png";
            if (key != currentLanguage) {
                availableLang.push(
                    <li>
                        <a href={url}>
                            <img style={imageStyle} src={flagUrl}/>
                            {value['name']}
                        </a>
                    </li>
                );

            }
        });
    }
});

var ClipCount = React.createClass({

    render: function () {
        return (
            <div>

                <a href={clipUrl} id="annotation-count"></a>
                <a className="pull-left  " id="hide-annotation">Hide</a>
            </div>
        );
    }
});

var ClipSwitchButton = React.createClass({
    render: function () {
        if(isClipOn == true)
        {
            return (
             <div classNames="pull-left">
                <button className="clip-btn" id="on-annotation">On</button>
            </div>
        );
        }
        else{
            return(<div></div>);
        }

    }
});


/**
 * @jsx React.DOM
 */
var MainApp = React.createClass({
    getInitialState: function () {
        return {
            currentView: 'pdf'
        }
    },
    text: function (page_no, annotation_id) {
        debug("view.blade.php: setting text view");
        contractApp.setView("text");
        contractApp.setCurrentPage(contractApp.getCurrentPage());
        contractApp.resetSelectedAnnotation();
        if (page_no) {
            contractApp.setCurrentPage(page_no);
        }
        if (annotation_id) {
            contractApp.setSelectedAnnotation(annotation_id);
        }
        contractApp.trigger("update-text-pagination-page", contractApp.getCurrentPage());
        this.forceUpdate();
        contractApp.trigger('scroll-to-text-page');
    },
    pdf: function (page_no, annotation_id) {
        debug("view.blade.php: setting pdf view");
        contractApp.setView("pdf");
        if (page_no) {
            contractApp.setCurrentPage(page_no);
        }
        if (annotation_id) {
            contractApp.setSelectedAnnotation(annotation_id);
        } else {
            contractApp.resetSelectedAnnotation();
        }
        contractApp.trigger("change:page_no");
        contractApp.trigger("update-pdf-pagination-page", contractApp.getCurrentPage());
        this.forceUpdate();
    },
    search: function (queryText) {
        var query = typeof queryText != 'undefined' ? queryText : '';
        contractApp.setView("search");
        var show_pdf_text = contractApp.metadata.get('is_ocr_reviewed');
        contractApp.setSearchQuery(query);
        searchResultsCollection.fetch({
            searchTerm: query,
            reset: true
        });
        this.forceUpdate();
    },
    meta: function (action) {
        // this.forceUpdate();
    },
    metadata: function () {
        contractApp.setView("metadata");
        this.scrollTo('#metadata');
        this.forceUpdate();
    },
    annotation: function () {
        contractApp.setView("annotation");
        this.scrollTo('#annotations');
        this.forceUpdate();
    },
    scrollTo: function (id) {
        $('html,body').animate({
                scrollTop: $(id).offset().top - 150
            },
            'slow');
    },
    componentDidUpdate: function () {
        contractApp.setIsSearch(false);
        var self = this;
        contractApp.on("searchresults:close", function () {
            self.text();
        });
    },
    componentWillMount: function () {
        var router = Router({
            '/text': this.text,
            '/text/page/:page_no': this.text,
            '/text/page/:page_no/annotation/:annotation_id': this.text,
            '/pdf': this.pdf,
            '/metadata': this.metadata,
            '/annotation': this.annotation,
            '/pdf/page/:page_no': this.pdf,
            '/pdf/page/:page_no/annotation/:annotation_id': this.pdf,
            '/search/:query': this.search,
            '/meta/:action': this.meta
        });
        router.init();
    },
    getStyle: function (showFlag) {
        var style = {display: "none"};
        if (showFlag) style.display = "block";
        return style;
    },
    render: function () {
        return (
            <div className="main-app">
                <div className="title-head-wrap">
                    <div className="head-wrap clearfix">
                        <TextSearchForm
                            style={this.getStyle(contractApp.isViewVisible("TextSearchForm"))}
                            contractApp={contractApp}/>
                        <NavigationView
                            contractApp={contractApp}/>
                        <TextPaginationView
                            style={this.getStyle(contractApp.isViewVisible("TextPaginationView"))}
                            contractApp={contractApp}
                            pagesCollection={pagesCollection}/>
                        <PdfPaginationView
                            style={this.getStyle(contractApp.isViewVisible("PdfPaginationView"))}
                            contractApp={contractApp}/>
                        <PdfZoom
                            style={this.getStyle(contractApp.isViewVisible("PdfZoom"))}
                            contractApp={contractApp}/>

                        <DownloadUrl
                            pdf_url={pdf_download_url}
                            text_url={text_download_url}
                            annotations_url={annotations_download_url}
                        />


                        <MetadataToggleButton
                            style={this.getStyle(contractApp.getShowMeta())}
                            contractApp={contractApp}/>
                    </div>
                </div>
                <div className="document-wrap">
                    <AnnotationsViewer
                        style={this.getStyle(contractApp.isViewVisible("AnnotationsViewer"))}
                        contractApp={contractApp}
                        annotationsCollection={annotationsCollection}/>
                    <TextSearchResultsList
                        style={this.getStyle(contractApp.isViewVisible("TextSearchResultsList"))}
                        contractApp={contractApp}
                        searchResultsCollection={searchResultsCollection}/>
                    <div className="title-pdf-wrapper">
                        <TextViewer
                            style={this.getStyle(contractApp.isViewVisible("TextViewer"))}
                            contractApp={contractApp}
                            pagesCollection={pagesCollection}
                            metadata={contractApp.metadata}
                        />
                        <PdfViewer
                            pdfPage={pdfPage}
                            style={this.getStyle(contractApp.isViewVisible("PdfViewer"))}
                            contractApp={contractApp}
                            pagesCollection={pagesCollection}/>
                    </div>
                    <RightColumnView
                        metadata={contractApp.metadata}
                        contractApp={contractApp}/>
                </div>
            </div>
        );
    }
});

React.render(
    <MainApp />,
    document.getElementById('content')
);
