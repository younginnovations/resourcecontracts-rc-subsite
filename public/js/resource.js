/*  backbone-fetch-cache v1.5.5 (2014-12-22)
  by MadGlory <hello@madglory.com> (http://madglory.com) - https://github.com/madglory/backbone-fetch-cache.git
 */
!function(a,b){"function"==typeof define&&define.amd?define(["underscore","backbone","../../../../public/js/lib/jquery"],function(_,Backbone,c){return a.Backbone=b(_,Backbone,c)}):"undefined"!=typeof exports&&"undefined"!=typeof require?module.exports=b(require("underscore"),require("backbone"),require("jquery")):a.Backbone=b(a._,a.Backbone,a.jQuery)}(this,function(_,Backbone,a){function b(b,c){if(b&&_.isObject(b)){if(_.isFunction(b.getCacheKey))return b.getCacheKey(c);b=c&&c.url?c.url:_.isFunction(b.url)?b.url():b.url}else if(_.isFunction(b))return b(c);return c&&c.data?"string"==typeof c.data?b+"?"+c.data:b+"?"+a.param(c.data):b}function c(a,b,c){b=b||{};var d=Backbone.fetchCache.getCacheKey(a,b),e=!1,f=b.lastSync||(new Date).getTime(),g=!1;d&&b.cache!==!1&&(b.cache||b.prefill)&&(b.expires!==!1&&(e=(new Date).getTime()+1e3*(b.expires||300)),b.prefillExpires!==!1&&(g=(new Date).getTime()+1e3*(b.prefillExpires||300)),Backbone.fetchCache._cache[d]={expires:e,lastSync:f,prefillExpires:g,value:c},Backbone.fetchCache.setLocalStorage())}function d(a,c){return _.isFunction(a)?a=a():a&&_.isObject(a)&&(a=b(a,c)),Backbone.fetchCache._cache[a]}function e(a){return d(a).lastSync}function f(a,c){_.isFunction(a)?a=a():a&&_.isObject(a)&&(a=b(a,c)),delete Backbone.fetchCache._cache[a],Backbone.fetchCache.setLocalStorage()}function g(){if(k&&Backbone.fetchCache.localStorage)try{localStorage.setItem(Backbone.fetchCache.getLocalStorageKey(),JSON.stringify(Backbone.fetchCache._cache))}catch(a){var b=a.code||a.number||a.message;if(22!==b&&1014!==b)throw a;this._deleteCacheWithPriority()}}function h(){if(k&&Backbone.fetchCache.localStorage){var a=localStorage.getItem(Backbone.fetchCache.getLocalStorageKey())||"{}";Backbone.fetchCache._cache=JSON.parse(a)}}function i(a){return window.setTimeout(a,0)}var j={modelFetch:Backbone.Model.prototype.fetch,modelSync:Backbone.Model.prototype.sync,collectionFetch:Backbone.Collection.prototype.fetch},k=function(){var a="undefined"!=typeof window.localStorage;if(a)try{localStorage.setItem("test_support","test_support"),localStorage.removeItem("test_support")}catch(b){a=!1}return a}();return Backbone.fetchCache=Backbone.fetchCache||{},Backbone.fetchCache._cache=Backbone.fetchCache._cache||{},Backbone.fetchCache.enabled=!0,Backbone.fetchCache.priorityFn=function(a,b){return a&&a.expires&&b&&b.expires?a.expires-b.expires:a},Backbone.fetchCache._prioritize=function(){var a=_.values(this._cache).sort(this.priorityFn),b=_.indexOf(_.values(this._cache),a[0]);return _.keys(this._cache)[b]},Backbone.fetchCache._deleteCacheWithPriority=function(){Backbone.fetchCache._cache[this._prioritize()]=null,delete Backbone.fetchCache._cache[this._prioritize()],Backbone.fetchCache.setLocalStorage()},Backbone.fetchCache.getLocalStorageKey=function(){return"backboneCache"},"undefined"==typeof Backbone.fetchCache.localStorage&&(Backbone.fetchCache.localStorage=!0),Backbone.Model.prototype.fetch=function(b){function c(){return b.prefill&&(!b.prefillExpires||k)}function e(){b.parse&&(l=n.parse(l,b)),n.set(l,b),_.isFunction(b.prefillSuccess)&&b.prefillSuccess(n,l,b),n.trigger("cachesync",n,l,b),n.trigger("sync",n,l,b),c()?m.notify(n):(_.isFunction(b.success)&&b.success(n,l,b),m.resolve(n))}if(!Backbone.fetchCache.enabled)return j.modelFetch.apply(this,arguments);b=_.defaults(b||{},{parse:!0});var f=Backbone.fetchCache.getCacheKey(this,b),g=d(f),h=!1,k=!1,l=!1,m=new a.Deferred,n=this;if(g&&(h=g.expires,h=h&&g.expires<(new Date).getTime(),k=g.prefillExpires,k=k&&g.prefillExpires<(new Date).getTime(),l=g.value),!h&&(b.cache||b.prefill)&&l&&(null==b.async&&(b.async=!0),b.async?i(e):e(),!c()))return m;var o=j.modelFetch.apply(this,arguments);return o.done(_.bind(m.resolve,this,this)).done(_.bind(Backbone.fetchCache.setCache,null,this,b)).fail(_.bind(m.reject,this,this)),m.abort=o.abort,m},Backbone.Model.prototype.sync=function(a,b,c){if("read"===a||!Backbone.fetchCache.enabled)return j.modelSync.apply(this,arguments);var d,e,g=b.collection,h=[];for(h.push(Backbone.fetchCache.getCacheKey(b,c)),g&&h.push(Backbone.fetchCache.getCacheKey(g)),d=0,e=h.length;e>d;d++)f(h[d]);return j.modelSync.apply(this,arguments)},Backbone.Collection.prototype.fetch=function(b){function c(){return b.prefill&&(!b.prefillExpires||k)}function e(){n[b.reset?"reset":"set"](l,b),_.isFunction(b.prefillSuccess)&&b.prefillSuccess(n),n.trigger("cachesync",n,l,b),n.trigger("sync",n,l,b),c()?m.notify(n):(_.isFunction(b.success)&&b.success(n,l,b),m.resolve(n))}if(!Backbone.fetchCache.enabled)return j.collectionFetch.apply(this,arguments);b=_.defaults(b||{},{parse:!0});var f=Backbone.fetchCache.getCacheKey(this,b),g=d(f),h=!1,k=!1,l=!1,m=new a.Deferred,n=this;if(g&&(h=g.expires,h=h&&g.expires<(new Date).getTime(),k=g.prefillExpires,k=k&&g.prefillExpires<(new Date).getTime(),l=g.value),!h&&(b.cache||b.prefill)&&l&&(null==b.async&&(b.async=!0),b.async?i(e):e(),!c()))return m;var o=j.collectionFetch.apply(this,arguments);return o.done(_.bind(m.resolve,this,this)).done(_.bind(Backbone.fetchCache.setCache,null,this,b)).fail(_.bind(m.reject,this,this)),m.abort=o.abort,m},h(),Backbone.fetchCache._superMethods=j,Backbone.fetchCache.setCache=c,Backbone.fetchCache.getCache=d,Backbone.fetchCache.getCacheKey=b,Backbone.fetchCache.getLastSync=e,Backbone.fetchCache.clearItem=f,Backbone.fetchCache.setLocalStorage=g,Backbone.fetchCache.getLocalStorage=h,Backbone});
$.ajaxSetup({cache: true});

