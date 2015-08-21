var TextEditorView = Backbone.View.extend({
    initialize: function(options) {
        this.listenTo(this.model, "change:text", this.render);
        var self = this;
        if (this.model.get('isReadOnly')) {
            $('#saveButton').hide();
            $('#toolbar').hide();
        } else $('#saveButton').show();
        this.editor = new Quill(this.el, {
            readOnly: this.model.get('isReadOnly')
        });
        var self = this;
        this.editor.on('text-change', function(delta, source) {
            if (source == 'api') {
                //none
            } else if (source == 'user') {
                self.model.set('text', self.editor.getHTML());
            }
        });
        return this;
    },
    render: function() {
        this.editor.setHTML(this.model.get('text'));
        return this;
    },
    getHtmlText: function() {
        return this.editor.getHTML();
    },
});