import Reflux from 'reflux';
import HTTP from '../services/httpService';
import SearchAction from '../actions/searchAction';

var SearchStore = Reflux.createStore({
    listenables: [SearchAction],
    getResults: function (id, query) {
        HTTP.get('contract/' + id + '/searchtext?q=' + query)
            .then(response=> {
                this.trigger('text:loaded', response)
            });
    }
});

export default SearchStore;
