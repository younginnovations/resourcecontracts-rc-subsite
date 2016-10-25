function htmlDecode(html) {
    var a = document.createElement('a');
    a.innerHTML = html;
    return a.textContent;
}

var emailManager = {
    formEl: '#send-email',
    errors: 0,
    processing: false,
    emailPostUrl: app_url + '/clip/email',
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    init: function () {
        $(this.formEl).find('#subject').val(document.title);
        $('#send-email').on('submit', function (event) {
            event.preventDefault();
            emailManager.submit();
        });
    },
    isValidEmails: function (emails) {
        emails = emails.split(',');
        var valid = 0;
        var self = this;
        emails.map(function (val) {
            if (!self.validateEmail(val.trim())) {
                valid = valid + 1;
            }
        });
        return valid == 0;
    },
    setError: function (key, err) {
        $('#' + key).after('<span class="required">' + err + '</span>');
        this.errors++;
    },
    input: function (id) {
        return $(this.formEl).find('#' + id).val();
    },
    validationInputs: function () {
        this.errors = 0;
        $(this.formEl).find('span.required').remove();
        if (this.input('to') == '' || !this.isValidEmails(this.input('to'))) {
            this.setError('to', 'Please enter valid email address.');
        }

        if (this.input('from') == '' || !this.validateEmail(this.input('from'))) {
            this.setError('from', 'Please enter valid email address.');
        }

        if (this.input('subject') == '') {
            this.setError('subject', 'Subject is required');
        }

        if (this.input('body') == '') {
            this.setError('body', 'Message is required');
        }
        return this.errors > 0;
    },
    resetInput: function () {
        $(this.formEl).find('#to').val('');
    },
    getUrl: function () {
        return window.location.href;
    },
    setProcessing: function (status) {
        if (status) {
            this.processing = true;
            $(this.formEl).find('.btn-submit').attr('disabled', 'disabled');
        } else {
            this.processing = false;
            $(this.formEl).find('.btn-submit').removeAttr('disabled');
        }
    },
    submit: function () {
        if (this.validationInputs() || this.processing) {
            return false;
        }

        var formData = {
            to: this.input('to'),
            from: this.input('from'),
            subject: this.input('subject'),
            body: this.input('body'),
            url: this.getUrl()
        };

        this.setProcessing(true);
        var self = this;
        $.ajax({
            type: "POST",
            url: self.emailPostUrl,
            data: formData
        }).error(function () {
            $('.email-result').append("<div class='alert alert-danger'>Something went wrong.</div>");
            self.setProcessing(false);
        }).success(function (res) {
            if (res.status) {
                $('.email-result').append("<div class='alert alert-success'>" + res.message + "</div>");
            } else {
                $('.email-result').append("<div class='alert alert-danger'>" + res.message + "</div>");
            }
            self.setProcessing(false);
            self.resetInput();
        })

    }
};

