var Page = Backbone.Model.extend({
    initialize: function(options) {
        this.options = options;
        this.eventsPipe = options.eventsPipe;
        this.eventsPipe.on("page-load", this.load, this);
        this.eventsPipe.on("searchresults-hightlight", this.setSearchTerm, this);
        this.set('isReadOnly', !this.options.contractModel.canEdit());
        this.set('isAnnotable', this.options.contractModel.canAnnotate());
        this.set('pageNumber', this.options.pageNumber);
        return this;
    },
    defaults: function() {
        return {
            pageNumber: 1,
            text: 'Loading!',
        }
    },
    load: function(page) {
        this.set("pageNumber", page);
        var self = this;
        $.ajax({
            url: self.options.loadUrl,
            data: 'page=' + page,
            type: 'GET',
            async: true,
            success: function(response) {
                self.set('text', response.text);
                self.set('pdf_url', response.pdf_url);
                if (self.searchTerm) {
                    self.highLightText(self.searchTerm);
                }
            }
        });
        return this;
    },
    setNextPage: function() {
        this.set("pageNumber", 1 + parseInt(this.get('pageNumber')));
        this.load(this.get("pageNumber"));
        this.eventsPipe.trigger('page-scroll-pagination')
    },
    setSearchTerm: function(searchTerm) {
        this.searchTerm = searchTerm;
    },
    highLightText: function(searchTerm) {
        var regex = new RegExp(searchTerm, "gi");
        this.set('text', this.get('text').replace(regex, function(matched) {
            return "<span style='background-color: rgba(80,80,80,0.5);'>" + matched + "</span>";
        }));
    }
});