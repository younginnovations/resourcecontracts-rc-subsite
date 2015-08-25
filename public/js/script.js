$(document).ready(function() {   

    //slide effect for filter resource
    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    var sel2 = sideslider.attr('data-target-2');
    sideslider.click(function(event){
    	$(this).toggleClass('active');
        $(sel).toggleClass('in');
        $(sel2).toggleClass('out');
        $(sel2).find('.col-lg-2,.col-lg-3').toggleClass('col-lg-2').toggleClass('col-lg-3');
        $(sel2).find('.col-lg-4,.col-lg-6').toggleClass('col-lg-4').toggleClass('col-lg-6');
        var containerHeight = $('.side-collapse-container').height();
         $('.side-collapse').height(containerHeight);
    });

    var sideslider1 = $('[data-toggle=collapse-sidebar]');
    var sela = sideslider1.attr('data-target');
    var selb = sideslider1.attr('data-target-2');
    sideslider1.click(function(event){
        $(this).toggleClass('active');
        $(sela).toggleClass('in');
        $(selb).toggleClass('out');
    });



    var countryLine = $('.country-detail-wrapper').height();
    $('.country-contract-wrap').css('height',countryLine);

    // slide to annotation list

    $(".view-annotation").on('click', function(e) {

    // prevent default anchor click behavior
        e.preventDefault();

        // animate
        $('html, body').animate({
        scrollTop: $(this.hash).offset().top
        }, 300, function(){

        // when done, add hash to url
        // (default click behaviour)
        window.location.hash = this.hash;
    });

    });

    // search form toggle

    $('#search-form input[type="text"]').focus(function(){
        $('.search-input-wrapper').show();
        $('select').select2({placeholder: "Select", allowClear: true, theme: "classic"});

    });

    $(document).on('click', '.search-close', function(){
        $('.search-input-wrapper').hide();
    });

    /* $('#search-form input[type="text"]').keyup(function(){

         if($(this).val() == ''){
         $('.search-input-wrapper').hide();
      }else{
         $('.search-input-wrapper').show();
      }
    });*/

    // $(document).mouseup(function (e)
    // {
    //     var container = $(".search-form");

    //     if (!container.is(e.target) // if the target of the click isn't the container...
    //         && container.has(e.target).length === 0) // ... nor a descendant of the container
    //     {
    //         $('.search-input-wrapper').hide();
    //     }
    // });

    $('.download-wrap,.view-pin-wrap').click(function(){
       $(this).siblings('ul').toggle();
    });
});