<?php
$language = app('App\Http\Services\LocalizationService');
?>
<div class="floated-top-div">
	@if(isClipOn())
		<div class="clip-head">
			<a href="{{route('clip.index')}}" id="annotation-count" style="display: none"></a>
			<a href="#" class="" id="hide-annotation" style="display: none">@lang('clip.hide')</a>
		</div>
	@endif
	@if($language->isEnabled())
		<div class="dropdown language-selector">
			<ul>
				@foreach ($language->getAllLang() as $locale => $lang)
						<li>
							<a @if($language->getCurrentLang() == $locale) class="active" @endif href={{lang_url($locale)}}>
								{{$lang['code']}}
							</a>
						</li>
				@endforeach
			</ul>
		</div>
	@endif

</div>
