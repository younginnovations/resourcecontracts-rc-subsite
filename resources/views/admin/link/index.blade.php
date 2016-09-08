@extends('layout.admin')

@section('content')
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">@lang('admin.update_home_page_link')</h3>
		</div>
		<div class="panel-body">
			<form  action="{{route('admin.link.update')}}" method="POST">
				<ul class="nav nav-tabs" role="tablist">
					@foreach(config('language') as $code=>$lang)
						<li role="page" @if($code == 'en') class="active" @endif ><a href="#{{$code}}" aria-controls="{{$code}}" role="tab" data-toggle="tab">{{$lang['name']}}</a></li>
					@endforeach
				</ul>
				<div class="tab-content" style="padding-top: 20px;">
					@foreach(config('language') as $code=>$lang)
						<div role="tabpanel" class="tab-pane @if($code == 'en') active @endif " id="{{$code}}">
						@for($i=0;$i<3;$i++)
							<div class="form-group">
								<label for="title_{{$i}}">@lang('admin.title') {{$i+1}}:</label>
								<input id="title_{{$i}}" class="form-control"
									   name="link[{{$i}}][title][{{$code}}]"
									   value="{{$links[$i]->title->$code or ''}}"/>
							</div>
								<div class="form-group">
									<label for="url_{{$i}}">@lang('admin.url'):</label>
									<input id="url_{{$i}}" class="form-control"
										   name="link[{{$i}}][url][{{$code}}]"
										   value="{{$links[$i]->url->$code or ''}}"/>
								</div>
						@endfor
						</div>
					@endforeach
				</div>

				<div class="form-group">
					<div class="col-md-6 col-md-offset-2">
						<button type="submit" class="btn btn-primary">@lang('admin.save')</button>
						<a class="btn btn-default" href="{{route('admin.link')}}">@lang('global.cancel')</a>
					</div>
				</div>
			</form>
		</div>
	</div>
@stop