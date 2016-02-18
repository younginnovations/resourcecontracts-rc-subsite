$.fn.editable.defaults.mode = 'inline';
$(document).ready(function() {
    $('#content').on('shown', function(e, editable) {
        editable.input.$input.summernote({
            minHeight : 700,
            focus: true
        });
        editable.input.$input.code($(this).html());
    });

    $('#title').editable({
        type: 'text',
        pk: pk_name,
        url: api_url,
        title: 'Enter title',
        validate: function(v) {
            if(!v) return 'Required field!';
        }
    });
    $('#content').editable({
        type: 'wysihtml5',
        escape:false,
        pk: pk_name,
        url: api_url,
        title: 'Enter Content',
        rows: 40,
        validate: function(v) {
            if(!v) return 'Required field!';
        }
    });
});