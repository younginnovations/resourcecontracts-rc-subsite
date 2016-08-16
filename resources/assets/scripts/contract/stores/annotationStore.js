import Reflux from 'reflux';
import HTTP from '../services/httpService';
import AnnotationActions from '../actions/annotationAction';
import Contract from '../contract';

var AnnotationStore = Reflux.createStore({
    listenables: [AnnotationActions],
    getList: function () {
        this.trigger('annotations:loaded', Contract.getAnnotations());
    }
});

export default AnnotationStore;
