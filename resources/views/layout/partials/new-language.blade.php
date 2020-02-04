<?php
$language = app('App\Http\Services\LocalizationService');
?>

@if($language->isEnabled())
    @foreach ($language->switcher() as $lang)
    <li>
        <a href={{lang_url($lang['code'])}} @if($language->getCurrentLang() == $lang['code']) class="active" @endif>{{strtoupper($lang['code'])}}</a>
    </li>
    @endforeach
@endif 