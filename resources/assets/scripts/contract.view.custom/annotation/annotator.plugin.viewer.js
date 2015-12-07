Annotator.Plugin.AnnotatorNRGIViewer = (function(_super) {
    __extends(AnnotatorNRGIViewer, _super);
    AnnotatorNRGIViewer.prototype.field = null;
    AnnotatorNRGIViewer.prototype.input = null;    
    AnnotatorNRGIViewer.prototype.pluginInit = function(options) {
        var annotator = this.annotator;
        if (!Annotator.supported()) {
            return;
        }      
        annotator.viewer.addField({
            load: this.updateViewer,
        });       
    };
    function AnnotatorNRGIViewer(element, options) {
        AnnotatorNRGIViewer.__super__.constructor.apply(this, arguments);
    };
    AnnotatorNRGIViewer.prototype.onClickAnnotionMore = function(e, annotation) {
        e.preventDefault();
        AnnotatorNRGIViewer.contractApp.trigger("annotations:highlight", obj.annotation);
    },
    AnnotatorNRGIViewer.prototype.updateViewer = function(field, annotation) {
        var link = "";
        if(annotation.shapes) {
            link="#/pdf/page/"+annotation.page_no+"/annotation/"+annotation.id;
        }
        var textDiv = $(field.parentNode).find('div:first-of-type')[0];
        var annotatinonCatEnglish = annotation.category.split('//')[0];
        var annotatinonCatFrench = annotation.category.split('//')[1];

        textDiv.innerHTML = '<div class="annotation-viewer-category">' + annotatinonCatEnglish + '<br>' + 
                            '<i>' + annotatinonCatFrench + '</i></div>' + 
                            '<span>Page ' + annotation.page_no + '</span>' +
                            '<a href="' + link + '" class="annotation-viewer-more"> >> </a>';
        $(textDiv).on("click", "a", function(e) {
            contractApp.trigger("annotations:highlight", annotation);
        });
        // $(textDiv).find("a").onclick = function() { console.log('here')};
        $(field).remove(); //this is the auto create field by annotator and it is not necessary
    }    

    return AnnotatorNRGIViewer;
})(Annotator.Plugin);