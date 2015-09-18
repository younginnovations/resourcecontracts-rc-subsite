var AnnotationHeader = React.createClass({
    componentDidMount: function() {
        var self = this;
        this.props.annotationsCollection.on("reset", function() {
          self.forceUpdate();
        });
    },
    render: function() {
        var count = this.props.annotationsCollection.length;
        return (
            <div className="annotation-title">Annotations - {count}</div>
        );
    }
});

var AnnotationItem = React.createClass({
    handleAnnotationClick: function(e) {
        var self = this;
        if(this.props.annotation.get('shapes')) {
            this.props.contractApp.setView("pdf");
            location.hash = "#/pdf";
            setTimeout(self.props.contractApp.setCurrentPage(self.props.annotation.get('page_no')), 100);   
            this.props.contractApp.triggerUpdatePdfPaginationPage(self.props.annotation.get('page_no'));
            // this.props.currentPdfPage.set({"page_no": this.props.annotation.get('page_no')});
            // annotation_type = "pdf";
        } else if(this.props.annotation.get('ranges')) {
            location.hash = "#/text";
            this.props.contractApp.setView("text");
            this.props.contractApp.setCurrentPage(this.props.annotation.get('page_no'));
            setTimeout(this.props.contractApp.triggerScrollToTextPage());
            // location.hash = "#/text/page/"+this.props.annotation.get('page_no');
            // this.props.currentPage.set({"page_no": this.props.annotation.get('page_no')});
            // this.props.currentPage.trigger("scroll-to-page");
            // annotation_type = "text";
        }
    },
    truncate: function(str, num){
        num = num || 20;
        str = str + '';
        var words = str.split(' ');
        if(num > words.length) {
            return str;
        } else {
            this.props.annotation.ellipsis = "showmore";
            words = words.splice(0,num);
            return words.join(' ');
        }
    },
    handleEllipsis: function(e) {
        e.preventDefault();
        var text = e.target.innerHTML;
        if(text == "...more") {            
            this.props.annotation.ellipsis = "showless";
        } else if(text == "...less") {
            this.props.annotation.ellipsis = "showmore";
        }
        this.forceUpdate();
    },
    render: function() {
        var category = this.props.annotation.get('category');
        var id = this.props.annotation.get('id');
        var text = this.props.annotation.get('text') || "";
        var quote = this.props.annotation.get('quote') || "";
        var page_no = "Pg " + this.props.annotation.get('page_no');
        var annotation_type = "";
        if(this.props.annotation.get('shapes')) {
            annotation_type = " (pdf)";
        } else if(this.props.annotation.get('ranges')) {
            annotation_type = " (text)";
        }
        text = text.toString().trim() + "";
        if(quote.trim()) {
            if(text.trim()) {
                text = text + " - " + quote.trim();
            } else {
                text = quote.trim();
            }
        }
        var showText = text;
            ellipsistext = "";
        if(!this.props.annotation.ellipsis || this.props.annotation.ellipsis == "showmore") {
            showText = this.truncate(text);            
        }
        if(this.props.annotation.ellipsis == "showmore") {
            ellipsistext = "...more";
        } else if(this.props.annotation.ellipsis == "showless") {
            ellipsistext = "...less";
        }
        var currentAnnotationClass = "";
        if(this.props.contractApp.getSelectedAnnotation() === this.props.annotation.get('id')) {
            currentAnnotationClass = "selected-annotation";
            // this.props.contractApp.resetSelectedAnnotation();
        }
        
        return (
            <div className="annotation-category">
                <span onClick={this.handleAnnotationClick}>{category}</span>                
                <ul>
                    <li className={currentAnnotationClass}>
                        <div id={id}>
                            <span onClick={this.handleAnnotationClick}>{page_no}</span>
                            <span>{showText}</span> 
                            <a href="#" onClick={this.handleEllipsis}>{ellipsistext}</a>
                            {annotation_type}
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
});

var AnnotationsSort = React.createClass({
    getInitialState: function() {
        return {
            value: 'sort-by-category'
        }
    },    
    handleSelect: function(e) {
        this.setState({value: event.target.value});
        if("sort-by-page" === event.target.value) {
            annotationsCollection.setSortByKey("page_no");
        } else {
            //default sort by page
            annotationsCollection.setSortByKey("category");
        }
        annotationsCollection.trigger("reset");
    },
    render: function() {
        return (
            <div className="annotation-sort">
                Sort by 
                <select id="annotation-sort-by" onChange={this.handleSelect} value={this.state.value}>
                    <option value="sort-by-page">Page</option>
                    <option value="sort-by-category">Category</option>
                </select>
            </div>
        );        
    }
});

var AnnotationsList = React.createClass({
    componentDidMount: function() {
        var self = this;
        this.props.annotationsCollection.on("reset", function() {
          self.forceUpdate();
          if(self.props.contractApp.getSelectedAnnotation()) {
            self.props.contractApp.triggerScrollInAnnotationList();
          }
        });
        this.props.contractApp.on("scroll-in-annotation-list", function() {
            self.scrollToAnnotation(self.props.contractApp.getSelectedAnnotation());
        });
    },
    scrollToAnnotation: function(annotation_id) {
        if(annotation_id) {
            var pageOffsetTop = $('#'+annotation_id).offset().top - 70;
            var parentTop = $('.annotations-viewer').scrollTop();
            var parentOffsetTop = $('.annotations-viewer').offset().top
            $('.annotations-viewer').animate({scrollTop: parentTop - parentOffsetTop + pageOffsetTop},500);
            this.props.contractApp.resetSelectedAnnotation();
        }
    },    
    render: function() {
        var annotationsList;
        var self = this;
        this.props.annotationsCollection.sort();
        if(this.props.annotationsCollection.models.length > 0) {
          annotationsList = this.props.annotationsCollection.models.map(function(model, i) {
            return (
              <AnnotationItem 
                key={i}
                contractApp={self.props.contractApp} 
                annotation={model} />
            );
          });
        }
        return (
          <div className="annotations-list">
          {annotationsList}
          </div>
        );
    }
});


var AnnotationsViewer = React.createClass({
    render: function() {
        return(
            <div className="annotations-viewer" style={this.props.style}>
                <AnnotationHeader annotationsCollection={this.props.annotationsCollection} />
                <AnnotationsSort annotationsCollection={this.props.annotationsCollection} />
                <AnnotationsList 
                    contractApp={this.props.contractApp} 
                    annotationsCollection={this.props.annotationsCollection} />
            </div>
        );
    }
});