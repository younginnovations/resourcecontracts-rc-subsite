var Clip = Backbone.Model.extend({
    url:''
});

var ClipCollection = Backbone.Collection.extend({
    model: Clip,
    localStorage: new Backbone.LocalStorage("clipCollection")
});

var clipCollection = new ClipCollection();
var data = clipCollection.localStorage.findAll();



$(function() {
    $( ".annotation-clip-icon" ).click(function() {
        var id =$(this).attr('annotation_id');
        var clipped = false;
        var clip = new Clip({id:id});
        if(clipCollection.localStorage.find(clip)){
            clipped=true;
        }
        if (!clipped) {
            clipCollection.add(clip);
            clip.save();
            $(this).addClass('annotation-clipped');
        }
        else {
            clipCollection.localStorage.destroy(clip);
            $(this).removeClass('annotation-clipped');
        }
        $("#annotation-count").empty();
        $("#annotation-count").append("Clip (" + data.length +")");
    });

    $(document).on('click',".remove-clip",function() {
        var id =$(this).attr('annotation_id');

        var clip = new Clip({id:id});
        clipCollection.localStorage.destroy(clip);
        location.reload();
    });

    $(document).on('click',"#clip-all-annotations",function() {
        var allAnnotations=  $(".annotations .clip-annotation");
        allAnnotations.each(function(i){
            var annotationId = $(this).attr('annotation_id');
            var clipped = false;
            var clip = new Clip({id:annotationId});
            if(clipCollection.localStorage.find(clip)){
                clipped=true;
            }
            if (!clipped) {
                clipCollection.add(clip);
                clip.save();
                $(this).css('color','red');
            }

            $("#annotation-count").empty();
            $("#annotation-count").append("Clip (" + data.length +")");

        });
    });

});


var data = clipCollection.localStorage.records;

$(document).ready(function(){
    $("#annotation-count").append("Clip (" + data.length +")");
});




$(document).ready(function(){
    var isAllClipped=true;
$(".annotations .clip-annotation").map(function() {
    var t=  $(this).attr('annotation_id');
    if (data.indexOf(t)>=0) {
        $(this).css('color','red');
    }
    if(isAllClipped==true && data.indexOf(t)<0)
    {
        isAllClipped=false;
    }
}).get();

    console.log(isAllClipped);
    if(isAllClipped)
    {
        $("#clip-all-annotations").css('color','red');
        $("#clip-all-annotations").attr('id','remove-all-annotations');
    }


});


$(function(){
    $.ajax({
        method: "GET",
        url: "/clip/annotations",
        data: {'data':data.toString()}
    })
        .done(function( html ) {
            $( "#annotationsresults" ).append( html );
        });
});
