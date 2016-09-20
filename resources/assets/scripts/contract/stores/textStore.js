import Reflux from 'reflux';
import HTTP from '../services/httpService';
import TextAction from '../actions/textAction';

var TextStore = Reflux.createStore({
    listenables: [TextAction],
    getPages: function (id) {
        HTTP.get('contract/' + id + '/text')
            .then(response=> {
                this.trigger('text:loaded', response)
            });
    }
});

export default TextStore;
