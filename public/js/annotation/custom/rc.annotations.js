var MyAnnotation = Backbone.Model.extend();
var MyAnnotationCollection = Backbone.Collection.extend({
    model: MyAnnotation,
});
var AnnotationItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'annotation-item',
    events: {
        "click a": "changePage",
        "click .pin-it": "pinAnnotation"
    },
    initialize: function(options) {
        this.contractModel = options.contractModel;
        this.eventsPipe = options.eventsPipe;
        this.template = _.template($("#annotation-item-template").html());
    },
    render: function() {
        this.$el.html(this.template({quote: this.model.get('quote'), page: this.model.get('page'), text: this.model.get('text')}));
        // this.$el.html('<button class="pinIt">Pin</button> <a href="#">' + this.model.get('quote') + '</a>[Page ' + this.model.get('page') + ']<br><p>' + this.model.get('text') + '</p>');
        return this;
    },
    changePage: function(e) {
        e.preventDefault();
        this.eventsPipe.trigger("page-change", this.model.get('page'));
    },
    pinAnnotation: function() {
        var pinModel = new PinModel({
            pintext: this.model.get('quote') + " | " + this.model.get('text'),
            contract_title: this.contractModel.get("metadata")["contract_name"],
            contract_id: this.contractModel.get("id"),
            page_url: "",
            date: new Date()        
        });
        this.eventsPipe.trigger("pin-annotation", pinModel);
    }
});
var AnnotationsListView = Backbone.View.extend({
    initialize: function(options) {
        this.contractModel = options.contractModel;
        this.eventsPipe = options.eventsPipe;
    },
    render: function() {
        var self = this;
        this.collection.each(function(annotation) {
            self.$el.append(new AnnotationItemView({
                        model: annotation,
                        eventsPipe: self.eventsPipe,
                        contractModel: self.contractModel
                    }).render().$el
            );
        })
        return this;
    },
    toggle: function() {
        this.$el.toggle();
    }
});
var AnnotationsButtonView = Backbone.View.extend({
    events: {
        'click': 'toggle'
    },
    initialize: function(options) {
        this.annotationsListView = options.annotationsListView;
    },
    toggle: function(e) {
        e.preventDefault();
        this.annotationsListView.toggle();
    },
});