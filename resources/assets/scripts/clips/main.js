var clipLocalCollection = new ClipLocalCollection();
clipLocalCollection.fetch();
var data = clipLocalCollection.localStorage.findAll();

function getClipLocalCollection() {
    return clipLocalCollection;
}


function getCookie(cname) {
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        var t = c.split('=');
        if (t[0].replace(/\s/g, '') == cname) {
            return t[1];
        }

    }
    return "";
}

function clipAnnotations(id, self) {
    var clipped = false;
    var clip = new ClipLocal({id: id});
    if (clipLocalCollection.localStorage.find(clip)) {
        clipped = true;
    }
    if (!clipped) {
        clipLocalCollection.add(clip);
        clip.save();
        $(self).addClass('annotation-clipped');
        $(self).attr('title', langClip.annotationClipped);
    }
    else {
        var clipC = clipLocalCollection.where({id: id});
        if (clipC.length != 0) {
            clipC = clipC[0];
            clipC.destroy();
        }
        else {
            clipLocalCollection.localStorage.destroy(clip)
        }

        $(self).removeClass('annotation-clipped');
        $(self).attr('title', langClip.clip_annotation);

    }
    updateAnnotationCount();
}

function updateAnnotationCount() {
    var allData = clipLocalCollection.localStorage.findAll();
    $("#annotation-count").empty();
    $("#annotation-count").append(langClip.view_all_clips + " (" + allData.length + ")");
}

function loadClippedItem() {
    var data = clipLocalCollection.localStorage.records;

    $("#annotation-count").append(langClip.view_all_clips+" (" + data.length + ")");

    var isAllClipped = true;
    $(".annotation-clip-icon").map(function () {
        var t = $(this).attr('data-id');
        if (data.indexOf(t) >= 0) {
            $(this).addClass('annotation-clipped');
            $(this).attr('title', langClip.alreadyClipped);
        }
        if (isAllClipped == true && data.indexOf(t) < 0) {
            isAllClipped = false;
        }
    }).get();

    if (isAllClipped) {
        $("#clip-all-annotations").addClass('annotation-clipped');
        $("#clip-all-annotations").attr('id', 'remove-all-annotations');
        $('#remove-all-annotations').attr('title', langClip.annotationClipped);
    }
}


function loadSingleClipedItem(self) {
    var data = clipLocalCollection.localStorage.records;
    var t = $(self).attr('data-id');
    if (data.indexOf(t) >= 0) {
        $(self).addClass('annotation-clipped');
        $(self).attr('title', langClip.alreadyClipped);
    }

}


function getClippedData() {
    var data = clipLocalCollection.localStorage.records;
    return data;
}


function setAnnotationOnOff() {
    var state = getCookie("clipstate");
    if (state == 1) {
        $.cookie("clipstate", 0, {
            path: '/'
        });
    }
    else {
        $.cookie("clipstate", 1, {
            path: '/'
        });
    }
    return "";
}


