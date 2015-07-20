var AnnotatorjsView = Backbone.View.extend({
    initialize: function(options) {
        this.options = options;
        this.api = options.api;
        this.listenTo(this.options.pageModel, "change:text", this.pageUpdated);
        // this.bind('pageChange', this.pageUpdated);
        this.content = $(this.options.el).annotator({
            readOnly: !this.options.pageModel.get('isAnnotable')
        });
        this.content.annotator('addPlugin', 'Tags');
        this.content.annotator('addPlugin', 'Categories', {category:[]});

        // this.availableTags = this.options.tags;
        return this;
    },
    pageUpdated: function() {
        var that = this;
        var store = this.content.data('annotator').plugins.Store;
        if (store.annotations) store.annotations = [];
        store.options.loadFromSearch = {
            'url': that.api,
            'contract': that.options.contractModel.get('id'),
            'page': that.options.pageModel.get('pageNumber'),
            'document_page_no': that.options.pageModel.get('pageNumber')
        };
        store.options.annotationData = {
            'url': that.api,
            'contract': that.options.contractModel.get('id'),
            'document_page_no': that.options.pageModel.get('pageNumber'),
            'page_id': that.options.pageModel.get('id')
        }
        store.loadAnnotationsFromSearch(store.options.loadFromSearch)
    },
    render: function() {
        var that = this;
        var page = that.options.pageModel.get('pageNumber');
        if (this.content.data('annotator').plugins.Store) {
            var store = this.content.data('annotator').plugins.Store;
            if (store.annotations) store.annotations = [];
            store.options.loadFromSearch = {
                'url': that.api,
                'contract': that.options.contractModel.get('id'),
                'page': that.options.pageModel.get('pageNumber'),
                'document_page_no': that.options.pageModel.get('pageNumber')
            };
            store.loadAnnotationsFromSearch(store.options.loadFromSearch)
        } else {
            this.content.annotator('addPlugin', 'Store', {
                // The endpoint of the store on your server.
                prefix: app_url + '/annotation',
                // Attach the uri of the current page to all annotations to allow search.
                loadFromSearch: {
                    'url': that.api,
                    'contract': that.options.contractModel.get('id'),
                    'page': that.options.pageModel.get('pageNumber'),
                    'document_page_no': that.options.pageModel.get('pageNumber')
                },
                annotationData: {
                    'url': that.api,
                    'contract': that.options.contractModel.get('id'),
                    'page': that.options.pageModel.get('pageNumber'),
                    // 'document_page_no': that.options.pageModel.get('pageNumber'),
                    'page_id': that.options.pageModel.get('id')
                }
            });
        }
        return this;
    }
});