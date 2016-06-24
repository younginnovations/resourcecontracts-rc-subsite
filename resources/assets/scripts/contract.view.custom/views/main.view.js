function nl2br (str, is_xhtml) {
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
pagesCollection.on("reset", function() {
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

    getInitialState : function(){
    return {dropdown :false, socialdropdown : false};
},
toggleDropdown : function()
{
    this.setState({dropdown:!this.state.dropdown})
},
socialDropdown : function()
{
    this.setState({socialdropdown:! this.state.socialdropdown})
},
render:function() {

    var show = {'display':'block'};
    var hide= {'display':'none'};
    var style =  this.state.dropdown ? show :hide;
    var socialStyle =  this.state.socialdropdown ? show :hide;
    var current_url = encodeURIComponent(window.location.href);

    if(!this.props.annotations_url && !this.props.text_url)
    {
        return (
            <div>
                <div className="download-dropdown">
                    <a href="#" onClick={this.toggleDropdown}><span>{lang.download}</span></a>
                    <ul className="dropdown-menu" style={style} >
                    <li><a href={this.props.pdf_url}>{lang.pdf}</a></li>
                    </ul>
                </div>
                <div className="social-share download-wrap">
                    <a href="#"  onClick={this.socialDropdown}><span>share</span></a>
                    <ul className="dropdown-menu" style={socialStyle}>
                        <li className="facebook"><a href={ facebook_share + current_url} target="_blank">FB</a></li>
                        <li className="google-plus"><a href={ google_share + current_url} target="_blank">G+</a></li>
                        <li className="twitter"><a href={ twitter_share } target="_blank">T</a></li>
                    </ul>
                </div>
           </div>
            );
    }
    else if(!this.props.text_url){
        return (
            <div>
                <div className="download-dropdown">
                <a href="#" onClick={this.toggleDropdown}><span>{lang.download}</span></a>
                <ul className="dropdown-menu" style={style} >
                <li><a href={this.props.pdf_url}>{lang.pdf}</a></li>
                <li><a href={this.props.annotations_url}>{lang.annotations}</a></li>
                </ul>
                </div>
                <div className="social-share dropdown-wrap">
                    <a href="#"  onClick={this.socialDropdown}><span>share</span></a>
                    <ul className="dropdown-menu" style={socialStyle}>
                        <li className="facebook"><a href={ facebook_share + current_url} target="_blank">FB</a></li>
                        <li className="google-plus"><a href={ google_share + current_url} target="_blank">G+</a></li>
                        <li className="twitter"><a href={ twitter_share } target="_blank">T</a></li>
                    </ul>
                </div>
            </div>

            );
        }
    else if(!this.props.annotations_url)
    {
        return (
            <div>
                <div className="download-dropdown">
                <a href="#" onClick={this.toggleDropdown}><span>{lang.download}</span></a>
                <ul className="dropdown-menu" style={style} >
                <li><a href={this.props.pdf_url}>{lang.pdf}</a></li>
                <li><a href={this.props.text_url}>{lang.word_file}</a></li>
                </ul>
                </div>
                <div className="social-share dropdown-wrap">
                    <a href="#"  onClick={this.socialDropdown}><span>share</span></a>
                    <ul className="dropdown-menu" style={socialStyle}>
                        <li className="facebook"><a href={ facebook_share + current_url} target="_blank">FB</a></li>
                        <li className="google-plus"><a href={ google_share + current_url} target="_blank">G+</a></li>
                        <li className="twitter"><a href={ twitter_share } target="_blank">T</a></li>
                    </ul>
                </div>
            </div>
            );
         }
    else{
        return (
            <div>
            <div className="download-dropdown">
            <a href="#" onClick={this.toggleDropdown}><span>{lang.download}</span></a>
            <ul className="dropdown-menu" style={style}>
            <li><a href={this.props.pdf_url}>{lang.pdf}</a></li>
            <li><a href={this.props.text_url}>{lang.word_file}</a></li>
            <li><a href={this.props.annotations_url}>{lang.annotations}</a></li>
            </ul>
            </div>
            <div className="social-share dropdown-wrap">
                <a href="#"  onClick={this.socialDropdown}><span>share</span></a>
                <ul className="dropdown-menu" style={socialStyle}>
                    <li className="facebook"><a href={ facebook_share + current_url} target="_blank">FB</a></li>
                    <li className="google-plus"><a href={ google_share + current_url} target="_blank">G+</a></li>
                        <li className="twitter"><a href={ twitter_share } target="_blank">T</a></li>
                </ul>
            </div>
        </div>
         );

    }
    }
});



var SelectLanguage = React.createClass({
    handleChange: function(e){
        console.log("hello",e);
    },
   render:function(){
       var language = [];
       language = JSON.parse(languages);
       var availableLang=[];
       var imageStyle = {width: '16px' , height: '16px', 'margin-right': '6px'};
       var ulStyle = {'min-width':'110px'};
       _.each(language,function(value,key){
           var url = currentUrl+'?lang='+key;
           var flagUrl = "https://raw.githubusercontent.com/younginnovations/country-flags/master/png250px/"+value['country_code']+".png";
           if(key!=currentLanguage){
               availableLang.push(<li>
               <a href={url}>
               <img style={imageStyle} src={flagUrl} />
               {value['name']}
               </a>
               </li>);

           }

       });

       if(localisationState)
       {
       return (
               <div className="dropdown language-selector">
                   <button className="btn  dropdown-toggle"  data-toggle="dropdown" >
                   <img style={imageStyle} src={languageImage}/>{selectedLang}
                   <span className="caret"></span>
                   </button>
                   <ul className="dropdown-menu" style={ulStyle}>
                   {availableLang}
                   </ul>
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
    getInitialState: function() {
        return {
            currentView: 'pdf'
        }
    },
    text: function(page_no, annotation_id) {
        debug("view.blade.php: setting text view");
        contractApp.setView("text");
        contractApp.setCurrentPage(contractApp.getCurrentPage());
        contractApp.resetSelectedAnnotation();
        if(page_no) {
            contractApp.setCurrentPage(page_no);
        }
        if(annotation_id) {
            contractApp.setSelectedAnnotation(annotation_id);
        }
        contractApp.trigger("update-text-pagination-page", contractApp.getCurrentPage());
        this.forceUpdate();
        contractApp.trigger('scroll-to-text-page');
    },
    pdf: function(page_no, annotation_id) {
        debug("view.blade.php: setting pdf view");
            contractApp.setView("pdf");
        if(page_no) {
            contractApp.setCurrentPage(page_no);
        }
        if(annotation_id) {
            contractApp.setSelectedAnnotation(annotation_id);
        } else {
            contractApp.resetSelectedAnnotation();
        }
        contractApp.trigger("change:page_no");
        contractApp.trigger("update-pdf-pagination-page", contractApp.getCurrentPage());
        this.forceUpdate();
    },
    search: function(query) {
        contractApp.setView("search");
        var show_pdf_text = contractApp.metadata.get('is_ocr_reviewed');

            contractApp.setSearchQuery(query);
            searchResultsCollection.fetch({
                searchTerm: query,
                reset: true
            });

        this.forceUpdate();
    },
    meta: function(action) {
        // this.forceUpdate();
    },
    metadata: function() {
        contractApp.setView("metadata");
        this.scrollTo('#metadata');
        this.forceUpdate();
    },
    annotation: function() {
        contractApp.setView("annotation");
        this.scrollTo('#annotations');
        this.forceUpdate();
    },
    scrollTo:function(id){
        $('html,body').animate({
                scrollTop: $(id).offset().top - 150},
            'slow');
    },
    componentDidUpdate: function() {
       contractApp.setIsSearch(false);
    },
    componentWillMount: function() {
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
    getStyle: function(showFlag) {
        var style = { display: "none" };
        if(showFlag) style.display = "block";
        return style;
    },
    render: function() {
        return (
            <div className="main-app">
                <div className="title-head-wrap">
                    <div className="title-wrap">
                        <div className="navbar-header">

                            <a className="navbar-brand" href={app_url} >{category}<span className="beta">Beta</span><span>Contracts</span></a>

                        </div>
                        <span>{htmlDecode(contractTitle)}</span>
                        <SelectLanguage />
                    </div>
                    <div className="head-wrap clearfix">
                        <TextSearchForm
                            style={this.getStyle(contractApp.isViewVisible("TextSearchForm"))}
                            contractApp={contractApp} />
                        <NavigationView
                            contractApp={contractApp} />
                        <TextPaginationView
                            style={this.getStyle(contractApp.isViewVisible("TextPaginationView"))}
                            contractApp={contractApp}
                            pagesCollection={pagesCollection} />
                        <PdfPaginationView
                            style={this.getStyle(contractApp.isViewVisible("PdfPaginationView"))}
                            contractApp={contractApp} />
                        <PdfZoom
                            style={this.getStyle(contractApp.isViewVisible("PdfZoom"))}
                            contractApp={contractApp} />

                       <DownloadUrl
                            pdf_url={pdf_download_url}
                            text_url={text_download_url}
                            annotations_url={annotations_download_url}
                        />

                        <MetadataToggleButton
                            style={this.getStyle(contractApp.getShowMeta())}
                            contractApp={contractApp} />
                    </div>
                </div>
                <div className="document-wrap">
                    <AnnotationsViewer
                        style={this.getStyle(contractApp.isViewVisible("AnnotationsViewer"))}
                        contractApp={contractApp}
                        annotationsCollection={annotationsCollection} />
                    <TextSearchResultsList
                        style={this.getStyle(contractApp.isViewVisible("TextSearchResultsList"))}
                        contractApp={contractApp}
                        searchResultsCollection={searchResultsCollection} />
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
                            pagesCollection={pagesCollection} />
                    </div>
                    <RightColumnView
                        metadata={contractApp.metadata}
                        contractApp={contractApp} />
                </div>
            </div>
        );
    }
});

React.render(
    <MainApp />,
    document.getElementById('content')
);
