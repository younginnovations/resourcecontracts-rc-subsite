@extends('layout.app')
@section('css')
@stop
@section('content')
    @if(auth()->isloggedIn())
        <div class="edit-mode"><div>@lang('admin.editing')<a target="_blank" href="{{route('admin.page.edit', ['id'=>$page->id])}}">@lang('admin.click_here')</a> @lang('admin.to_edit') - <a href="{{url('logout')}}">@lang('adminlogout')</a></div></div>
    @endif
    <div class="content-wrap">
        <h1 id="title" class="faq-title">{{$page->title()}}</h1>
        <div id="content" >
                <nav class="col-md-4 scrollspy side-link-nav">
                    <div id="target-nav">
                        <ul id="nav" class="nav">

                        </ul>
                    </div>
                </nav>

                <div id="scroll-able" class="scrollable" data-spy="scroll" data-target="#target_nav">

                   {!! $page->content() !!}

                </div>
        </div>
        <a href="#" class="faq-back-to-top btn btn-primary"><i class="fa fa-arrow-up"></i></a>
    </div>
@stop

@section('js')
    <script>
        $(function() {

            $("#scroll-able").find("strong").each( function(index){

                $(this).attr( "id", ("faq-" + (index + 1) ));

                $("#nav").append('<li><span data-target="#faq-' + (index+1) + '" >' +  $(this).text()  + '</span>')

            })

            $('#nav li>span').click(function() {
                var targetElem = $(this).attr("data-target");

                var offset = $(targetElem).offset().top - 25;

                $('#nav li>span').removeClass("active");
                $(this).addClass("active")

                $("#scroll-able strong").removeClass("active");
                $(targetElem).addClass("active");

                $('html,body').animate({
                    scrollTop: offset
                }, 300);



            });


            var targetNav = $("#target-nav");
            var sideNavTop = targetNav.offset().top;
            var winHeight = $(window).height();
            var parentTop = targetNav.parents("#content").offset().top;

            var absoluteTop = '';

           $(window).scroll(function() {
               if (window.matchMedia("(min-width: 1000px)").matches) {
                   var scrollTop = $(window).scrollTop();
                   var footerHeight = $("footer").innerHeight();
                   var reqHeight = targetNav.innerHeight();
                   var availableHeight = ($("body").height() - footerHeight - 50) - scrollTop;

                   if (reqHeight == availableHeight) {
                       absoluteTop = scrollTop - parentTop;
                   }
                   if (scrollTop > (sideNavTop - 25)) {
                       if (availableHeight <= reqHeight) {

                           targetNav.css({
                               "position": "absolute",
                               top: absoluteTop + "px"
                           });

                       } else {

                           targetNav.css({
                               "position": "fixed",
                               top: "25px"
                           });

                       }

                   }
                   else {
                       targetNav.css({
                           "position": "absolute",
                           top: "auto"
                       });
                   }
               }


               if(scrollTop > winHeight - 200){
                   $(".faq-back-to-top").fadeIn(200);
               }else{
                   $(".faq-back-to-top").fadeOut(200);
               }

            });

            $(".faq-back-to-top").click(function(){
                $("body,html").animate({
                    scrollTop: 165
                }, 300)
            })
        });
    </script>
@stop


