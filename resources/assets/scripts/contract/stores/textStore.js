import Reflux from 'reflux';
import HTTP from '../services/httpService';
import TextAction from '../actions/textAction';
let pdfText = [];
let TextStore = Reflux.createStore({
    listenables: [TextAction],
    getPages: function (id) {
      if (pdfText.length == 0) {
            HTTP.get('contract/' + id + '/text')
                .then(response=> {
                    pdfText = response;
                    this.trigger('text:loaded', response)
                });
        } else {
            this.trigger('text:loaded', pdfText)
        }
    }
});

export default TextStore;