var ResourceModel = Backbone.Model.extend();

var FilterCollection = Backbone.Collection.extend({
    model: ResourceModel,
    initialize: function () {
        // Default sort field and direction
        this.sortField = "name";
        this.sortDirection = "ASC";
    },

    setSortField: function (field, direction) {
        this.sortField = field;
        this.sortDirection = direction;
    },

    comparator: function (m) {
        return m.get(this.sortField);
    },

    // Overriding sortBy (copied from underscore and just swapping left and right for reverse sort)
    sortBy: function (iterator, context) {
        var obj = this.models,
            direction = this.sortDirection;

        return _.pluck(_.map(obj, function (value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function (left, right) {
            // swap a and b for reverse sort
            var a = direction === "ASC" ? left.criteria : right.criteria,
                b = direction === "ASC" ? right.criteria : left.criteria;

            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index < right.index ? -1 : 1;
        }), 'value');
    }

});

var ResourceCollection = Backbone.Collection.extend({
    initialize: function (url) {
        this.url = url;
    },
    model: ResourceModel,
    url: this.url,
    search: function (word) {
        var where = 'resource';

        if (typeof word == "undefined" || word == "") return this;

        var pattern = new RegExp(word, "gi");
        return _(this.filter(function (data) {
            return pattern.test(data.get(where));
        }));
    },
    resources: function (search, sort_type) {

        var resources;
        resources = this.search(search);
        resources = new FilterCollection(resources.toArray());

        if (typeof sort_type != 'undefined') {
            resources.setSortField("resource", sort_type.toUpperCase());
            resources.sort();
        }

        var resource = [];
        _.each(resources.models, function (model) {
            resource.push({value: encodeURIComponent(model.get('resource')), name: model.get('resource'), contract: model.get('contract')});
        });

        return resource;
    }
});

var ResourceView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#resource-template').html());
    },
    render: function () {
        this.el = this.template(this.model);
        return this;
    }
});

