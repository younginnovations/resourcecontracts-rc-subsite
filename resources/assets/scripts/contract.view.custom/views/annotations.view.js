var AnnotationsViewer = React.createClass({
    getInitialState: function () {
        return {
            scrollBtnStyle: 'display:none'
        }
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
            <div id="annotations" className="annotations-viewer" style={this.props.style}>
                <div className="annotation-inner-viewer" id="annotations-box">
                    <AnnotationHeader
                        contractApp={this.props.contractApp}
                        annotationsCollection={this.props.annotationsCollection}/>
                    <AnnotationsSort
                        contractApp={this.props.contractApp}
                        annotationsCollection={this.props.annotationsCollection}/>
                    <AnnotationsList
                        contractApp={this.props.contractApp}
                        annotationsCollection={this.props.annotationsCollection}/>
                </div>
                <a href="#" className="back-to-top btn btn-primary"><i className="fa fa-arrow-up"></i></a>
            </div>
        );
    }
});

var AnnotationHeader = React.createClass({
    componentDidMount: function () {
        var self = this;
        this.props.annotationsCollection.on("reset", function () {
            self.forceUpdate();
        });
    },
    render: function () {
        var count = this.props.annotationsCollection.totalAnnotations();
        return (
            <div className="annotation-title">{count} {lang.annotation_count}</div>
        );
    }
});

