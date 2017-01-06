import Config from './config';
import Event from './event';

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
            isSearch: false
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

    setPageNumber(route) {
        route = route.split('annotation');
        var annotation_id = route[1] || '';
        annotation_id = annotation_id.replace('/', '');
        this.setCurrentAnnotation(annotation_id);

        route = route[0];
        var reg = /pdf\/page\/(.*?)\/(?:\s|$)/g;
        var match = reg.exec(route);
        if (match !== null) {
            this.setCurrentPage(parseInt(match[1]));
            return true;
        }

        reg = /text\/page\/(.*?)\/(?:\s|$)/g;
        match = reg.exec(route);

        if (match !== null) {
            this.setCurrentPage(parseInt(match[1]));
            return true;
        }

        return false;
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
        const canvas = $('.pdf-wrapper #pdf-' + this.getCurrentPage() + ' .imageWrapper');
        const con_geo = {};
        con_geo.width = geo.width * canvas.width();
        con_geo.height = geo.height * canvas.height();
        con_geo.x = geo.x * canvas.width();
        con_geo.y = geo.y * canvas.height();
        return con_geo;
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
            id = this.getCurrentAnnotation();
            if (id == '') {
                return;
            }
        }

        if (this.getView() == 'pdf') {
            setTimeout(() => {
                this.showPdfAnnotationPopup(id);
            }, 300);
        }

        if (this.getView() == 'text') {
            setTimeout(()=> {
                this.showTextAnnotationPopup(id);
            }, 300);
        }
    }

    showPdfAnnotationPopup(id) {
        const wrapperEl = $('.pdf-annotator');
        wrapperEl.find('.annotator-viewer').addClass('annotator-hide');

        const annotators = this.getAnnotations().result;
        annotators.forEach((annotation, i) => {
            console.log(this.getCurrentPage());
            if (annotation.id == id && annotation.page_no == this.getCurrentPage()) {
                let geo = annotation.shapes[0].geometry;
                geo = this.getBoxPosition(geo);
                const position = {top: (geo.y + geo.height / 2), left: (geo.x + geo.width / 2)};
                setTimeout(function () {
                    wrapperEl.animate({
                        scrollTop: position.top - 200
                    }, 'fast')
                }(position, wrapperEl), 300);
                $('#pdf-' + this.getCurrentPage() + ' .imageWrapper').annotator().annotator('showViewer', [annotation], position);
            }
        });
    }

    showTextAnnotationPopup(id) {
        if (isNaN(id)) {
            return;
        }
        const wrapperEl = $('.text-annotator');
        wrapperEl.find('.annotator-viewer').addClass('annotator-hide');
        console.log(wrapperEl.find('.annotator-hl'));
        wrapperEl.find('.annotator-hl').each((i, a) => {
            a = $(a);
            const annotation = a.data('annotation');
            if (annotation.id == id && annotation.page_no == this.getCurrentPage()) {
                const position = a.position();
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