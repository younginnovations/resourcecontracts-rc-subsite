@extends('layout.app-page')
@section('css')
@stop
@section('content')
    @if(auth()->isloggedIn())
        <div class="edit-mode"><div>@lang('admin.editing')<a target="_blank" href="{{route('admin.page.edit', ['id'=>$page->id])}}">@lang('admin.click_here')</a> @lang('admin.to_edit') - <a href="{{url('logout')}}">@lang('adminlogout')</a></div></div>
    @endif
    <div class="content-static-wrap">
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
       $(function(){$("#scroll-able").find("strong").each(function(t){$(this).attr("id","faq-"+(t+1)),$("#nav").append('<li><span data-target="#faq-'+(t+1)+'" >'+$(this).text()+"</span>")}),$("#nav li>span").click(function(){var t=$(this).attr("data-target"),a=$(t).offset().top-25;$("#nav li>span").removeClass("active"),$(this).addClass("active"),$("#scroll-able strong").removeClass("active"),$(t).addClass("active"),$("html,body").animate({scrollTop:a},300)});var t=$("#target-nav"),a=t.offset().top,o=$(window).height(),i=t.parents("#content").offset().top,n="";$(window).scroll(function(){if(window.matchMedia("(min-width: 1000px)").matches){var s=$(window).scrollTop(),e=$("footer").innerHeight(),c=t.innerHeight(),l=$("body").height()-e-50-s;c==l&&(n=s-i),s>a-25?l<=c?t.css({position:"absolute",top:n+"px"}):t.css({position:"fixed",top:"25px"}):t.css({position:"absolute",top:"auto"})}s>o-200?$(".faq-back-to-top").fadeIn(200):$(".faq-back-to-top").fadeOut(200)}),$(".faq-back-to-top").click(function(){$("body,html").animate({scrollTop:165},300)})});
    </script>
@stop


