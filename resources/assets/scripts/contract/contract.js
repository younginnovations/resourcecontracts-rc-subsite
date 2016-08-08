import Config from './config';
import Event from './event';

class Contract {
    constructor() {
        this.metadata = this.getMetadata();

        this.options = {
            view: '',
            defaultView: 'text',
            currentPage: 1,
            selectedAnnotation: 0
        };

        Event.subscribe('route:location', view=> {
            this.setView(view);
            debug('contract : subscribe: route:location', view);
        });
    }

    getMetadata() {
        return Config.contract.metadata;
    }

    getAnnotations() {
        return Config.contract.annotations;
    }

    getViewName(routeName) {
        var name = routeName.replace('/', '').split('/')[0];
        if (name == '') {
            return this.options.defaultView;
        }

        return name;
    }

    setView(view) {
        this.options.view = view;
    }

    getView() {
        return this.options.view == '' ? this.options.defaultView : this.options.view;
    }

    getID() {
        return this.metadata.id;
    }

    getGuid() {
        return this.metadata.open_contracting_id;
    }

    getSummaryUrl() {
        return Config.APP_URL + 'contract/' + this.getGuid();
    }

    getAllPageUrl() {
        return Config.ES_URL + "contract/" + this.getGuid() + "/text";
    }

    getAllAnnotationsUrl() {
        return Config.ES_URL + "contract/" + this.getGuid() + "/annotations";
    }

    getSearchUrl() {
        return Config.ES_URL + "contract/" + this.getGuid() + "/searchtext"
    }

    getTotalPages() {
        return this.metadata.number_of_pages;
    }

    setSelectedAnnotation(annotation_id) {
        this.options.selectedAnnotation = annotation_id;
    }

    resetSelectedAnnotation() {
        this.options.selectedAnnotation = 0;
    }

    getSelectedAnnotation() {
        return this.options.selectedAnnotation;
    }

    trigger(what, data) {
        Event.publish(what, data);
        debug('contract trigger ' + what, data);
    }

    getBoxPosition(geo) {
        var canvas = $('.pdf-annotator').find('canvas').first();
        geo.width = geo.width * canvas.width();
        geo.height = geo.height * canvas.height();
        geo.x = geo.x * canvas.width();
        geo.y = geo.y * canvas.height();
        return geo;
    }

    getSearchQuery() {
        var hash = window.location.hash;
        var query = '';

        if (hash != '' && typeof hash.split('search/')[1] !== 'undefined') {
            query = hash.split('search/')[1];
        }

        return query;
    }

    showPopup(id) {
        if (this.getView() == 'pdf') {
            this.showPdfAnnotationPopup(id);
        }

        if (this.getView() == 'text') {
            this.showTextAnnotationPopup(id);
        }
    }

    showPdfAnnotationPopup(id) {
        if (this.isPdfLoaded() == false) {
            return true;
        }
        var wrapperEl = $('.pdf-annotator');
        wrapperEl.find('.annotator-viewer').addClass('annotator-hide');
        var annotators = this.getAnnotatorInstance().content.data('annotator').dumpAnnotations();
        var self = this;
        annotators.map(function (annotation, i) {
            if (annotation.id == id) {
                var geo = self.getBoxPosition(annotation.shapes[0].geometry);
                var position = {top: (geo.y + geo.height / 2), left: (geo.x + geo.width / 2)};
                setTimeout(function () {
                    wrapperEl.animate({
                        scrollTop: position.top - 200
                    }, 'fast')
                }(position, wrapperEl), 300);
                wrapperEl.annotator().annotator('showViewer', [annotation], position);
            }
        });
    }

    showTextAnnotationPopup(id) {
        var wrapperEl = $('.text-annotator');
        wrapperEl.find('.annotator-viewer').addClass('annotator-hide');
        wrapperEl.find('.annotator-hl').each(function (i, a) {
            var a = $(a);
            var annotation = a.data('annotation');
            if (annotation.id == id) {
                var position = a.position();
                setTimeout(function () {
                    wrapperEl.animate({
                        scrollTop: position.top - 200
                    }, 'fast')
                }(position, wrapperEl), 300);

                position.top = position.top + 15;
                position.left = position.left + a.width() / 2;
                wrapperEl.annotator().annotator('showViewer', [annotation], position);
            }
        })
    }
}

export default new Contract();

