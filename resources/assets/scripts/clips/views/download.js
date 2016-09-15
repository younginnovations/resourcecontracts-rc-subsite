var DownloadManager = React.createClass({
    getInitialState: function () {
        return {
            clips: [],
            dropdown: false,
            loading: false,
            showShare: false,
            clipKey: null
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
                }
            }
        });
    },
    handleDownload: function () {
        console.log("download clips",this.state.clips);
        this.downloadAsCSV(this.state.clips);
    },
    handlePrint: function () {
        console.log("print clips",this.state.clips);

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
        });
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
                "<li> <b>Year : </b>" + data.get('year') + ", <b>Country: </b>" + data.get('country') + ", <b>lang.resource: </b>" + data.get('resource').toString() + "</li>" +
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
       var date = d.getDate()  + "_" + (d.getMonth()+1) + "_" + d.getFullYear() + "_" +d.getHours() + "_" + d.getMinutes()+ "_" + d.getSeconds();
        var downloadName = "clipped_annotations_" + date;
        var csvContent = "data:text/csv;charset=utf-8,";
        var head = [langClip.documentTitle,langClip.country, langClip.year, langClip.annotationCat, langClip.text];
        csvContent += head.join(',') + "\n";
        _.map(clips.models, function (clip) {
            var t = ['"' + clip.get('name') + '"', '"' + clip.get('year') + '"', '"' + clip.get('country') + '"', '"' + clip.get('category') + '"', '"' + clip.get('text') + '"'];
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
        var clips = this.state.clips;
        var annotId = [];
        clips.map(function (data) {
            annotId.push(data.get('annotation_id'));
        });
        $.ajax({
            type: "POST",
            url: app_url + "/clip/zip",
            data: "id=" + annotId.toString(),
        }).success(function (data) {
            window.open(data, '_blank');
        }).error(function () {
            alert(langClip.wrongError);
        });
    },

    render: function () {

        var show = {'display': 'block'};
        var hide = {'display': 'none'};
        var style = this.state.dropdown ? show : hide;
        if (this.state.clips.length < 1) {
            return null;
        }
        var saveAction = null;
        if (key == '') {
            saveAction = (
                <div id="save-clipping"   onClick={this.handleSave}>{this.state.loading ? langClip.saving: langClip.saveClip}</div>
            );
        }
        return (
            <div className="actions-wrapper action-btn">
                <ShareManager clipKey={this.state.clipKey} clipCollection={this.props.clipCollection}/>
                <div className="download-dropdown">
                    <a onClick={this.toggleDropdown}><span>{langClip.download}</span></a>
                    <ul style={style} className="dropdown-menu">
                        <li><a id="download-clip-filter" onClick={this.handleDownload}>{langClip.clip}</a></li>
                        <li><a id="pdf-zip-download" onClick={this.handleZipDownload}>{langClip.pdfClip}</a></li>
                    </ul>
                </div>
                <div id="print-clip-filter" onClick={this.handlePrint}>{langClip.printClip}</div>
                {saveAction}
            </div>
        );
    }
});
