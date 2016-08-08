import Contract from '../contract';
import {nl2br, _lc} from '../helper';
class Loader {
    constructor(el) {
        this.el = el;
    }

    init() {
        this.content = $(this.el).annotator({
            readOnly: true
        });
        this.content.data('annotator').setupAnnotation = (annotation) => {
            if (annotation.ranges !== undefined || $.isEmptyObject(annotation)) {
                return this.content.data('annotator').__proto__.setupAnnotation.call(this.content.data('annotator'), annotation);
            }
        };

        this.content.annotator('addPlugin', 'AnnotatorEvents');
        this.content.annotator('addPlugin', 'AnnotatorNRGIViewer');
        this.content.data('annotator').plugins.AnnotatorEvents.contract = Contract;
        this.content.data('annotator').plugins.AnnotatorNRGIViewer.contract = Contract;
        this.content.data('annotator').plugins.AnnotatorNRGIViewer.nl2br = nl2br;
        this.content.data('annotator').plugins.AnnotatorNRGIViewer._lc = _lc;

        this.setupStore();
    }

    setupStore() {
        var store_url = Contract.getAllAnnotationsUrl();
        this.content.annotator('addPlugin', 'Store', {
            prefix: store_url,
            loadFromSearch: true
        });
    }
}

export default Loader;
