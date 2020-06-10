<?php
$language = app('App\Http\Services\LocalizationService');
?>

@if($language->isEnabled())
	<!-- <div class="dropdown language-selector"> -->
		<ul>
			@foreach ($language->switcher() as $lang)
				<li>
					<a @if($language->getCurrentLang() == $lang['code']) class="active"
					   @endif href={{lang_url($lang['code'])}}>
						{{$lang['code']}}
					</a>
				</li>
			@endforeach
		</ul>
	<!-- </div> -->
@endif

