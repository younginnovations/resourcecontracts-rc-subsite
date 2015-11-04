@extends('layout.app')
@section('css')
<style>
    .affix,.affix-top {
        position: fixed;
        top: 5em;
        width: 20.45em;
    }

    .affix-bottom {
        position: absolute;
        width: 20.45em;
    }

    @media (min-width: 1200px) {
        .affix-bottom {
            width: 20.45em;
        }
    }

    body {
        position: relative;
    }

    .side-link-nav .nav .active {
        font-weight: bold;
    }

    .nav .nav {
        display: none;
    }

    .nav .active .nav {
        display: block;
    }

    .nav .nav a {
        font-weight: normal;
        font-size: .85em;
    }

    .nav .nav span {
        margin: 0 5px 0 2px;
    }

    .nav .nav .active a,
    .nav .nav .active:hover a,
    .nav .nav .active:focus a {
        font-weight: bold;
        border-left: 5px solid black;
    }

    .nav .nav .active span,
    .nav .nav .active:hover span,
    .nav .nav .active:focus span {
        display: none;
    }
</style>
@stop
@section('content')
    @if(auth()->isloggedIn())
        <div class="edit-mode"><div>You are in editing mode. Please <a target="_blank" href="{{route('admin.page.edit', ['id'=>$page->id])}}">click here</a> to edit page - <a href="{{url('logout')}}">Logout</a></div></div>
    @endif
    <div class="content-wrap">
        <h1 id="title">{{$page->title()}}</h1>
        <div id="content">


                <div id="scroll-able" class="col-md-9" data-spy="scroll" data-target="#target_nav">
                    @foreach($page->faqContent() as $key => $faq)
                        <section id="faq-{{$key}}">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <h2 class="text-center">{{strip_tags($faq['a'])}}</h2>
                                    {!!$faq['q']!!}
                                </div>
                            </div>
                        </section>
                    @endforeach
                </div>
                <nav id="target-nav" class="col-md-3 scrollspy side-link-nav">
                    <ul id="nav" class="nav hidden-xs hidden-sm affix" data-spy="affix">
                        @foreach($page->faqContent() as $key => $faq)
                            <li>
                                <a href="#faq-{{$key}}">{{strip_tags($faq['a'])}}</a>
                            </li>
                        @endforeach
                    </ul>
                </nav>
        </div>
    </div>
@stop

@section('js')
    <script>
        $(function() {
            $('#nav').affix({
                offset: {
                    top: $('#nav').offset().top
                }
            });

            $('a[href*=#]:not([href=#])').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        });
    </script>
    </html>
@stop


