var DownloadManager = React.createClass({
    getInitialState: function () {
        return {
            clips: [],
            dropdown: false,
            loading: false,
            showShare: false,
            clipKey: null,
            showSharedropdown: null,
            loadingPdf: false
        }
    },
    componentDidMount: function () {
        var self = this;
        var clipkey = window.getCookie('clip_key');
        if (clipkey != '') {
            this.setState({showShare: true, clipKey: clipkey});
        }
        this.props.clipCollection.on('filterData', function (data) {
            self.setState({clips: data});

        });
        $(document).click(function (event) {
            if (!$(event.target).closest('.download-dropdown').length && !$(event.target).is('.download-dropdown')) {
                if ($('.download-dropdown').is(":visible")) {
                    self.setState({dropdown: false});
                    self.setState({showSharedropdown: false});
                }
            }
        });
    },
    handleDownload: function () {
        this.downloadAsCSV(this.state.clips);
    },
    handlePrint: function () {
        this.printClips(this.state.clips);
    },
    handleSave: function () {
        if (this.state.loading) {
            return false;
        }
        var postData = {
            data: window.getClippedData().toString(),
            key: window.getCookie('clip_key')
        };
        this.setState({loading: true});
        var self = this;
        $.ajax({
            type: "POST",
            url: app_url + "/clip/save",
            dataType: 'json',
            data: postData
        }).error(function () {
            alert('Something went wrong. Please try again later');
        }).complete(function () {
            self.setState({loading: false});
        }).done(function (response) {
            $.cookie("clip_key", response.key, {
                path: '/'
            });
            self.setState({showShare: true, clipKey: response.key});
            self.setState({showSharedropdown: true});
        });
    },
    handleShare: function () {
        this.setState({showSharedropdown: !this.state.showSharedropdown});
    },
    getResource: function (data) {
        var resource = "";
        _.map(data, function (d) {
            resource += '<li>' + d + '</li>';
        });

        return resource;
    },

    printClips: function (clips) {
        var self = this;
        var printView = '';
        clips.map(function (data, index) {
            printView += '<div></div><ul  style="list-style: none;padding: 0;">' +
                "<li style='margin-bottom: 5px;'><b style='font-size: large'>" + data.get('name') + "</b></td>" +
                "<li style='margin-bottom: 8px;'>" + data.get('text') + "</li>" +
                "<li style='margin-bottom: 5px;'><b>Category:</b> " + data.get('category') + "</li>" +
                "<li> <b>Year : </b>" + data.get('year') + ", <b>Country: </b>" + data.get('country') + ", <b>Resource: </b>" + data.get('resource').toString() + "</li>" +
                "</ul></div>" + "<hr>";
        });
        self.printPopUp(printView);
    },
    printPopUp: function (data) {
        var mywindow = window.open('', 'my div', 'height=800,width=600');
        mywindow.document.write('<html><head><title>');
        mywindow.document.write('</title>')
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10
        mywindow.print();
        mywindow.close();
        return true;
    },
    downloadAsCSV: function (clips) {
        var data = [];
        var d = new Date();
        var date = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
        var downloadName = "clipped_annotations_" + date;
        var csvContent = "data:text/csv;charset=utf-8,";
        var head = [langClip.documentTitle, langClip.country, langClip.year, langClip.annotationCat, langClip.text];
        csvContent += head.join(',') + "\n";
        _.map(clips.models, function (clip) {
            var t = ['"' + clip.get('name') + '"', '"' + clip.get('country') + '"', '"' + clip.get('year') + '"', '"' + clip.get('category') + '"', '"' + clip.get('text') + '"'];
            csvContent += t.join(',') + "\n";
        });
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", downloadName + ".csv");
        link.click();
    },
    toggleDropdown: function () {
        this.setState({dropdown: !this.state.dropdown})
    },
    handleZipDownload: function () {
        if (this.state.loadingPdf) {
            return;
        }
        var clips = this.state.clips;
        this.setState({loadingPdf: true});
        var annotId = [];
        clips.map(function (data) {
            annotId.push(data.get('annotation_id'));
        });
        var self = this;
        $.ajax({
            type: "POST",
            url: app_url + "/clip/zip",
            data: "id=" + annotId.toString(),
        }).success(function (data) {
            window.open(data, '_blank');
        }).error(function () {
            alert(langClip.wrongError);
        }).complete(function () {
            self.setState({loadingPdf: false});
        });
    },
    render: function () {
        var show = {'display': 'block'};
        var hide = {'display': 'none'};
        var style = this.state.dropdown ? show : hide;

        var shareshow = {'display': 'block'};
        var sharehide = {'display': 'none'};
        var sharestyle = this.state.showSharedropdown ? shareshow : sharehide;

        if (this.state.clips.length < 1) {
            return null;
        }
        var saveAction = null;
        var shareAndSave = langClip.saveClip;
        if (this.state.loading) {
            shareAndSave = langClip.saving;
        }
        if (this.state.showShare) {
            shareAndSave = langClip.share;
        }

        var download_pdf = '';

        if (this.state.loadingPdf) {
            download_pdf = (<div className="pdf-download-processing">
                <nobr>{langClip.pdfClip}</nobr>
                <small>{langClip.processing}</small>
            </div>);
        } else {
            download_pdf = (<a id="pdf-zip-download" onClick={this.handleZipDownload}>{langClip.pdfClip}</a>);
        }

        return (
            <div className="actions-wrapper action-btn">

                <div className="download-dropdown">
                    <a onClick={this.toggleDropdown}><span>{langClip.download}</span></a>
                    <ul style={style} className="dropdown-menu">
                        <li><a id="download-clip-filter" onClick={this.handleDownload}>{langClip.csv}</a></li>
                        <li>{download_pdf}</li>
                    </ul>
                </div>
                <div id="print-clip-filter" onClick={this.handlePrint}>{langClip.printClip}</div>
                <div className="modal-social-share-wrap social-share">
                    <div>
                        <div id="save-clipping" style={{width:'135px'}}
                             onClick={this.handleSave}>{this.state.loading ? langClip.saving : langClip.save_and_shareClip}</div>
                        <ShareManager clipKey={this.state.clipKey} clipCollection={this.props.clipCollection}
                                      showSharedropdown={this.state.showSharedropdown}/>
                    </div>
                </div>
            </div>
        );
    }
});
