Annotator.Plugin.AnnotatorNRGIViewer = (function (_super) {
    __extends(AnnotatorNRGIViewer, _super);
    AnnotatorNRGIViewer.prototype.field = null;
    AnnotatorNRGIViewer.prototype.input = null;
    AnnotatorNRGIViewer.prototype.pluginInit = function () {
        if (!Annotator.supported()) {
            return;
        }
        this.annotator.viewer.addField({
            load: this.updateViewer
        });
    };
    function AnnotatorNRGIViewer(element, options) {
        this.updateViewer = __bind(this.updateViewer, this);
        AnnotatorNRGIViewer.__super__.constructor.apply(this, arguments);
    }

    AnnotatorNRGIViewer.prototype.updateViewer = function (field, annotation) {
        var contract = this.contract;
        var textDiv = $(field.parentNode).find('div:first-of-type')[0];
        var html = this.getText(annotation);
        html += this.getCategory(annotation);
        //  html += getRelatedDocuments(annotation);
        $(textDiv).html(html);
        $(field).remove();

        $(textDiv).on("click", "a.annotation-viewer-more", function (e) {
            contract.trigger("annotation:highlight", annotation);
        });

        $(document).on('click', '.parent_annotation_link', function () {
            var $this = $(this);
            if ($this.data('view') == 'text') {
                setTimeout(function () {
                    contract.showTextAnnotationPopup($this.data('annotation'));
                    contract.trigger("annotations:highlight", {id: $this.data('annotation')});
                }, 300);
            }

            if ($this.data('view') == 'pdf') {
                setTimeout(function () {
                    contract.showPdfAnnotationPopup($this.data('annotation'));
                    contract.trigger("annotations:highlight", {id: $this.data('annotation')});
                }, 300);
            }
        });

    };

    AnnotatorNRGIViewer.prototype.getText = function (annotation) {
        var text = '';
        var annotatedText = annotation.text;

        if (typeof annotatedText == 'undefined') {
            return false;
        }

        if (annotatedText != '') {
            text = annotatedText.split(" ").splice(0, 10).join(" ");
              text = this.nl2br(text);
            if (annotatedText.split(" ").length > 10) {
                text = text + " ...";
            }
        }

        var article_reference = '';
        if (typeof annotation.article_reference !== 'undefined' && annotation.article_reference != '') {
            article_reference = ' - ' + annotation.article_reference;
        }

        var link = "";
        var viewPort = 'text';
        if (annotation.shapes) {
            viewPort = 'pdf';
        }
        link = ' <a class="annotation-viewer-more" href="#/' + viewPort + '/page/' + annotation.page_no + '/annotation/' + annotation.id + '">>></a>';

        return '<div class="annotation-viewer-text">' + text + article_reference + link + '</div>';
    };

    AnnotatorNRGIViewer.prototype.getCategory = function (annotation) {
        return '<div class="annotation-viewer-category">' + this.transCategory(annotation.category_key, annotation.category)+ '</div>';
    };

    function getRelatedDocuments(annotation) {
        var html = '';
        var annotations = annotationsCollection.relatedAnnotations(annotation);

        if (annotations.length > 0) {
            var page = [];

            annotations.sort(function (a, b) {
                return a.get('page_no') - b.get('page_no');
            });

            var annotationGroupByPage = _.groupBy(annotations, function (a) {
                return a.get('page_no');
            });

            annotationGroupByPage = _.toArray(annotationGroupByPage);

            annotationGroupByPage.map(function (anno, index) {
                var a = anno[0];
                var last = false;
                if (index < (length - 1)) {
                    last = true;
                }

                var ref = [];
                anno.map(function (a, index) {
                    var link = "";
                    var view = "";
                    if (a.get('shapes')) {
                        view = 'pdf';
                        link = "#/" + view + "/page/" + a.get('page_no') + "/annotation/" + a.get('id');
                    } else {
                        view = 'text';
                        link = "#/" + view + "/page/" + a.get('page_no') + "/annotation/" + a.get('id');
                    }

                    var article_reference = (a.get('article_reference') != '') ? a.get('article_reference') : a.get('page_no');
                    ref.push('<a style="margin: 0px 3px" data-view="' + view + '" data-annotation="' + a.get('id') + '" class="parent_annotation_link" href="' + link + '">' + article_reference + '</a>');
                });

                var text = a.get('page_no');
                text += ' (' + ref.join(', ') + ')';
                page.push(text);
            });
            html += '<p style="padding: 5px 0px">';

            if (annotationGroupByPage.length > 1) {
                html += 'Pages: ';
            } else {
                html += 'Page: ';
            }

            html += page.join(', ');
            html += '</p>';
        }
        return html;
    }

    return AnnotatorNRGIViewer;

})(Annotator.Plugin);