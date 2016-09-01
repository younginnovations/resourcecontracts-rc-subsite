var ClipLocal = Backbone.Model.extend({
    url: ''
});

var ClipLocalCollection = Backbone.Collection.extend({
    model: ClipLocal,
    localStorage: new Backbone.LocalStorage("clipCollection")
});