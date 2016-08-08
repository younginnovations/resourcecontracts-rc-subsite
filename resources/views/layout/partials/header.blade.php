<?php $local = app('App\Http\Services\LocalizationService');?>
<div class="row">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        @include('layout.partials.logo')
        <div class="right-header-section navbar-right">
                @include('layout.partials.searchdropdown')
        </div>
        @if(config('localisation'))
            <div class="dropdown language-selector" >
                <button class="btn  dropdown-toggle"  data-toggle="dropdown" id="dropdownMenu2" aria-expanded="false">
                    <img style="width: 16px ; height: 16px; margin-right: 6px;" src="{{getCountryByLang(app('translator')->getLocale())}}"/>{{config('language')[app('translator')->getLocale()]['name']}}
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" style="min-width: 110px;">
                    @foreach (config('language') as $locale => $language)
                        @if(app('translator')->getLocale()!=$locale)
                            <li>
                                <a href={{lang_url($locale)}}>
                                    <img style="width: 16px ; height: 16px; margin-right: 6px;" src="{{getCountryByLang($locale)}}"/>
                                    {{$language['name']}}
                                </a>
                            </li>
                        @endif
                    @endforeach
                </ul>
            </div>
        @endif
    </nav>
</div>