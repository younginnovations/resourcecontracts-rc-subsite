var PinModel = Backbone.Model.extend({});
var PinCollection = Backbone.Collection.extend({
    model: PinModel,
    localStorage: new Backbone.LocalStorage("annotation-pin-collection")
});

var AnnotationView = Backbone.View.extend({
    events: {
        'click .pin-annotation-category': 'pinAnnotation',
    },
    initialize: function(options) {
        this.options = options;
        _.bindAll(this, 'pinAnnotation');
    },

    pinAnnotation: function(ev) {
        var category = $(ev.currentTarget).data('category');
        var d = new Date();
        var text = $(ev.currentTarget).parent().parent().find('.annotation-text').text().trim();
        if (text.toString().trim()) {
            var pin = new PinModel({added_datetime: d.toString(),text: text.toString(),category: category.toString().trim(),contract_title: this.options.contract_title,contract_id: this.options.contract_id,page_url: this.options.page_url});
            this.collection.add(pin);
            pin.save();
            toastr.success(category.toString().trim()+' pinned successfully.');
        }
    },
});