var AnnotationsSort = React.createClass({
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
            topicList = <AnnotationTopicList contractApp={this.props.contractApp}/>
        }
        var activeClass = this.state.sortBy;
        if (this.state.show) {
            return (
                <div className="annotation-sort">
                    <span className={pageClassName} onClick={this.onClickPage}>{lang.by_page}</span>
                    <span className={topicClassName} onClick={this.onClickTopic}>{lang.by_topic}</span>
                    {topicList}
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
});

var AnnotationTopicList = React.createClass({
    getInitialState: function () {
        return {
            show: false
        };
    },
    handleClick: function (cluster, e) {
        e.preventDefault();
        var selected = cluster;
        if (selected == 'All') {
            $('.annotation-item').show();
        } else {
            $('.annotation-item').hide();
            $('.' + selected).show();
        }
        $(".annotations-topic-list > span").removeClass("selected-topic");
        $(e.target).addClass("selected-topic");
    },
    render: function () {
        return (
            <div className="annotations-topic-list">
                <span className="selected-topic" onClick={this.handleClick.bind(this,'All')}>{lang.all}</span>
                <span onClick={this.handleClick.bind(this,'General')}>{lang.general}</span>
                <span onClick={this.handleClick.bind(this,'Environment')}>{lang.environment}</span>
                <span onClick={this.handleClick.bind(this,'Fiscal')}>{lang.fiscal}</span>
                <span onClick={this.handleClick.bind(this,'Operations')}>{lang.operations}</span>
                <span onClick={this.handleClick.bind(this,'Social')}>{lang.social}</span>
                <span onClick={this.handleClick.bind(this,'Other')}>{lang.legal_rules}</span>
            </div>
        );
    }
});

var AnnotationsList = React.createClass({
    getInitialState: function () {
        return {
            message: lang.loading_annotations
        }
    },
    componentDidMount: function () {
        var self = this;
        this.props.annotationsCollection.on("reset", function () {
            if (self.props.annotationsCollection.totalAnnotations() > 0) {
                self.setState({message: ""});
            } else {
                self.setState({message: lang.no_annotation});
            }
            if (self.props.contractApp.getSelectedAnnotation()) {
                self.props.contractApp.trigger("annotations:scroll-to-selected-annotation");
            }
        });

        this.props.contractApp.on("annotations:render", function (sortBy) {
            self.forceUpdate();
        });
        this.props.contractApp.on("annotations:highlight", function (annotation) {
            var that = self;
            var annotation_model = self.props.annotationsCollection.get(annotation.id);
            setTimeout(function () {
                that.scrollToAnnotation(annotation_model.get('id'));
            }, 100);
        });
        this.props.contractApp.on("annotations:scroll-to-selected-annotation", function () {
            var annotation = self.props.annotationsCollection.get(self.props.contractApp.getSelectedAnnotation());
            if (annotation) {
                self.scrollToAnnotation(annotation.get('id'));
            }
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
            var parentOffsetTop = $('.annotation-inner-viewer').offset().top;
            $('.annotation-inner-viewer').animate({scrollTop: parentTop - parentOffsetTop + pageOffsetTop}, 200);
        }
    },
    scrollToAnnotation: function (annotation_id) {
        if (annotation_id) {
            var pageOffsetTop = $('.p-' + annotation_id).offset().top;
            var parentTop = $('.annotation-inner-viewer').scrollTop();
            var parentOffsetTop = $('.annotation-inner-viewer').offset().top;
            var vTop = parentTop - parentOffsetTop + pageOffsetTop - 5;
            $('.annotation-inner-viewer').animate({scrollTop: vTop}, 200);
            this.props.contractApp.resetSelectedAnnotation();
        }
    },
    scrollToTop: function (e) {
        e.preventDefault();
        $('.annotations-viewer').animate({scrollTop: 0}, 500);
    },
    getAnnotationItemsComponent: function (annotationsCollectionForList, showClusterAnyway) {
        var annotationsList = [];
        if (_.size(annotationsCollectionForList) > 0) {
            for (var annotation_id in annotationsCollectionForList) {
                annotationsList.push((<AnnotationItem
                    showClusterAnyway={showClusterAnyway}
                    key={annotation_id}
                    contractApp={this.props.contractApp}
                    annotationsCollection={this.props.annotationsCollection}
                    annotation={annotationsCollectionForList[annotation_id]}/>));
            }
        }
        return annotationsList;
    },
    getAnnotationItemsComponentByPage: function (annotationsCollectionForList, showClusterAnyway) {
        var annotationsList = [];
        if (_.size(annotationsCollectionForList) > 0) {
            for (var page in annotationsCollectionForList) {
                for (var key in annotationsCollectionForList[page]) {
                    console.log(annotationsCollectionForList[page][key]);
                    annotationsList.push((<AnnotationItem
                        showClusterAnyway={showClusterAnyway}
                        key={page+'-'+key}
                        contractApp={this.props.contractApp}
                        annotationsCollection={this.props.annotationsCollection}
                        annotation={[annotationsCollectionForList[page][key]]}/>));
                }
            }
        }
        return annotationsList;

    },
    sortByPage: function () {
        if (this.props.annotationsCollection.models.length > 0) {
            this.props.annotationsCollection.sort();
            return (
                <div className="annotations-list" id="id-annotations-list">
                    {this.getAnnotationItemsComponentByPage(this.props.annotationsCollection.groupByPage(), true)}
                </div>
            );
        }
        return [];
    },
    sortByCategory: function () {
        if (this.props.annotationsCollection.models.length > 0) {
            this.props.annotationsCollection.sort();
            return (
                <div className="annotations-list" id="id-annotations-list">
                    {this.getAnnotationItemsComponent(this.props.annotationsCollection.groupByCategory(), true)}
                </div>
            );
        }
    },
    render: function () {
        if (this.props.annotationsCollection.models.length > 0) {
            if (this.props.annotationsCollection.sort_key === "category") {
                return this.sortByCategory();
            }
            return this.sortByPage();
        } else {
            return (
                <div className="annotations-list" id="id-annotations-list">
                    <p className="annotation-loading">{this.state.message}</p>
                </div>
            );
        }
    }
});

var PageLink = React.createClass({
    getInitialState: function () {
        return {
            id: '',
            pageNo: '',
            annotationType: ''
        }
    },
    componentDidMount: function () {
        var self = this;
        this.setPageState();
        this.props.contractApp.on("annotations:highlight", function (annotation) {
            if (annotation.id === self.state.id) {
                if (self.state.annotationType === "pdf") {
                    location.hash = "#/pdf/page/" + self.state.pageNo + "/annotation/" + self.state.id;
                } else {
                    location.hash = "#/text/page/" + self.state.pageNo + "/annotation/" + self.state.id;
                }
            }
        });
        this.props.contractApp.on("change:selected_annotation_id-1", function () {
            if (self.props.contractApp.getSelectedAnnotation() === self.state.id) {
                location.hash = "#/pdf/page/" + self.state.pageNo + "/annotation/" + self.state.id;
            }
        });
    },
    setPageState: function () {
        var id = this.props.annotation.get('id');
        var pageNo = this.props.annotation.get('page_no');
        var annotationType = "text";
        if (this.props.annotation.get('shapes')) {
            annotationType = "pdf";
        }

        this.setState({
            id: id,
            pageNo: pageNo,
            annotationType: annotationType
        });
    },
    handleAnnotationClick: function (e) {
        var self = this;
        e.preventDefault();
        switch (this.state.annotationType) {
            case "pdf":
                this.props.contractApp.trigger("annotations:highlight", {id: self.state.id});
                this.props.contractApp.setView("pdf");
                this.props.contractApp.setSelectedAnnotation(self.state.id);
                if (self.props.contractApp.getCurrentPage() == self.state.pageNo) {
                    var self = this;
                    setTimeout(function () {
                        self.props.contractApp.showPdfAnnotationPopup(self.state.id)
                    }, 300);
                }
                this.props.contractApp.setCurrentPage(self.state.pageNo);
                this.props.contractApp.triggerUpdatePdfPaginationPage(self.state.pageNo);
                break;
            case "text":
                this.props.contractApp.trigger("annotations:highlight", {id: self.state.id});
                var self = this;
                setTimeout(function () {
                    self.props.contractApp.showTextAnnotationPopup(self.state.id)
                }, 300);
                this.props.contractApp.setView("text");
                this.props.contractApp.setCurrentPage(self.state.pageNo);
                break;
        }
    },
    render: function () {
        if (this.props.article_reference != '') {
            return (
                <span className="page-gap">
                   <a href="#" onClick={this.handleAnnotationClick}>{this.props.article_reference}</a>
                    {this.props.last ? ', ' : ''}
               </span>
            )
        } else {
            return (
                <span className="page-gap">
                   <a href="#" onClick={this.handleAnnotationClick}>{this.props.page}</a>
                    {this.props.last ? ', ' : ''}
               </span>
            )
        }
    }
});

var AnnotationItem = React.createClass({
    getInitialState: function () {
        return {
            maxWords: 10,
            id: '',
            annotation_id: '',
            text: '',
            shortText: '',
            showEllipse: '',
            showMoreFlag: '',
            highlight: false,
            annotationList: []
        }
    },
    getCategory: function () {
        return this.state.annotationList[0].get('category');
    },
    shallShowEllipse: function (text) {
        var words = (text + "").split(' ');
        if (words.length >= this.state.maxWords) {
            return true;
        }
        return false;
    },
    truncate: function (text) {
        var words = (text + "").split(" ");
        words = words.splice(0, this.state.maxWords);
        return words.join(" ");
    },
    setAnnotationState: function () {
        var firstAnnotation = this.state.annotationList[0];
        var text = firstAnnotation.get('text') ? firstAnnotation.get('text').trim() : '';
        var id = firstAnnotation.get('id');
        var annotation_id = firstAnnotation.get('annotation_id');
        var showEllipse = this.shallShowEllipse(text);
        var shortText = "";
        if (showEllipse) {
            shortText = this.truncate(text);
        }
        var ann = this.props.annotationsCollection.get(this.props.contractApp.getSelectedAnnotation());
        var showMoreFlag = (ann && ann.get('annotation_id') === annotation_id) ? true : false;

        this.setState({
            id: id,
            text: text,
            annotation_id: annotation_id,
            shortText: shortText.trim(),
            showEllipse: showEllipse,
            showMoreFlag: showMoreFlag,
            highlight: showMoreFlag
        });
    },
    getPages: function () {
        var self = this;
        this.props.annotation.sort(function (a, b) {
            return a.get('page_no') - b.get('page_no');
        });

        var annotationGroupByPage = _.groupBy(this.props.annotation, function (a) {
            return a.get('page_no');
        });

        annotationGroupByPage = _.toArray(annotationGroupByPage);

        var length = annotationGroupByPage.length;

        return annotationGroupByPage.map(function (annotation, index) {
            var page = annotation[0].get('page_no');
            var last = false;
            if (index < (length - 1)) {
                last = true;
            }
            var count = annotation.length;
            var ref = annotation.map(function (annotation, index) {
                var l = false;
                if (index < (count - 1)) {
                    l = true;
                }
                var article_reference = (annotation.get('article_reference') != '') ? annotation.get('article_reference') : '';
                return (<PageLink contractApp={self.props.contractApp} annotation={annotation} last={l} page={page}
                                  article_reference={article_reference}/>)
            });

            return (
                <span>
                   {lang.page} {page} ({ref}){last ? ', ' : ''}
                 </span>
            );
        });
    },
    componentWillMount: function () {
        this.setState({annotationList: this.props.annotation});
    },
    componentDidMount: function () {
        this.setAnnotationState();
        var self = this;
        this.props.contractApp.on("annotations:highlight", function (annotation) {

            var current = annotation.id;
            var highlight = false;
            self.state.annotationList.map(function (annotation, index) {
                if (current == annotation.get('id')) {
                    highlight = true;
                }
            });

            if (highlight) {
                self.setState({
                    showMoreFlag: true,
                    highlight: true
                });
            } else {
                self.setState({
                    showMoreFlag: false,
                    highlight: false
                });
            }
        });
        this.props.contractApp.on("change:selected_annotation_id-1", function () {
            var ann = self.props.annotationsCollection.get(self.props.contractApp.getSelectedAnnotation());
            if (ann.get('annotation_id') === self.state.annotation_id) {
                self.setState({
                    showMoreFlag: true,
                    highlight: true
                });
            } else {
                self.setState({
                    showMoreFlag: false,
                    highlight: false
                });
            }
        });
    },
    handleEllipsis: function (e) {
        e.preventDefault();
        this.setState({showMoreFlag: !this.state.showMoreFlag});
    },
    getShowText: function () {
        var ellipsistext = "";
        var firstAnnotation = this.props.annotation[0];
        var showText = firstAnnotation.get('text') ? firstAnnotation.get('text').trim() : '';
        if (this.state.showEllipse) {
            showText = this.state.text + ' ';
            ellipsistext = lang.less;
            if (!this.state.showMoreFlag) {
                ellipsistext = lang.more;
                showText = this.state.shortText + '... ';
            }
        }

        if (this.state.text != '') {
            showText = (<span className="annotation-item-content">
                <span dangerouslySetInnerHTML={{__html: nl2br(showText)}}></span>
                <nobr><a className="annotation-item-ellipsis" href="#" onClick={this.handleEllipsis}
                         dangerouslySetInnerHTML={{__html: ellipsistext}}></a></nobr></span>);
        }
        else {
            showText = '';
        }
        return showText;
    },
    getPageClasses: function () {
        var className = "";

        this.props.annotation.map(function (annotation, index) {
            className += ' p-' + annotation.get('id');
        });

        return className;
    },
    getCluster: function () {
        return this.state.annotationList[0].get('cluster');
    },
    render: function () {
        var currentAnnotationClass = (this.state.highlight) ? "annotation-item selected-annotation" : "annotation-item";

        var category = this.getCategory();
        return (
            <div className={currentAnnotationClass +' ' +this.getCluster() + this.getPageClasses()}
                 id={this.state.annotation_id}>
                <p className="category">{category}</p>
                <p className="annotated-text">{this.getShowText()}</p>
                <div className="annotation-page">{this.getPages()}</div>
            </div>
        )
    }
});
