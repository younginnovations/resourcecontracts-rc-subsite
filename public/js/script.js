$(document).ready(function() {   
    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    var sel2 = sideslider.attr('data-target-2');
    sideslider.click(function(event){
    	$(this).toggleClass('active');
        $(sel).toggleClass('in');
        $(sel2).toggleClass('out');
    });

    var containerHeight = $('.side-collapse-container').height();
    $('.side-collapse').height(containerHeight);

    var countryLine = $('.country-detail-wrapper').height();
    $('.country-contract-wrap').css('height',countryLine);

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

});