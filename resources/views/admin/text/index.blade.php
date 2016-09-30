@extends('layout.admin')

@section('content')
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">@lang('admin.updateText')</h3>
		</div>
		<div class="panel-body">
			<form  action="{{route('admin.text.update')}}" method="POST">
				<ul class="nav nav-tabs" role="tablist">
					@foreach(config('language') as $code=>$lang)
						<li role="page" @if($code == 'en') class="active" @endif ><a href="#{{$code}}" aria-controls="{{$code}}" role="tab" data-toggle="tab">{{$lang['name']}}</a></li>
					@endforeach
				</ul>
				<div class="tab-content" style="padding-top: 20px;">
					@foreach(config('language') as $code=>$lang)
						<div role="tabpanel" class="tab-pane @if($code == 'en') active @endif " id="{{$code}}">
							<div class="form-group">
								<label for="homepage_text">@lang('admin.homepage'):</label>
								<textarea id="homepage_text" style="width:100%; height:100px"  class="{{$code}}"
										  name="homepage_text[{{$code}}]" >{{$text->homepage_text->$code or ''}}</textarea>
							</div>

							<div class="form-group">
								<label for="footer_text">@lang('admin.footer_text'):</label>
								<textarea id="footer_text" style="width:100%; height:100px"  class="{{$code}}"
										  name="footer_text[{{$code}}]" >{{$text->footer_text->$code or ''}}</textarea>
							</div>
						</div>
					@endforeach
				</div>

				<div class="form-group">
					<div class="col-md-6 col-md-offset-2">
						<button type="submit" class="btn btn-primary">@lang('admin.submit')</button>
						<a class="btn btn-default" href="{{route('admin.page')}}">@lang('global.cancel')</a>
					</div>
				</div>
			</form>
		</div>
	</div>
@stop