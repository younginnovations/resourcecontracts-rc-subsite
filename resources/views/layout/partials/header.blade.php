<div class="row">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
            @if(env("CATEGORY")=="rc")
                <link rel="icon" href="images/favicon.ico">
            <a class="navbar-brand" href="{{url()}}" >Resource <span>Contracts</span></a>
            @else
                <link rel="icon" href="olc/images/favicon.ico">
                <a class="navbar-brand" href="{{url()}}" >OPENLAND <span>Contracts</span></a>
            @endif
        </div>
        <div class="navbar-right">
            @if(!isset($show_advance))
                @include('layout.partials.search')
            @endif
        </div>
    </nav>
</div>