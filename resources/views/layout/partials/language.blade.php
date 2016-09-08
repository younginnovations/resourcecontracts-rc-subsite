<?php
$language = app('App\Http\Services\LocalizationService');
?>

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

