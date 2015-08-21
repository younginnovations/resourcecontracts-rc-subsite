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
});