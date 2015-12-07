  var ContractApp = Backbone.Model.extend({
    defaults: {
      page_no: 1,
      total_pages: 0,
      view: "pdf",
      search_query: "",
      contract_id: 0,
      guid: "",
      selected_annotation_id: 0,
      pdfscale: 1,
      showMeta: true,
      canrender: true
    },
    initialize: function(options) {
      this.metadata = new Metadata();
      this.loadMetadata();
    },
    loadMetadata: function() {
      var self = this;
      this.metadata.url = this.getMetadataUrl();
      this.metadata.fetch();
    },
    getShowMeta: function() {
      return this.get("showMeta");
    },
    getContractId: function() {
      return this.get("contract_id");
    },
    getContractGuid: function() {
      return this.get("guid");
    },
    getMetadataSummaryLink: function() {
      return app_url + "/contract/" + this.getContractGuid();
    },
    getMetadataUrl: function() {
      return this.get('esapi') + "contract/" + this.getContractGuid() + "/metadata";
    },  
    getAllPageUrl: function() {
      return this.get('esapi') + "contract/" + this.getContractGuid() + "/text";
    },
    getAllAnnotationsUrl: function() {
      return this.get('esapi') + "contract/" + this.getContractGuid() + "/annotations";
    },
    getSearchUrl: function() {
      return this.get('esapi') + "contract/" + this.getContractGuid() + "/searchtext"
    },
    getPdfUrl: function() {
      var page_no = parseInt(this.getCurrentPage());
      var pageModel = pagesCollection.where({ page_no: page_no});
      if(pageModel && pageModel[0] && pageModel[0].attributes) {
          return pageModel[0].get("pdf_url");
      }
      return "";
    },
    getFullPdfUrl: function() {
      return "";
    },
    getLoadAnnotationsUrl: function() {
      return this.get('esapi') + "contract/" + this.getContractGuid() + "/annotations";
    },
    getAnnotationsListAnchor: function() {
      return app_url + "/contract/" + this.getContractGuid() + "#annotations";
    },
    renderStart: function() {
      this.set({"canrender": true});
    },
    renderComplete: function() {
      this.set({"canrender": false});
    },
    canRender: function() {
      return this.get("canrender");
    },
    setCurrentPage: function(page_no) {
      page_no = parseInt(page_no);
      this.set({page_no: page_no});
    },
    getCurrentPage: function() {
      return this.get("page_no");
    },
    getTotalPages: function() {
      return this.get("total_pages");
    },
    setSelectedAnnotation: function(annotation_id) {
      this.set("selected_annotation_id", annotation_id);
    },
    resetSelectedAnnotation: function(annotation_id) {
      this.set("selected_annotation_id", 0);
    },
    getSelectedAnnotation: function() {
      return this.get("selected_annotation_id");
    },        
    setView: function(view) {
      if(view.trim() == "pdf" || view.trim() == "text" || view.trim() == "search") {            
        this.set({view: view});
      }
    },
    getView: function() {
      return this.get("view");
    },
    getSearchQuery: function() {
      return this.get("search_query");
    },
    setSearchQuery: function(query) {
      this.set({search_query: query.trim()});
    },
    getPdfScale: function() {
      return this.get("pdfscale");
    },
    setPdfScale: function(scale) {
      return this.set({"pdfscale": scale});
    },
    triggerScrollToTextPage: function() {
      if(this.get("view") === "text" || this.get("view") === "search") {
        this.trigger('scroll-to-text-page');
      }
    },
    triggerGoToPdfPage: function() {
      if(this.get("view") === "pdf") {
        this.trigger('scroll-to-pdf-page');
      }
    },
    triggerUpdateTextPaginationPage: function(page_no) {
      if(this.get("view") === "text" || this.get("view") === "search") {
        this.trigger('update-text-pagination-page', page_no);
      }
    },
    triggerUpdatePdfPaginationPage: function(page_no) {
      if(this.get("view") === "pdf") {
        this.trigger("update-pdf-pagination-page", page_no);
      }
    },
    isViewVisible: function(viewName) {
      switch(viewName) {
        case "TextPaginationView":
        case "TextViewer":
        case "TextSearchForm":
          if("text" === this.getView() || "search" === this.getView() ) {
            return true;
          } else {
            return false;
          }
          break;
        case "TextSearchResultsList":
          if("search" === this.getView()) {
            return true;
          } else {
            return false;
          }
          break;              
        case "PdfPaginationView":
        case "PdfViewer":
        case "PdfZoom":
          if("pdf" === this.getView()) {
            return true;
          } else {
            return false;
          }
          break;
        case "AnnotationsViewer":
          if("search" === this.getView()) {
            return false;
          } else {
            return true;
          }
          break;
        case "RightColumnView":
          if(this.getShowMeta()) {
            return true;
          } else {
            return false;
          }
        default:
          return false;
      }
    }
  });