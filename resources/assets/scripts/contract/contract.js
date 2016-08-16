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
            paginationClick: false
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
        return this.options.currentPage = page;
    }

    setAnnotatorInstance(annotator) {
        return this.options.annotator = annotator;
    }

    setPaginationClick(click) {
        this.options.paginationClick = click;
    }

    isPaginationClick() {
        return this.options.paginationClick;
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

    setPdfPageNumber(route) {
        route = route.split('annotation')[0];
        var reg = /pdf\/page\/(.*?)\/(?:\s|$)/g;
        var match = reg.exec(route);

        if (match !== null) {
            console.log(match);
            this.setCurrentPage(parseInt(match[1]));
        }
        console.log(this.getCurrentPage());
    }

    setPdfScale(scale) {
        this.options.pdfScale = scale;
    }

    getPdfScale() {
        return this.options.pdfScale;
    }

    setView(view) {
        this.options.view = view;
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
        var wrapperEl = $('.pdf-annotator');
        wrapperEl.find('.annotator-viewer').addClass('annotator-hide');
        var annotators = this.getAnnotations().result;
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

