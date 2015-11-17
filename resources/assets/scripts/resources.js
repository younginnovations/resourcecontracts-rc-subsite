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