export const loading_image = APP_URL + "/images/loading.gif";

export const getHashPage = () => {
    let hash = window.location.hash;
    if (hash == '') {
        return 0;
    }
    hash = hash.split('page');
    let page = hash[1];
    let re = new RegExp('/', 'g');
    page = page.replace(re, '');
    return isNaN(page) ? 0 : parseInt(page);
};

export const setPageHash = (page) => {
    window.location.hash = '#/page/' + page;
}

export const lang = (key, defaultValue) => {
    return typeof lang_category[key] != 'undefined' ? lang_category[key] : defaultValue;
};
