@extends('layout.admin')

@section('css')
	<style>
		.select2-container {
			width: 200px !important;
		}
	</style>
@stop

@section('content')
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">@lang('admin.manage_language')</h3>
		</div>
		<div class="panel-body">
			<form action="{{route('admin.language.update')}}" method="POST">
				<div class="form-group">
					<label for="lang-default">@lang('admin.default_lang'):</label>
					<select class="form-control" id="lang-default" name="site_lang[default]">
						@foreach($locale as $lang)
							<option @if(isset($language->default) &&  $language->default== $lang['code']) selected="selected"
									@endif
									value="{{$lang['code']}}">{{$lang['name']}}</option>
						@endforeach
					</select>
				</div>
				<hr/>
				<div class="form-group">
					<div class="checkbox">
						<label><input @if(isset($language->enable) && $language->enable) checked="checked" @endif
							name="site_lang[enable]" type="checkbox" id="lang-enable"
									  value="1"> @lang('admin.enable_localization')</label>
					</div>
				</div>
				<hr/>
				<div class="form-group" @if(!isset($language->enable) || $language->enable !=1) style="display: none"
					 @endif id="lang-available">
					<label>@lang('admin.choose_lang') :</label>
					@foreach($locale as $lang)
						<div class="checkbox">
							<label><input
										@if((isset($language->available) && in_array($lang['code'], $language->available)) || (isset($language->default) && ($language->default ==$lang['code']))) checked="checked"
										@endif
										@if(isset($language->available) && $language->default == $lang['code']) disabled="disabled"
										@endif name="site_lang[available][]" type="checkbox"
										value="{{$lang['code']}}">{{$lang['name']}}</label>
						</div>
					@endforeach
					<hr/>
				</div>
				<div class="form-group">
					<div class="col-md-6 col-md-offset-2">
						<button type="submit" class="btn btn-primary">@lang('admin.submit')</button>
					</div>
				</div>
			</form>
		</div>
	</div>
@stop


@section('js')
	<script>
		$(function () {
			$('#lang-default').on('change', function () {
				var selected = $(this).val();
				$('#lang-available').find('input').each(function () {
					$(this).attr('disabled', false);

					if ($(this).val() == selected) {
						$(this).prop('checked', true);
						$(this).attr('disabled', true);
					}
				});
			});

			$('#lang-enable').on('change', function () {
				if ($(this).is(':checked')) {
					$('#lang-available').show()
				} else {
					$('#lang-available').hide()
				}
			});
		});
	</script>
@stop