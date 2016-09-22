import Config from './config';
import Event from './event';

class Contract {
    constructor() {
        this.options = {
            view: '',
            defaultView: 'pdf',
            currentPage: 1,
            selectedAnnotation: 0,
            pdfScale: 1,
            annotator: {},
            disablePagination: false
        };
    }

    getMetadata() {
        return Config.contract.metadata;
    }

    getAnnotations() {
        return Config.contract.annotations;
    }

    getCurrentPage() {
        return this.options.currentPage;
    }

    setCurrentPage(page) {
        this.options.currentPage = page;
        this.trigger('pagination:change', page);
    }

    setAnnotatorInstance(annotator) {
        return this.options.annotator = annotator;
    }

    setDisablePagination(boolean) {
        this.options.disablePagination = boolean;
    }

    isDisablePagination() {
        return this.options.disablePagination;
    }

    getAnnotatorInstance() {
        return this.options.annotator;
    }

    getViewName(routeName) {
        var name = routeName.replace('/', '').split('/')[0];
        if (name == '') {
            return this.options.defaultView;
        }

        return name;
    }

    setPageNumber(route) {
        route = route.split('annotation')[0];
        var reg = /pdf\/page\/(.*?)\/(?:\s|$)/g;
        var match = reg.exec(route);
        if (match !== null) {
            this.setCurrentPage(parseInt(match[1]));
        }

        reg = /text\/page\/(.*?)\/(?:\s|$)/g;
        match = reg.exec(route);

        if (match !== null) {
            this.setCurrentPage(parseInt(match[1]));
        }
    }

    setPdfScale(scale) {
        this.options.pdfScale = scale;
    }

    getPdfScale() {
        return this.options.pdfScale;
    }

    setView(view) {
        this.options.view = view;
        this.trigger('route:location', view)
    }

    getView() {
        return this.options.view == '' ? this.options.defaultView : this.options.view;
    }

    getID() {
        return this.getMetadata().id;
    }

    getGuid() {
        return this.getMetadata().open_contracting_id;
    }

    getSummaryUrl() {
        return Config.APP_URL + '/contract/' + this.getGuid();
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
        return this.getMetadata().number_of_pages;
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
        console.log(geo.width, canvas.width(),geo.height, canvas.height());
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

    showPopup(id = null) {
        if (id == null) {
            var hash = window.location.hash;
            if (hash != '' && typeof hash.split('annotation/')[1] !== 'undefined') {
                id = hash.split('annotation/')[1];
            }
            if (id == null) {
                return;
            }
        }

        this.trigger('annotation:highlight', id);

        if (this.getView() == 'pdf') {
            this.showPdfAnnotationPopup(id);
        }

        if (this.getView() == 'text') {
            this.showTextAnnotationPopup(id);
        }
    }

    showPdfAnnotationPopup(id) {
        var wrapperEl = $('.pdf-annotator');
        wrapperEl.find('.annotator-viewer').addClass('annotator-hide');
        var annotators = this.getAnnotations().result;
        annotators.map((annotation, i) => {
            if (annotation.id == id) {
                console.log(annotation);
                var geo = this.getBoxPosition(annotation.shapes[0].geometry);
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