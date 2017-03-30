import Config from './config';

export const nl2br = function (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
};

export const isSite = function (type) {
    return (type == config.siteKey);
};

export const transCategory = function (key, fallback) {
    var lang_categories = Config.lang_categories;
    return typeof lang_categories[key] != 'undefined' ? lang_categories[key] : fallback;
};

export const truncate = function (text, maxLength=10) {
    var words = (text + "").split(" ");
    var ellipsis = "";

    if (words.length > maxLength) {
        ellipsis = " ...";
    }
    words = words.splice(0, maxLength);

    return words.join(" ") + ellipsis;
};

export const getCountryName = function (code) {
    return Config.countryList[code.toUpperCase()];
};

export const sanitizeText = function (text) {
    //replace the <  and > with &lt;%gt if they are not one of the tags below
    text = text.replace(/(<)(\/?)(?=span|div|br|p)([^>]*)(>)/g, "----lt----$2$3----gt----");
    text = text.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    text = text.replace(/----lt----/g, "<");
    text = text.replace(/----gt----/g, ">");
    return text;
};

export const highlightText = function (text, highlight) {
    highlight = decodeURI(highlight);
    var re = new RegExp("(" + highlight + ")", "gi");
    return text.replace(re, "<span class='search-highlight-word'>$1</span>");
};

export const scrollToAnnotation = function (annotation_id) {
    var annotationEl = $('.p-' + annotation_id);
    if (annotationEl.length < 1) {
        return false;
    }

    if (window.matchMedia("(max-width: 800px)").matches) {
        setTimeout(()=> {
            var pageOffsetTop = annotationEl.offset().top - 125;
            $('html, body').animate({scrollTop: pageOffsetTop}, 300);
        }, 200);
    }else{
        setTimeout(()=> {
            var pageOffsetTop = annotationEl.offset().top;
            var parentTop = $('.annotation-inner-viewer').scrollTop();
            var parentOffsetTop = $('.annotation-inner-viewer').offset().top;
            var vTop = parentTop - parentOffsetTop + pageOffsetTop - 5;
            $('.annotation-inner-viewer').animate({scrollTop: vTop}, 300);
        }, 200);

    }
};

