<div class="front-row-top-wrap">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse"
                    data-target-2=".sidebar-collapse-container"
                    class="pull-left trigger">
            </span>
            @include('layout.partials.new-logo')
        </div>
        <div class="navbar-right">
            @if(site()->isRC())
                <div class="guide-link"><a href="{{route('research-and-analysis')}}">@lang('global.research_and_analysis')</a></div>
            @endif
            @if(site()->isOLC())
                <div class="guide-link"><a href="{{route('guides')}}">@lang('sidebar.use_this_site')</a></div>
            @endif
            <ul>
            @include('layout.partials.new-language')
            </ul>
        </div>
    </nav>
</div>