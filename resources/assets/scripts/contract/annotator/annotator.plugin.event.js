Annotator.Plugin.AnnotatorEvents = (function (_super) {
    __extends(AnnotatorEvents, _super);
    AnnotatorEvents.prototype.events = {
        'annotationsLoaded': 'annotationsLoaded',
    };
    AnnotatorEvents.prototype.field = null;
    AnnotatorEvents.prototype.input = null;
    AnnotatorEvents.prototype.pluginInit = function (options) {
        var annotator = this.annotator;
        if (!Annotator.supported()) {
            return;
        }
        annotator.viewer.addField({
            load: this.updateViewer
        });

        this.annotator
            .subscribe("annotationEditorShown", onEditorShownHandler)
            .subscribe("annotationViewerShown", onViewShownHandler);
    };
    AnnotatorEvents.prototype.options = {
        AnnotatorEvents: {}
    };
    function AnnotatorEvents(element, options) {
        this.annotationsLoaded = __bind(this.annotationsLoaded, this);
        AnnotatorEvents.__super__.constructor.apply(this, arguments);
    }

    AnnotatorEvents.prototype.onMouseOverAnnotation = function (viewer) {
        onViewShownHandler(viewer.mouseEvent)
    };
    AnnotatorEvents.prototype.annotationsLoaded = function (obj) {
     console.log('loaded');
    };

    function onEditorShownHandler(viewer) {
        var viewPort = contractApp.getView() == 'pdf' ? 'pdf' : 'text';
        var viewerEl = $(viewer.element);
        var position = viewerEl.position();
        var wrapperEl = $('.' + viewPort + '-annotator');
        var widgetEl = wrapperEl.find('form.annotator-widget');
        var editorEl = wrapperEl.find('div.annotator-editor');
        var widgetHeight = widgetEl.height() + 25;

        if (wrapperEl.width() / 2 < position.left) {
            viewerEl.addClass('annotator-invert-x');
            editorEl.addClass('annotator-invert-x');
        } else {
            viewerEl.removeClass('annotator-invert-x');
            editorEl.removeClass('annotator-invert-x');
        }

        var diff = position.top - wrapperEl.scrollTop();

        if (diff < widgetHeight) {
            viewerEl.addClass('annotator-invert-y');
            editorEl.addClass('annotator-invert-y');
        } else {
            viewerEl.removeClass('annotator-invert-y');
            editorEl.removeClass('annotator-invert-y');
        }

    }

    function onViewShownHandler(viewer, annotations) {
        var viewerEl = $(viewer.element);
        var viewPort = contractApp.getView() == 'pdf' ? 'pdf' : 'text';
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
    }
    return AnnotatorEvents;
})(Annotator.Plugin);