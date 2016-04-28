Annotator.Plugin.AnnotatorNRGIViewer = (function (_super) {
    __extends(AnnotatorNRGIViewer, _super);
    AnnotatorNRGIViewer.prototype.field = null;
    AnnotatorNRGIViewer.prototype.input = null;
    AnnotatorNRGIViewer.prototype.pluginInit = function (options) {
        var annotator = this.annotator;
        if (!Annotator.supported()) {
            return;
        }
        annotator.viewer.addField({
            load: this.updateViewer
        });
    };
    function AnnotatorNRGIViewer(element, options) {
        AnnotatorNRGIViewer.__super__.constructor.apply(this, arguments);
    }

    AnnotatorNRGIViewer.prototype.updateViewer = function (field, annotation) {
        var textDiv = $(field.parentNode).find('div:first-of-type')[0];
        var html = getText(annotation);
        html += getPageNo(annotation);
        html += getCategory(annotation);
        html += getRelatedDocuments(annotation);
        $(textDiv).html(html);
        $(field).remove();

        $(textDiv).on("click", "a.annotation-viewer-more", function (e) {
            e.preventDefault();
            contractApp.trigger("annotations:highlight", annotation);
        });


        $(document).on('click', '.parent_annotation_link', function () {
            var $this = $(this);
            if ($this.data('view') == 'text') {
                setTimeout(function () {
                    contractApp.showTextAnnotationPopup($this.data('annotation'));
                    contractApp.trigger("annotations:highlight", {id:$this.data('annotation')});
                }, 300);
            }

            if ($this.data('view') == 'pdf') {
                setTimeout(function () {
                    contractApp.showPdfAnnotationPopup($this.data('annotation'));
                    contractApp.trigger("annotations:highlight", {id:$this.data('annotation')});
                }, 300);
            }
        });

    };

    function getText(annotation) {
        var text = '';
        var annotatedText = annotation.text;

        if (typeof annotatedText == 'undefined') {
            return false;
        }

        if (annotatedText != '') {
            text = annotatedText.split(" ").splice(0, 10).join(" ");
            text = nl2br(text);
            if (annotatedText.split(" ").length > 10) {
                text = text + " ...";
            }
        }

        var article_reference = '';
        if (typeof annotation.article_reference !== 'undefined' && annotation.article_reference != '') {
            article_reference = ' - ' + annotation.article_reference;
        }

        return '<div class="annotation-viewer-text">' + text + article_reference + '</div>';
    }

    function getPageNo(annotation) {
        var pageNo = annotation.page_no;

        if (annotation.shapes) {
            view = 'pdf';
            link = "#/" + view + "/page/" + pageNo + "/annotation/" + annotation.id;
        } else {
            view = 'text';
            link = "#/" + view + "/page/" + pageNo + "/annotation/"  + annotation.id;
        }

        return '<div class="annotation-viewer-page"><a href="'+link+'" class="annotation-viewer-more"> Page ' + annotation.page_no + ' >> </a></div>';
    }

    function getCategory(annotation) {
        return '<div class="annotation-viewer-category">'+annotation.category+'</div>';
    }

    function getRelatedDocuments(annotation) {
        var html = '';
        var annotations = annotationsCollection.relatedAnnotations(annotation);

        if (annotations.length > 0) {
            html += '<p><strong>Related Annotations:</strong></p>';
            var page = [];
            annotations.map(function (a) {
                var pageNo = a.get('page_no');
                var link = "";
                var view = "";
                if (a.get('shapes')) {
                    view = 'pdf';
                    link = "#/" + view + "/page/" + pageNo + "/annotation/" + a.get('id');
                } else {
                    view = 'text';
                    link = "#/" + view + "/page/" + pageNo + "/annotation/" + a.get('id');
                }

                var text = pageNo;
                var article_reference = a.get('article_reference');
                if (article_reference != '') {
                    text += ' - ' + article_reference;
                }
                page.push('<a style="margin-left: 5px" data-view="' + view + '" data-annotation="' + a.get('id') + '" class="parent_annotation_link" href="' + link + '"> Page ' + text + '</a>');
            });
            html += '<p style="padding: 5px 0px">';
            html += page.join(',');
            html += '</p>';
        }

        return html;
    }

    return AnnotatorNRGIViewer;

})(Annotator.Plugin);