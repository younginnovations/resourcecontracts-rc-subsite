$(document).ready(function () {
    $('select').select2({
        placeholder: "select",
        allowClear: true,
        theme: "classic"
    });
    $('.datetimepicker').datetimepicker({
        timepicker: false,
        format: 'yy'
    });
    $('.search-link').click(function () {
        $(this).css('display', 'none');
        $('.search-hide').css('display', 'inline-block');
        $(this).siblings('.search-input-wrapper').slideToggle();
        $(this).parents('.top-container').toggleClass('expand');
    });

    $('.search-hide').click(function () {
        $(this).css('display', 'none');
        $(this).siblings('.open').css('display', 'inline-block');
    });

    $('.view-annotations').click(function (e) {
        e.preventDefault();
        $(this).css('display', 'none');
        $('.close-annotations').css('display', 'inline-block');
        $('body').find('.annotation-pop').toggle().addClass('open');
    });

    $('.close-annotations').click(function () {
        $(this).css('display', 'none');
        $('.open-annotations').css('display', 'inline-block');
    });

/*
    $(document).on('click', function (e) {
        if ($(e.target).closest('.search-wrapper').length === 0) {
            $('.search-input-wrapper').hide();
            $('.search-hide').hide();
            $('.search-link.open').show();
        }

        if ($(e.target).closest('.contract-annotations').length === 0) {
            $('.annotation-pop').hide();
            $('.close-annotations').hide();
            $('.open-annotations').show();
        }

        //if ($(e.target).closest('.contract-annotations').length === 0) {
        //    $('.annotation-list').hide();
        //}
        //
        //if ($(e.target).closest('.contract-metadata').length === 0) {
        //    $('.metadata').hide();
        //}
    });
*/


});