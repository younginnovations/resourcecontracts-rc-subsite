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

    getCurrentAnnotation() {
        return parseInt(this.options.currentAnnotation);
    }

    setCurrentAnnotation(id) {
        this.options.currentAnnotation = id;
    }

    setAnnotatorInstance(annotator) {
        return this.options.annotator = annotator;
    }

    getPdfScale() {
        return this.options.pdfScale;
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