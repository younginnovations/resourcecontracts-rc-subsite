<?php $local = app('App\Http\Services\LocalizationService');
?>
<div class="row">



    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <div class="dropdown language-selector">
                <button class="btn dropdown-toggle"  data-toggle="dropdown" id="dropdownMenu2" aria-expanded="false">
                    {{config('language')[$local->getLanguage()]['name']}}
                    <span class="caret"></span>
                </button>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">

                    @foreach (config('language') as $locale => $language)
                        <li><a href={{ url(Request::url().'?lang='.$locale)}}>{{$language['name']}}</a></li>
                    @endforeach

                </ul>
            </div>
            <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
            @if(env("CATEGORY")=="rc")
            <a class="navbar-brand" href="{{url()}}" >Resource <span class="beta">Beta</span><span>Contracts</span></a>
            @else
            <a class="navbar-brand" href="{{url()}}" >OPENLAND <span class="beta">Beta</span><span>Contracts</span></a>
            @endif
        </div>
        <div class="col-sm-12 col-md-9 col-lg-10 navbar-right">
            @if(!isset($show_advance))
                @include('layout.partials.search')
            @endif
        </div>
    </nav>
</div>