$(document).ready(function () {
    var off =langClip.offClip;
    var on =langClip.onClip;
    var allData = clipLocalCollection.localStorage.findAll();
    if (allData.length != 0)
    {
        var clearall = $("<a id='clear-all'>Clear Clips</a>");
        $("#all-clip-count").append("(" + allData.length + ")");
        $("#clip-panel-title").append(clearall);

    }


    if (getCookie('clipstate') == 0) {
        $(".annotation-clip-icon , .annotation-clip, #hide-annotation, #annotation-count").hide();
        $('#on-annotation').html(off);
        $('#on-annotation').removeClass('active');

    } else {

        $(".annotation-clip-icon , .annotation-clip, #hide-annotation, #annotation-count").show();
        $('#on-annotation').html(on);
        $('#on-annotation').addClass('active');
    }

    $(".annotation-clip-icon").click(function () {
        var id = $(this).attr('data-id');
        clipAnnotations(id, this);
    });
    $(document).on('click',"#clear-all",function(){
        confirm("Are you sure, you want to remove all clips?");

        data.map(function (d, index) {
            var clip = new ClipLocal({id: d});
            clipLocalCollection.localStorage.destroy(clip);
        })
        location.reload();
    });

    $(document).on('click', ".remove-clip", function () {
        var id = $(this).attr('data-id');
        var clip = new ClipLocal({id: id});
        clipLocalCollection.localStorage.destroy(clip);
        $(this).parent().parent().remove();
        updateAnnotationCount();
    });

    $(document).on('click', "#clip-all-annotations", function () {
        var allAnnotations = $(".annotation-clip-icon");
        clipAllAnnotations(allAnnotations, this);
    });


    function clipAllAnnotations(allAnnotations, self) {
        allAnnotations.each(function (i) {
            var annotationId = $(this).attr('data-id');
            var clipped = false;
            var clip = new ClipLocal({id: annotationId});
            if (clipLocalCollection.localStorage.find(clip)) {
                clipped = true;
            }
            if (!clipped) {
                clipLocalCollection.add(clip);
                clip.save();
                $(this).addClass('annotation-clipped');
            }
            updateAnnotationCount();
        });
        $("#clip-all-annotations").addClass('annotation-clipped');
        $("#clip-all-annotations").attr('id', 'remove-all-annotations');
        $("#remove-all-annotations").attr('title', langClip.annotationClipped);

    }

    $(document).on('click', "#remove-all-annotations", function () {
        var allAnnotations = $(".annotation-clip-icon");

        removeAllAnnotations(allAnnotations);
    });

    function removeAllAnnotations(allAnnotations) {
        allAnnotations.each(function (i) {
            var annotationId = $(this).attr('data-id');
            var clipped = false;
            var clip = new ClipLocal({id: annotationId});
            if (clipLocalCollection.localStorage.find(clip)) {
                clipped = true;
            }
            if (clipped) {
                var clipC = clipLocalCollection.where({id: annotationId});
                if (clipC.length != 0) {
                    clipC = clipC[0];
                    clipC.destroy();
                }
                else {
                    clipLocalCollection.localStorage.destroy(clip)
                }

                $(this).removeClass('annotation-clipped');
            }

            updateAnnotationCount();

        });
        $("#remove-all-annotations").removeClass('annotation-clipped');
        $("#remove-all-annotations").attr('id', 'clip-all-annotations');
        $("#clip-all-annotations").attr('title', 'Clip all annotations.');

    }


    var data = clipLocalCollection.localStorage.records;

    loadClippedItem();

    $("#download-annotation").click(function () {

        $.ajax({
                method: "GET",
                url: app_url + "/clip/download",
                dataType: 'json',
                data: {'data': data.toString()}
            })
            .done(function (annotationData) {
                var d = new Date();
                var downloadName = "clip-" + d;
                var csvContent = "data:text/csv;charset=utf-8,";

                annotationData.map(function (d, index) {
                    var array = _.toArray(d);
                    var dataString = array.join(',');
                    csvContent += index < annotationData.length ? dataString + "\n" : dataString;
                })

                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", downloadName + ".csv");
                link.click();
            });
    });


    $("#print-annotation").click(function () {
        var contents = $("#clip-annotation-list").html();
        Popup(contents);
    });


    function Popup(data) {
        var mywindow = window.open('', 'my div', 'height=400,width=600');
        mywindow.document.write('<html><head><title>langClip.subjectClip</title>');
        mywindow.document.write('<style>.action,.remove-clip{display: none;}</style>')
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10

        mywindow.print();
        mywindow.close();

        return true;
    }

    $("#on-annotation").on('click', function () {
        setAnnotationOnOff();
        if (!$(this).hasClass('active')) {
            $(".annotation-clip-icon , .annotation-clip,  #hide-annotation, #annotation-count").show();
            $(this).addClass('active');
            $(this).html(langClip.onClip);
        }
        else {
            $(".annotation-clip-icon , .annotation-clip, #hide-annotation, #annotation-count").hide();
            $(this).removeClass('active');
            $(this).html(langClip.offClip);
        }

    });

    $("#hide-annotation").on('click', function (e) {
        e.preventDefault();
        setAnnotationOnOff();
        $(".annotation-clip-icon , .annotation-clip, #annotation-count").hide();
        $("#hide-annotation").hide();
        console.log("dfasd", $("#hide-annotation").hide());
        $("#on-annotation").removeClass('active');
        $("#on-annotation").html(langClip.onClip);
    });


});