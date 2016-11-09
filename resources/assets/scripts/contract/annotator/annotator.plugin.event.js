Annotator.Plugin.AnnotatorEvents = (function (_super) {
    __extends(AnnotatorEvents, _super);
    AnnotatorEvents.prototype.events = {
        'annotationsLoaded': 'annotationsLoaded',
        'annotationViewerShown': 'annotationViewerShown'
    };
    AnnotatorEvents.prototype.field = null;
    AnnotatorEvents.prototype.input = null;
    AnnotatorEvents.prototype.pluginInit = function () {
        if (!Annotator.supported()) {
            return;
        }
    };

    function AnnotatorEvents(element, options) {
        this.annotationsLoaded = __bind(this.annotationsLoaded, this);
        this.annotationViewerShown = __bind(this.annotationViewerShown, this);
        AnnotatorEvents.__super__.constructor.apply(this, arguments);
    }

    AnnotatorEvents.prototype.annotationsLoaded = function () {
        var contract = this.contract;
        if (this.contract.getView() != 'pdf') {
            var hash = window.location.hash;
            var annotation_id = 0;
            if (hash != '' && typeof hash.split('annotation/')[1] !== 'undefined') {
                annotation_id = hash.split('annotation/')[1];
            }

            if (annotation_id < 1) {
                return;
            }
            contract.showPopup(annotation_id);
        }
    };
    AnnotatorEvents.prototype.annotationViewerShown = function (viewer, annotations) {
        var viewerEl = $(viewer.element);
        var viewPort = this.contract.getView();
        var position = viewerEl.position();
        var wrapperEl = $('.' + viewPort + '-annotator');
        var widgetEl = wrapperEl.find('ul.annotator-widget');
        var widgetHeight = widgetEl.height() + 25;

        if (wrapperEl.width() / 2 < position.left) {
            viewerEl.addClass('annotator-invert-x');
            widgetEl.addClass('annotator-invert-x');
        } else {
            viewerEl.removeClass('annotator-invert-x');
            widgetEl.removeClass('annotator-invert-x');
        }

        var diff = position.top - wrapperEl.scrollTop();

        if (diff < widgetHeight) {
            viewerEl.addClass('annotator-invert-y');
            widgetEl.addClass('annotator-invert-y');
        } else {
            viewerEl.removeClass('annotator-invert-y');
            widgetEl.removeClass('annotator-invert-y');
        }
    };

    return AnnotatorEvents;
})(Annotator.Plugin);