var MetadataView = Backbone.View.extend({
    initialize: function(options) {
        this.options = options;
    },
    render: function() {
        var that = this;
        var template = _.template($('#metadata-view-template').html());
        this.$el.append(template(this.options.metadata));
        return this;
    },
    toggle: function() {
        $(this.el).toggle();
    }
});
var MetadataButtonView = Backbone.View.extend({
    events: {
        'click': 'toggle'
    },
    initialize: function(options) {
        this.eventsPipe = options.eventsPipe;
        this.metadataView = options.metadataView;
        this.eventsPipe.on('close-metadatapopup', this.close, this);
        return this;
    },
    close: function() {
        this.metadataView.$el.hide();
        $('.annotation-title').parent().removeClass('annotation-static-block');
    },
    toggle: function(e) {
        e.preventDefault();
        this.eventsPipe.trigger('close-pinpopup');
        $('.annotation-title').parent().toggleClass('annotation-static-block');
        this.metadataView.toggle();
    },
});