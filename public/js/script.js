$(document).ready(function () {        
    $('.search-link').click(function(){
        $(this).css('display','none');
        $('.search-hide').css('display','inline-block');
        $(this).siblings('.search-input-wrapper').slideToggle();
        $(this).parents('.top-container').toggleClass('expand');
    });
    
    $('.search-hide').click(function(){
        $(this).css('display','none');
        $('.open').css('display','inline-block');
    });

    $('.view-annotations').click(function(e){
        e.preventDefault();
        $(this).css('display','none');
        $('.close-annotations').css('display','inline-block');
        $('body').find('.annotation-pop').toggle().addClass('open');
    });

     $('.close-annotations').click(function(){
        $(this).css('display','none');
        $('.open-annotations').css('display','inline-block');
    });
});