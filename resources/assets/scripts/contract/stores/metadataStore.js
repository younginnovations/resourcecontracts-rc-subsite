import Reflux from 'reflux';
import HTTP from '../services/httpService';
import MetadataAction from '../actions/metadataAction';
import Contract from '../contract';

var MetadataStore = Reflux.createStore({
    listenables: [MetadataAction],
    getData: function () {
        this.trigger('metadata:loaded', Contract.getMetadata());
    }
});

export default MetadataStore;
