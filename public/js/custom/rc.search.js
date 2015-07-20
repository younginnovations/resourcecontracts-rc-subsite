var SearchResult = Backbone.Model.extend({});
var SearchResultCollection = Backbone.Collection.extend({
    model: SearchResult,
    initialize: function(options) {
        this.eventsPipe = options.eventsPipe;
    },
    getSearchTerm: function() {
        return this.searchTerm;
    },
    fetch: function(options, callback) {
        this.searchTerm = options.searchTerm;
        var self = this;
        $.ajax({
            url: options.url,
            postType: 'JSON',
            type: "POST",
            data: {
                'q': options.searchTerm
            },
            async: true,
        }).done(function(response) {
            self.destroy();
            $.each(response, function(index, result) {
                self.add({
                    text: result.text,
                    pageNumber: result.page_no
                });
            });
            self.eventsPipe.trigger('searchresults-collected');
        });
    },
    destroy: function() {
        var self = this;
        this.forEach(function(model) {
            self.remove(model);
        });
    }
});
var SearchResultView = Backbone.View.extend({
    tagName: 'p',
    initialize: function(options) {
        this.eventsPipe = options.eventsPipe;
        this.options = options;
        return this;
    },
    events: {
        "click a": "changePage"
    },
    render: function() {
        this.$el.html('<a href="#">' + this.model.get('text') + '</a> [Page ' + this.model.get('pageNumber') + ']');
        return this;
    },
    changePage: function(e) {
        e.preventDefault();
        this.eventsPipe.trigger("page-change", this.model.get('pageNumber'));
        this.eventsPipe.trigger("page-scroll-pagination");
        this.eventsPipe.trigger('searchresults-hightlight', this.options.searchTerm);
    }
});
var SearchResultListView = Backbone.View.extend({
    tagName: 'div',
    className: 'results',
    events: {
        'click .search-cancel': "close"
    },
    initialize: function(options) {
        this.eventsPipe = options.eventsPipe;
        this.eventsPipe.on('searchresults-collected', this.render, this);
        this.eventsPipe.on('search-results-cached-show', this.toggleSearchResults, this);
        this.eventsPipe.on('search-start', this.showSearchLoad, this);
        this.options = options;
        return this;
    },
    toggleSearchResults: function() {
        this.$el.toggle();
        if (this.$el.is(":hidden")) {
            $(this.options.searchOverlayLayer).show();
        } else {
            $(this.options.searchOverlayLayer).hide();
        }
    },
    showSearchLoad: function() {
        this.$el.show();
        $(this.options.searchOverlayLayer).hide();
        this.$el.html('Searching... please wait');
        return this;
    },
    dataCollected: function() {
        this.render();
    },
    render: function() {
        var self = this;
        this.$el.show();
        this.$el.html('');
        $(this.options.searchOverlayLayer).hide();
        self.$el.append("<a href='#' class='pull-right search-cancel'><i class='glyphicon glyphicon-remove'></i></a>");
        if (this.collection.length) {
            self.$el.append("<p>Total " + this.collection.length + " result(s) found.</p>");
            this.options.collection.each(function(searchResult) {
                var searchResultView = new SearchResultView({
                    model: searchResult,
                    searchTerm: self.collection.getSearchTerm(),
                    eventsPipe: self.eventsPipe
                });
                self.$el.append(searchResultView.render().$el);
            });
        } else {
            self.$el.append('<h4>Result not found</h4>');
        }
        return this;
    },
    close: function(e) {
        this.eventsPipe.trigger('searchresults-hightlight', '');
        e.preventDefault();
        this.$el.hide();
        $(this.options.searchOverlayLayer).show();
    }
});
var SearchFormView = Backbone.View.extend({
    events: {
        "click input[type=submit]": "doSearch",
        "click a#search-results-cache": "showSearchResults"
    },
    initialize: function(options) {
        this.eventsPipe = options.eventsPipe;
        this.url = options.url;
        this.bind('doSearch', this.doSearch, this);
    },
    doSearch: function(e) {
        e.preventDefault();
        this.eventsPipe.trigger('search-start');
        $("#search-results-cache").show();
        //https://stackoverflow.com/questions/10858935/cleanest-way-to-destroy-every-model-in-a-collection-in-backbone/22024432#22024432
        _.each(_.clone(this.collection.models), function(model) {
            model.destroy();
        });
        this.collection.fetch({
            "url": this.url,
            "searchTerm": this.$('#textfield').val()
        });
    },
    showSearchResults: function() {
        this.eventsPipe.trigger('search-results-cached-show');
    }
});
var SearchMultipleContractFormView = Backbone.View.extend({
    events: {
        "click input[type=submit]": "doSearch",
        "click a#search-results-cache": "showSearchResults"
    },
    initialize: function(options) {
        this.events1Pipe = options.events1Pipe;
        this.events2Pipe = options.events2Pipe;
        this.options = options;
        this.bind('doSearch', this.doSearch, this);
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    doSearch: function(e) {
        e.preventDefault();
        $("#search-results-cache").show();
        this.options.collectionLeft.destroy();
        var self = this;
        this.options.collectionLeft.fetch({
            "url": app_url + "/contract/" + self.options.contractIdLeft + "/search",
            "searchTerm": this.$('#textfield').val()
        });
        this.options.collectionRight.destroy();
        this.options.collectionRight.fetch({
            "url": app_url + "/contract/" + self.options.contractIdRight + "/search",
            "searchTerm": this.$('#textfield').val()
        });
    },
    showSearchResults: function(e) {
        e.preventDefault();
        this.events1Pipe.trigger('search-results-cached-show');
        this.events2Pipe.trigger('search-results-cached-show');
    }    
});