var ResourceList = Backbone.View.extend({
    initialize: function (option) {
        this.query = option.query;
        this.sort_type = option.sort_type;
        this.collection.on('sort', this.sort, this);
        this.collection.on('search', this.search, this);
        this.collection.on('reset', this.render, this);
    },
    search: function (query) {
        this.query = query;
        this.render();
    },
    sort: function (sort_type) {
        this.sort_type = sort_type;
        this.render();
    },
    render: function () {
        var self = this;
        var countries = this.collection.resources(this.query, this.sort_type, this.resources);
        $(self.el).html('');
        _.each(countries, function (model) {
            $(self.el).append(new ResourceView({
                model: model
            }).render().el);
        });
        return this;
    }
});

var CountryModel = Backbone.Model.extend();
var CountryController = Backbone.Collection.extend({
    initialize: function (url) {
        this.url = url;
    },
    model: CountryModel,
    url: this.url,
    resources: function () {
        var collection = this;
        collection = new FilterCollection(collection.toArray());
        collection.setSortField("name", 'ASC');
        collection.sort();
        var countries = [];
        collection.each(function (model) {
            countries.push({code: model.get('code'), name: model.get('name'), contract: model.get('contract')})
        });
        return countries;
    }
});

var CountryView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#country-template').html());
    },
    render: function () {
        this.el = this.template(this.model);
        return this;
    }
});

var CountryList = Backbone.View.extend({
    initialize: function () {
        this.collection.on('reset', this.render, this);
    },
    render: function () {
        var self = this;
        var resources = this.collection.resources();
        $(self.el).html('');
        _.each(resources, function (model) {
            $(self.el).append(new CountryView({
                model: model
            }).render().el);
        });
        return this;
    }
});

var collection = new ResourceCollection(APP_URL + '/contract/resources');
collection.fetch({reset: true, cache: true, expires: 60000});

var resourceList = new ResourceList({
    el: '#resources',
    sort_type: 'asc',
    collection: collection
}).el;

var rCollection = new CountryController(APP_URL + '/contract/countries');
//rCollection.fetch({reset: true, cache: true, expires: 60000});

rCollection.fetch({'reset': true, cache: true, expires: 60000});



var countryList = new CountryList({
    el: '#countries',
    collection: rCollection
});

$(function () {
    $(document).on('click', '.country', function () {
        var country = [];
        $(".country:checked").each(function () {
            country.push($(this).val());
        });

        collection.url = APP_URL + '/contract/resources?country=' + country.join();
        collection.fetch({'reset': true, cache: true, expires: 60000, success:function(){
            $('#resources').find('.col-lg-4').removeClass('col-lg-4').addClass('col-lg-6');
            $('.side-collapse').css('height', $('#resources').height()+150 + 'px');
        }
        });

    });

    $(document).on('change', '.sort', function (e) {
        e.preventDefault();
        collection.trigger('sort', $(this).val());
    });

    $(document).on('input', '.search', function (e) {
        e.preventDefault();
        collection.trigger('search', $(this).val());
    });
});