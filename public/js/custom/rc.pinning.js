var PinModel = Backbone.Model.extend({});
var PinCollection = Backbone.Collection.extend({
    model: PinModel,
    localStorage: new Backbone.LocalStorage("pincollection"),
    initialize: function() {
    },
    byContract: function (contract) {
        var self = this;
        var filtered = self.filter(function (model) {
            return model.get("contract_id") === contract;
        });
        return new PinCollection(filtered);
    }
});
var PinView = Backbone.View.extend({
    tagName: 'div',
    className: 'pin',
    events: {
        'click .removePin': 'removePin'
    },
    initialize: function() {
        this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
        var template = _.template($("#pin-template").html());
        this.$el.html(template(this.model.toJSON()));
        return this;
    },
    removePin: function() {
        this.model.destroy();
    }
});
var PinListView = Backbone.View.extend({
    events: {
        'click .exportPins': 'exportPins',
        'click .removeAllPins': 'removeAllPins'
    },
    initialize: function(options) {
        this.eventsPipe = options.eventsPipe;
        _.bindAll(this, 'addOne');
        this.collection.bind('add remove', this.showNoPinsMessage, this);
        this.collection.bind('add', this.onPinAdded, this);
        // this.collection.on('reset', this.addAll, this);
        this.eventsPipe.on('pin-annotation', this.pinAnnotation, this);
        this.showNoPinsMessage();
        $(this.el).html(_.template($('#pin-list-template').html()));
    },
    showNoPinsMessage: function() {
        if (0 === this.collection.length) {
            $(this.el).find('#no-pin-message').html('Please select the text in the editor to pin');
        } else {
            $(this.el).find('#no-pin-message').html('');
        }
    },
    onPinAdded: function(model) {
        this.addOne(model);
    },
    addOne: function(model) {
        var view = new PinView({
            model: model
        });
        $(this.el).find('#pinList').append(view.render().$el);
    },
    addAll: function() {
        var self = this;
        this.collection.each(function(model) {
            self.addOne(model);
        });
    },
    exportPins: function() {
        this.collection.saveToCSV('pins');
    },
    removeAllPins: function() {
        var self = this;
        _.each(_.clone(this.collection.models), function(model) {
            model.destroy();
        });
    },
    pinAnnotation: function(annotationModel) {
        this.collection.add(annotationModel);
        annotationModel.save();
    },
    render: function() {
        this.addAll();
        return this;
    }
});
var PinningEditorView = Backbone.View.extend({
    events: {
        'mouseup': 'getSelectedParagraphText',
    },
    initialize: function(options) {
        this.options = options;
        _.bindAll(this, 'getSelectedParagraphText');
    },
    getSelectedParagraphText: function() {
        var txt = ""
        if (window.getSelection) {
            txt = window.getSelection();
        } else if (document.getSelection) {
            txt = document.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        }
        if (txt.toString().trim()) {
            var pin = new PinModel({
                pintext: txt.toString(),
                contract_title: this.options.contract_title,
                contract_id: this.options.contract_id,
                page_url: this.options.page_url,
                date: new Date()
            });
            this.collection.add(pin);
            pin.save();
        }
    },
});
var PinButtonView = Backbone.View.extend({
    events: {
        'click': 'toggle'
    },
    initialize: function(options) {
        this.eventsPipe = options.eventsPipe;
        this.listenTo(this.collection, 'reset', this.updateTitle);
        this.listenTo(this.collection, 'add', this.updateTitle);
        this.listenTo(this.collection, 'remove', this.updateTitle);
        this.eventsPipe.on('close-pinpopup', this.close, this);
        this.pinListView = options.pinListView;
        return this;
    },
    updateTitle: function() {
        var pinTitle = (this.collection.length) ? "View Pins-" + this.collection.length : "View Pins";
        $(this.el).html(pinTitle);
    },
    close: function() {
        this.pinListView.$el.hide();
        $('.annotation-title').parent().removeClass('annotation-static-block');        
    },
    toggle: function(e) {
        this.eventsPipe.trigger('close-metadatapopup');
        e.preventDefault();
        $('.annotation-title').parent().toggleClass('annotation-static-block');        
        this.pinListView.$el.toggle();
    },
    render: function() {
        this.updateTitle();
    }
});