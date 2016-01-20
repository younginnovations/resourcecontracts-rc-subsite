Annotator.Plugin.AnnotatorEvents = (function(_super) {
    __extends(AnnotatorEvents, _super);
    AnnotatorEvents.prototype.events = {
        'annotationCreated': 'onAnnotationCreated',
        'annotationDeleted': 'onAnnotationDeleted',
        'annotationUpdated': 'onAnnotationUpdated',
        'annotationsLoaded' : 'annotationsLoaded',
        'annotorious:annotation-clicked': 'onAnnotationClicked',
        'annotorious:mouse-over-annotation': 'onMouseOverAnnotation'
    };
    AnnotatorEvents.prototype.field = null;
    AnnotatorEvents.prototype.input = null;    
    AnnotatorEvents.prototype.pluginInit = function(options) {
        var annotator = this.annotator;
        if (!Annotator.supported()) {
            return;
        }      
        annotator.viewer.addField({
            load: this.updateViewer,
        });
        this.annotator
            .subscribe("annotationEditorShown", onEditorShownHandler)
            .subscribe("annotationViewerShown", onViewShownHandler);
    };
    AnnotatorEvents.prototype.options = {
        AnnotatorEvents: {}
    };
    function AnnotatorEvents(element, options) {
        // this.beforeAnnotationCreated = __bind(this.beforeAnnotationCreated, this);
        this.onAnnotationClicked = __bind(this.onAnnotationClicked, this);
        this.onAnnotationCreated = __bind(this.onAnnotationCreated, this);
        this.onAnnotationUpdated = __bind(this.onAnnotationUpdated, this);
        this.onAnnotationDeleted = __bind(this.onAnnotationDeleted, this);
        this.annotationsLoaded   = __bind(this.annotationsLoaded, this);
        this.onMouseOverAnnotation = __bind(this.onMouseOverAnnotation, this);
        AnnotatorEvents.__super__.constructor.apply(this, arguments);
    };
    AnnotatorEvents.prototype.onAnnotationClicked = function(obj) {
        this.contractApp.trigger("annotations:highlight", obj.annotation);
    };    
    AnnotatorEvents.prototype.onAnnotationCreated = function(annotation) {
        annotation.id = this.collection.length + 1;
        if(this.currentPage) {
            this.currentPage.trigger("")
            annotation.page = this.currentPage.getPage();
            // annotation.page_id = ;
        }
        var self = this;
        setTimeout(function (event) {
            self.collection.trigger('annotationCreated', annotation);    
        }, 500);        
        // this.collection.add(annotation);
    };
    AnnotatorEvents.prototype.onAnnotationUpdated = function(annotation) {
        this.collection.add(annotation, {
            merge: true
        });
        this.collection.trigger('annotationUpdated');
    };
    AnnotatorEvents.prototype.onAnnotationDeleted = function(annotation) {
        this.collection.remove(annotation);
        this.collection.trigger('annotationDeleted');
    };



    AnnotatorEvents.prototype.onMouseOverAnnotation = function (viewer) {
        onViewShownHandler(viewer.mouseEvent)
    };
    AnnotatorEvents.prototype.annotationsLoaded = function (obj) {
        var annotation_id =  contractApp.getSelectedAnnotation();
        var hash = window.location.hash;

        if (annotation_id === 0 && hash != '') {
            if (typeof hash.split('annotation/')[1] !== 'undefined') {
                annotation_id = hash.split('annotation/')[1];
            }
        }

        if (contractApp.getView() == 'pdf') {
            setTimeout( function(){contractApp.showPdfAnnotationPopup(annotation_id)}, 600);
        }

        if (contractApp.getView() == 'text') {
            contractApp.showTextAnnotationPopup(annotation_id);
        }
    };

    function onEditorShownHandler(viewer) {
        var viewPort = contractApp.getView();
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
        var viewPort = contractApp.getView();
        var position = viewerEl.position();
        var wrapperEl = $('.'+viewPort+'-annotator');
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