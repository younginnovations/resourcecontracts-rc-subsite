import Config from '../config';
import 'whatwg-fetch';

class Service {

    constructor() {
        this.apiUrl = Config.ES_URL;
    }

    getRequestUrl(url) {
        return this.apiUrl + url;
    }

    get(url) {
        return fetch(this.getRequestUrl(url)).then(response => response.json());
    }
}

export default new Service;
