$.ajaxSetup({cache: true});

var CountryModel = Backbone.Model.extend();

var FilterCountryCollection = Backbone.Collection.extend({
    model: CountryModel,
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

var CountryCollection = Backbone.Collection.extend({
    initialize: function (url) {
        this.url = url;
    },
    model: CountryModel,
    url: this.url,
    search: function (word) {
        var where = 'name';
        var orWhere = 'code';

        if (typeof word == "undefined" || word == "") return this;

        var pattern = new RegExp(word, "gi");
        return _(this.filter(function (data) {
            return pattern.test(data.get(where)) || pattern.test(data.get(orWhere));
        }));
    },
    countries: function (search, sort_type) {

        var countries;
        countries = this.search(search);
        countries = new FilterCountryCollection(countries.toArray());

        if (typeof sort_type != 'undefined') {
            countries.setSortField("name", sort_type.toUpperCase());
            countries.sort();
        }

        var country = [];
        _.each(countries.models, function (model) {
            country.push({code: model.get('code'), name: model.get('name'), contract: model.get('contract')});
        });

        return country;
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
        var countries = this.collection.countries(this.query, this.sort_type, this.resources);
        $(self.el).html('');
        _.each(countries, function (model) {
            $(self.el).append(new CountryView({
                model: model
            }).render().el);
        });
        return this;
    }
});

var ResourceModel = Backbone.Model.extend();
var ResourceController = Backbone.Collection.extend({
    initialize: function (url) {
        this.url = url;
    },
    model: ResourceModel,
    url: this.url,
    resources: function () {
        var resources = this;
        resources =  new FilterCountryCollection(resources.toArray());
        resources.setSortField("resource", 'ASC');
        resources.sort();

        var res = []
        resources.each(function (model) {
            res.push({name: model.get('resource'), value: model.get('resource'), contract: model.get('contract')})
        });
        return res;
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
    initialize: function () {
        this.collection.on('reset', this.render, this);
    },
    render: function () {
        var self = this;
        var resources = this.collection.resources();
        $(self.el).html('');
        _.each(resources, function (model) {
            $(self.el).append(new ResourceView({
                model: model
            }).render().el);
        });
        return this;
    }
});

var collection = new CountryCollection(APP_URL + '/contract/countries');
collection.fetch({reset: true, cache: true, expires: 60000});

var countryList = new CountryList({
    el: '#countries',
    sort_type: 'asc',
    collection: collection
}).el;

var rCollection = new ResourceController(APP_URL + '/contract/resources');
rCollection.fetch({reset: true, cache: true, expires: 60000});

var resourceList = new ResourceList({
    el: '#resources',
    collection: rCollection
});

$(function () {
    $(document).on('click', '.resource', function () {
        var resources = [];
        $(".resource:checked").each(function () {
            resources.push($(this).val());
        });
        collection.url = APP_URL + '/contract/countries?resource=' + resources.join();
        collection.fetch({'reset': true, cache: true, expires: 60000, success:function(){
            $('#countries').find('.col-lg-2').removeClass('col-lg-2').addClass('col-lg-3');
            $('.side-collapse').css('height', $('#countries').height()+150 + 'px');
            if($(window).width() < 1200) {
                $('#countries').find('.col-md-3,.col-md-6').toggleClass('col-md-3').toggleClass('col-md-6');
            }

            if($(window).width() < 992) {
                $('#countries').find('.col-sm-4,.col-sm-6').toggleClass('col-sm-4').toggleClass('col-sm-6');
            }

            if($(window).width() < 768) {
                $('#countries').find('.col-xs-6,.col-xs-12').toggleClass('col-xs-6').toggleClass('col-xs-12');
            }
        }});
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