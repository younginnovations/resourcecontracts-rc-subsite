Annotator.Plugin.PdfAnnotator = (function (_super) {
    __extends(PdfAnnotator, _super);
    PdfAnnotator.prototype.events = {};
    PdfAnnotator.prototype.field = null;
    PdfAnnotator.prototype.notification = null;
    PdfAnnotator.prototype.pluginInit = function (options) {
        var annotator = this.annotator;
        if (!Annotator.supported()) {
            return;
        }
        var el = annotator.element;
        var self = this;

        annotator.subscribe("annotationsLoaded", function (annotation) {
            $('.annotator-pdf-hl').remove();
            annotation.map(function (ann) {
                if (ann.shapes === undefined)
                    return '';
                self.annotationLoader(ann);
            })
        });

        el.on('mouseover', 'div', function () {
            var annotation = $(this).data('annotator');
            if (annotation) {
                var pos = {};
                pos.top = parseInt($(this).css('top')) + parseInt($(this).height());
                pos.left = parseInt($(this).css('left')) + parseInt($(this).width() / 2);
                annotator.showViewer([annotation], pos);
            }
        })

    };

    PdfAnnotator.prototype.annotationLoader = function (annotation) {
        var geo = annotation.shapes[0].geometry;
        geo = this.getShape(geo);
        var div = $('<div></div>')
            .appendTo(this.annotator.element.find('.annotator-wrapper'))
            .data('annotator', annotation)
            .addClass('annotator-hl')
            .addClass('annotator-pdf-hl')
            .css({position: 'absolute', left: geo.x, top: geo.y, height: geo.height, width: geo.width});
    };

    PdfAnnotator.prototype.options = {
        PdfAnnotator: {}
    };

    function PdfAnnotator(element, options) {
        PdfAnnotator.__super__.constructor.apply(this, arguments);
    }

    PdfAnnotator.prototype.getShape = function (geometry) {
        var canvas = this.annotator.element.find('canvas');
        var g = {};
        g.x = geometry.x * canvas.width();
        g.y = geometry.y * canvas.height();
        g.height = geometry.height * canvas.height();
        g.width = geometry.width * canvas.width();
        return g;
    };

    return PdfAnnotator;
})(Annotator.Plugin);