$(document).ready(function () {
    if ($('select').length) {
        $('select').select2({placeholder: htmlDecode(langSelect), allowClear: true, theme: "classic", language: "fr"});
    }
    $('#searchclear').click(function () {
        $("select").val(null).trigger("change");
        $("select option").removeAttr('selected');
        $('#query').removeAttr('value');
        $('#search_query').hide();
    });
    //slide effect for filter resource
    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    var sel2 = sideslider.attr('data-target-2');
    sideslider.click(function (event) {
        $(this).toggleClass('active');
        $(sel).toggleClass('in');
        $(sel2).toggleClass('out');
        $(sel2).find('.col-lg-2,.col-lg-3').toggleClass('col-lg-2').toggleClass('col-lg-3');
        $(sel2).find('.col-lg-4,.col-lg-6').toggleClass('col-lg-4').toggleClass('col-lg-6');
        var containerHeight = $('.side-collapse-container').height();
        $('.side-collapse').height(containerHeight);

        $('input.resource').on('click', function () {
            $('#countries > .col-lg-3').addClass('toggle-width');
        });

        if ($(window).width() < 1200) {
            $(sel2).find('.col-md-3,.col-md-6').toggleClass('col-md-3').toggleClass('col-md-6');
        }

        if ($(window).width() < 992) {
            $(sel2).find('.col-sm-4,.col-sm-6').toggleClass('col-sm-4').toggleClass('col-sm-6');
        }

        if ($(window).width() < 768) {
            $(sel2).find('.col-xs-6,.col-xs-12').toggleClass('col-xs-6').toggleClass('col-xs-12');
        }

        $(window).resize(function () {
            if ($(window).width() < 1200) {
                $(sel2).find('.col-md-3,.col-md-6').toggleClass('col-md-6').toggleClass('col-md-3');
            }

            if ($(window).width() < 992) {
                $(sel2).find('.col-sm-4,.col-sm-6').toggleClass('col-sm-4').toggleClass('col-sm-6');
            }

            if ($(window).width() < 768) {
                $(sel2).find('.col-xs-6,.col-xs-12').toggleClass('col-xs-6').toggleClass('col-xs-12');
            }
        });
    });


    var sideslider1 = $('[data-toggle=collapse-sidebar]');
    var sela = sideslider1.attr('data-target');
    var selb = sideslider1.attr('data-target-2');
    sideslider1.click(function (event) {
        $(this).toggleClass('active');
        $(sela).toggleClass('in');
        $(selb).toggleClass('out');
    });


    // slide to annotation list

    $(".view-annotation").on('click', function (e) {
        var href = $(this).attr('href');
        $(".category-wrap").show();
        $(".cluster-wrap").show();

        // prevent default anchor click behavior
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top
        }, 300, function () {
            window.location.hash = href;
        });

    });

    // slide to annotation list

    $(".view-annotation-category").on('click', function (e) {
        var href = $(this).attr('href');
        e.preventDefault();
        $('.cluster-wrap').show();
        $('.view-annotation-cluster').removeClass('active');
        $('.annotation-category-cluster li:first-child a').addClass('active');
        scrollToDiv(href);
    });

    $(".annotation-category-cluster a").on('click', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        scrollToDiv(href);
    });


    function scrollToDiv(ID) {
        $('html, body').animate({
            scrollTop: $(ID).offset().top - 5
        }, 300, function () {
            window.location.hash = ID;
        });
    }

    // search form toggle

    ($('#search-form:not(.search-page-form) input[type="text"]')).focus(function () {
        if ($(this).parent().parent().parent().parent().hasClass("static-search")) {
            return;
        } else {
            $('.search-input-wrapper').show();
            $('.contract-number-wrap').hide();
        }
    });

    $(document).on('click', '.search-close', function () {
        $('.search-input-wrapper').hide();
        $('.contract-number-wrap').show();
    });

    $('#search-form:not(.static-search .filter-country-wrap > #search-form) input[type="text"]').keyup(function () {
        if ($(this).val() == '') {
            $('.search-input-wrapper').hide();
            $('.contract-number-wrap').show();
        } else {
            $('.search-input-wrapper').show();
            $('.contract-number-wrap').hide();
        }
    });

    $(document).on('click', function (e) {
        var container = $("#search-form");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $(".search-input-wrapper").hide();
            $('.contract-number-wrap').show();
        }
        else if ($(".search-input-wrapper").is(':hidden')) {
            $('.contract-number-wrap').show();
        }
    });


    $('.download-wrap,.view-pin-wrap').click(function () {
        $(this).siblings('ul').toggle();
    });

    $('#social-toggler').click(function () {
        $('.social-toggle').toggle();
    });

    $('.search-click').click(function () {
        $('#search-form input[type="text"]').focus();
    });

    if ($(window).width() > 992) {
        var annotationWrapHeight = $('.col-lg-6 .panel-contract-wrap').height();
        $('.panel-annotation-wrap').css('height', annotationWrapHeight);
    }
    else {
        $('.panel-annotation-wrap').css('height', 'auto');
    }

    $(".language-selector").click(function () {
        if (!$(this).hasClass("open")) {
            $(".navbar-static-top").css("z-index", 1002);
        } else {
            $(".navbar-static-top").css("z-index", 1000);
        }
    });

    $(window).on('resize', function () {
        if ($(window).width() > 992) {
            var annotationWrapHeight = $('.col-lg-6 .panel-contract-wrap').height();
            $('.panel-annotation-wrap').css('height', annotationWrapHeight);
        }
        else {
            $('.panel-annotation-wrap').css('height', 'auto');
        }
    });

    if ($(window).width() > 992) {
        var countryLine = $('.country-detail-wrapper').height() + 10;
        $('.country-contract-wrap').css('height', countryLine);
    }
    else {
        $('.country-contract-wrap').css('height', 'auto');
    }

    $(window).on('resize', function () {
        if ($(window).width() > 992) {
            var countryLine = $('.country-detail-wrapper').height() + 10;
            $('.country-contract-wrap').css('height', countryLine);
        }
        else {
            $('.country-contract-wrap').css('height', 'auto');
        }
    });

    $("#no-pin-message").each(function () {
        if (!$(this).text().trim().length) {
            $(this).parents('.pin-list').css('display', 'none');
        }
    });

    var calWidth = function () {
        var rightWidth = $(".navbar-header").outerWidth(),
            leftWidth = $(window).width() - rightWidth;
        $(".right-header-section").width(leftWidth - 50);
        $(".navbar .search-input-wrapper").width(leftWidth - 22);
        $(".right-header-section").removeClass("hidden");
    }

    if ($(window).width() > 768) {
        calWidth();
    }

    $(window).resize(function () {
        if ($(window).width() > 768) {
            calWidth();
        }
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.download-wrap, .dropdown-menu').length) {
            $(".dropdown-menu").hide();
        }
        if (!$(e.target).closest('.view-pin-wrap, #pinLists').length) {
            $("#pinLists").hide();
        }

        /*  if (!$(e.target).closest('.search-input-wrapper').length) {
         $(".search-input-wrapper").hide();
         }*/

        if (!$(e.target).closest('#social-toggler').length) {
            $(".social-toggle").hide();
        }

        if (!$(".language-selector").hasClass("open")) {
            $(".navbar-static-top").css("z-index", 1000);
        }
    });

    $(document).on('click', '.toggle-all', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $(target).slideToggle();
        $(this).text(function (index, value) {
            if (value == localization.more)
                return localization.less;
            else
                return localization.more;
        })
    });

    $(".sidebar-nav li ul").each(function () {
        if (!$(this).text().trim().length) {
            $(this).parent('li').css('display', 'none');
        }
    });

    var toolTip = $('[data-toggle="tooltip"]');
    if (toolTip.length) {
        toolTip.tooltip();
    }

    var originalLeave = $.fn.popover.Constructor.prototype.leave;
    $.fn.popover.Constructor.prototype.leave = function (obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
        var container, timeout;

        originalLeave.call(this, obj);

        if (obj.currentTarget) {
            container = $(obj.currentTarget).siblings('.popover')
            timeout = self.timeout;
            container.one('mouseenter', function () {
                clearTimeout(timeout);
                container.one('mouseleave', function () {
                    $.fn.popover.Constructor.prototype.leave.call(self, self);
                });
            })
        }
    };
    var options = {
        placement: function (context, source) {
            var position = $(source).position();

            if (position.left > 515) {
                return "left";
            }

            if (position.left < 515) {
                return "right";
            }

            if (position.top < 110) {
                return "bottom";
            }

            return "top";
        },
        trigger: "click hover",
        delay: {
            show: 50,
            hide: 400
        }

    };

    var annotation = $(".annotate-text, .hover-anchor");
    if (annotation.length) {
        annotation.popover(options);
    }

    if (document.referrer == '') {
        $('.back-button').addClass("has-no-backbtn").hide();
        $('.back-button').hide();
    }
    $('.back-button').on('click', function () {
        if (document.referrer != '') {
            window.history.go(-1);
        }
    });

    function showFullTitle() {
        //check if the div has ellipsis or not
        $("#show-full-title").on({
            mouseenter: function () {
                //stuff to do on mouse enter
                if ($('#show-full-title')[0].scrollWidth > $('#show-full-title').innerWidth()) {
                    $("#show-full-title").addClass("title-pop");
                }
                /*if ($('#show-full-title')[0].scrollWidth >  $('#show-full-title').innerWidth()) {
                 if($(".title-pop").length < 1) {
                 $("#show-full-title").append('<div class="title-pop">' + $('#show-full-title').html().trim() + '</div>');
                 }
                 $('#show-full-title').addClass("show-full-title");
                 }*/
            },
            mouseleave: function () {
                //stuff to do on mouse leave
                //$('#show-full-title').removeClass("show-full-title");
                $("#show-full-title").removeClass("title-pop");
            }
        });
    }

    showFullTitle();

    $(window).resize(function () {
        showFullTitle();
    });

    emailManager.init();

    $('a.share-link').on('click', function (e) {
        e.preventDefault();
        var location = '';
        var share = {
            'facebook': 'https://www.facebook.com/sharer/sharer.php?u=',
            'google': 'https://plus.google.com/share?url=',
            'twitter': 'https://twitter.com/share?text='
        };
        var url = document.location.href;

        if ($(this).attr('href').replace('#', '') == 'facebook') {
            location = share.facebook + url;
        }

        if ($(this).attr('href').replace('#', '') == 'google') {
            location = share.google + url;
        }

        if ($(this).attr('href').replace('#', '') == 'twitter') {
            location = share.twitter + document.title;
        }
        window.open(location, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=650,height=400");
    });
});
