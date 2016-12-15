var Config = config;

Config.facebookUrl = ()=> {
    return config.share.facebook + encodeURIComponent(window.location.href);
};
Config.twitterUrl = ()=> {
    return config.share.twitter;
};

Config.googleUrl = ()=> {
    return config.share.google + encodeURIComponent(window.location.href);
};

Config.appUrl = (uri)=> {
    return config.APP_URL + '/' + uri.trim('/');
};


export default Config;
