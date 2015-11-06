@extends('layout.app')
@section('css')
@stop
@section('content')
    @if(auth()->isloggedIn())
        <div class="edit-mode"><div>You are in editing mode. Please <a target="_blank" href="{{route('admin.page.edit', ['id'=>$page->id])}}">click here</a> to edit page - <a href="{{url('logout')}}">Logout</a></div></div>
    @endif
    <div class="content-wrap">
        <h1 id="title">{{$page->title()}}</h1>
        <div id="content">
                <nav id="target-nav" class="col-md-4 scrollspy side-link-nav">
                    <ul id="nav" class="nav hidden-xs hidden-sm" data-spy="affix">
                        @foreach($page->faqContent() as $key => $faq)
                            <li>
                                <a href="#faq-{{$key}}">{{strip_tags($faq['a'])}}</a>
                            </li>
                        @endforeach
                    </ul>
                </nav>

                <div id="scroll-able" class="col-md-8 col-md-offset-4" data-spy="scroll" data-target="#target_nav">
                    @foreach($page->faqContent() as $key => $faq)
                        <section id="faq-{{$key}}">
                            <div class="title">{{strip_tags($faq['a'])}}</div>
                            {!!$faq['q']!!}
                        </section>
                    @endforeach
                </div>
        </div>
    </div>
@stop

@section('js')
    <script>
        $(function() {
            $('#nav').affix({
                offset: {
                    top: $('#nav').offset().top - 200
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

    $(function () {
  
  var msie6 = $.browser == 'msie' && $.browser.version < 7;
  
  if (!msie6 && $('#target-nav').offset()!=null) {
    var top = $('#target-nav').offset().top - parseFloat($('#target-nav').css('margin-top').replace(/auto/, 0));
    var height = $('#target-nav').height();
    var winHeight = $(window).height(); 
    var footerTop = $('footer').offset().top - parseFloat($('footer').css('margin-top').replace(/auto/, 0));
    var gap = 7;
    $(window).scroll(function (event) {
      // what the y position of the scroll is
      var y = $(this).scrollTop();
      
      // whether that's below the form
      if (y+winHeight >= top+ height+gap && y+winHeight<=footerTop) {
        // if so, ad the fixed class
        $('#target-nav').addClass('leftsidebarfixed').css('top',winHeight-height-gap +'px');
      } 
      else if (y+winHeight>footerTop) {
        // if so, ad the fixed class
       $('#target-nav').addClass('leftsidebarfixed').css('top',footerTop-height-y-gap+'px');
      } 
      else    
      {
        // otherwise remove it
        $('#target-nav').removeClass('leftsidebarfixed').css('top','0px');
      }
    });
  }  
});

    
    
    </script>
    </html>
@stop


