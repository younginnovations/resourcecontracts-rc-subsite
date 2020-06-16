import Config from './config';
import Event from './Event';

class Contract {
    constructor() {
        this.options = {
            view: '',
            defaultView: 'pdf',
            currentPage: 1,
            currentAnnotation: null,
            selectedAnnotation: 0,
            pdfScale: 1,
            annotator: {},
            annotations: Config.contract.annotations,
            disablePagination: false,
            isSearch: false,
            searchQueries: []
        };
    }

    getMetadata() {
        return Config.contract.metadata;
    }

    getAnnotations() {
        return this.options.annotations;
    }

    getCurrentPage() {
        return this.options.currentPage;
    }

    setCurrentPage(page) {
        this.options.currentPage = page;
    }

    setIsSearch(bool) {
        this.options.isSearch = bool;
    }

    setSearchQueries(queries) {
        this.options.searchQueries = queries;
    }

    getSearchQueries() {
        return this.options.searchQueries;
    }

    getIsSearch() {
        return this.options.isSearch;
    }

    getCurrentAnnotation() {
        return parseInt(this.options.currentAnnotation);
    }

    setCurrentAnnotation(id) {
        this.options.currentAnnotation = id;
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
        const canvas = $('.pdf-annotator').find('canvas').first();
        const con_geo = {};
        con_geo.width = geo.width * canvas.width();
        con_geo.height = geo.height * canvas.height();
        con_geo.x = geo.x * canvas.width();
        con_geo.y = geo.y * canvas.height();
        return con_geo;
    }

    getSearchQuery() {
        var hash = window.location.hash;
        var query = $('.text-search input').val();

        if (hash != '' && typeof hash.split('search/')[1] !== 'undefined') {
            query = hash.split('search/')[1];
        }

        return query;
    }

    showPopup(id = null) {
        if (id == null) {
            id = this.getCurrentAnnotation();
            if (id == '') {
                return;
            }
        }
        setTimeout(() => {
            this.showPdfAnnotationPopup(id);
        }, 300);
    }
    showPdfAnnotationPopup(id) {
        const wrapperEl = $('.pdf-annotator');
        wrapperEl.find('#pdf-container').addClass('annotator-hide');
        const annotators = this.getAnnotations().result;
        annotators.forEach((annotation, i) => {
            if (annotation.annotation_id == id && typeof annotation.shapes == 'object' && annotation.page_no == this.getCurrentPage()) {
                let geo = annotation.shapes[0].geometry;
                geo = this.getBoxPosition(geo);
                const position = {top: (geo.y + geo.height / 2), left: (geo.x + geo.width / 2)};
                setTimeout(function () {
                    wrapperEl.animate({
                        scrollTop: position.top - 200
                    }, 'fast')
                }(position, wrapperEl), 300);
                wrapperEl.annotator().annotator('showViewer', [annotation], position);
            }
        });
    }
}

export default new Contract();