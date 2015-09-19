var PdfPage = Backbone.Model.extend({
    defaults: {
        content: ""
    },
    initialize: function(options) {
        var self = this;
        this.contractApp = options.contractApp;
        this.contractApp.on("change:page_no", function() {
            if (self.contractApp.getView() === "pdf") {
                //load pdf if only in pdfview
                self.loadPdf();
            }
        });
    },
    fetchBlob: function(uri, callback) {
        if (this.xhr && this.xhr.readystate != 4) {
            //if the users clicks pagination quickly, abort previous ajax calls.
            this.xhr.abort();
        }
        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', uri, true);
        this.xhr.responseType = 'blob';
        this.xhr.onload = function(e) {
            if (this.status == 200) {
                var blob = new Blob([this.response], {
                    type: 'application/pdf'
                });
                var url = URL.createObjectURL(blob);
                if (callback) {
                    callback(url);
                }
            }
        }
        this.xhr.send();
    },
    loadPdf: function() {
        var self = this;
        self.set({
            content: ""
        });
        if (this.contractApp.getPdfUrl() !== "") {
            this.fetchBlob(this.contractApp.getPdfUrl(), function(blob) {
                self.set({
                    content: blob
                });
            });
        } else {
            self.set({
                content: false
            });
        }
    },
});