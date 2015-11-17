var PinModel = Backbone.Model.extend({});
var PinCollection = Backbone.Collection.extend({
    model: PinModel,
    localStorage: new Backbone.LocalStorage("pincollection")
});

var AnnotationView = Backbone.View.extend({
    events: {
        'click .pin-annotation': 'pinAnnotation',
    },
    initialize: function(options) {
        this.options = options;
        _.bindAll(this, 'pinAnnotation');
    },

    pinAnnotation: function(ev) {
        var category = $(ev.currentTarget).parent().find('.annotation-category').text().trim()
        console.log(category)
        var d = new Date();
        var text = $(ev.currentTarget).parent().find('.annotation-text').text().trim();
        var preamble = $(ev.currentTarget).parent().find('.annotation-preamle').text().trim();
        console.log(text)
        console.log(preamble)
        var pin = new PinModel({added_datetime: d.toString(),text: text.toString(),category: category.toString().trim(),contract_title: this.options.contract_title,contract_id: this.options.contract_id,page_url: this.options.page_url,preamble:preamble});
        this.collection.add(pin);
        pin.save();
        toastr.success('Pinned successfully.');
    },
});