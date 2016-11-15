<?php
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Request;
$api = app('App\Http\Services\APIService');

$url = Request::all();
$path = Request::path();
$order = \Illuminate\Support\Facades\Input::get('order', '');
$sortBy = \Illuminate\Support\Facades\Input::get('sortby', '');
$route = Request::path();
$showYear = true;

if ($route == "contracts" && isset($url['year'])) {
	$showYear = false;
}
?>

<table class="table table-responsive table-contract table-contract-list">
	<thead>
		<th></th>
		<th width="50%">
			<a href="{{appendInUrl($route,$url,"contract_name",$order)}}">@lang('global.document') {!!show_arrow($order, $sortBy=='contract_name')!!}</a>
		</th>
		<th></th>
		@if(!site()->isCountrySite())
			<th width="12%"><a href="{{appendInUrl($route,$url,"country",$order)}}">@lang('global.country') {!!show_arrow
					($order, $sortBy=='country')!!}</a>
			</th>
		@endif
		@if($showYear)
			<th>
				<a href="{{appendInUrl($route,$url,"year",$order)}}">
					@lang('global.year')
					{!!show_arrow($order, $sortBy=='year')!!}
				</a>
			</th>
		@endif
		<th width="13%">
			<a href="{{appendInUrl($route,$url,"resource",$order)}}">
				@lang('global.resource')
				{!!show_arrow($order, $sortBy=='resource')!!}
			</a>
		</th>
		<th width="25%">
			<a href="{{appendInUrl($route,$url,"contract_type",$order)}}">
				@lang('contract.contract_type')
				{!!show_arrow($order, $sortBy=='contract_type')!!}
			</a>
		</th>
	</thead>
	<tbody>
	@forelse($contracts->results as $contract)
		<?php $annotations = $api->getAnnotations($contract->id);?>
		<tr>
			<td></td>
			<td>
				<a class="title-{{$contract->open_contracting_id}}"
				   href="{{ url(sprintf("/contract/%s/view#/pdf", $contract->open_contracting_id )) }}">
					{{ $contract->name or ''}}
				</a>
				<?php $link = sprintf('/contract/%s#annotations', $contract->open_contracting_id);?>
				@if($annotations->total>0)
					<div class="annotate-text" data-popover="true" data-html=true
						 data-content="@if(site()->isRC())@lang('global.annotated', ['link' => url($link)])
						 @else @lang('global.annotated_no_link') @endif ">
					</div>
				@endif
				<div class="search-text">
					@if(isset($contract->text ) && $contract->text !='')
						<p>
							<a href="{{ url(sprintf("/contract/%s/view#/search/%s", $contract->open_contracting_id ,rawurlencode($url['q']))) }}">
								{!!$contract->text.'...'!!}
								<span class="contract-group">@lang('global.text')</span>
							</a>
						</p>
					@endif

					@if(isset($contract->annotations ) && !empty($contract->annotations))
						<p>
							<a href="{{ url(sprintf("/contract/%s/view#/pdf/page/%s/annotation/%s", $contract->open_contracting_id ,$contract->annotations->page_no , $contract->annotations->annotation_id  )) }}">
								{!! $contract->annotations->annotation_text ." pg " .$contract->annotations->page_no !!}
								<span class="contract-group">@lang('global.annotation') </span>
							</a>
						</p>
					@endif

					@if(isset($contract->metadata ) && $contract->metadata !='')
						<p>
							<a href="{{ route('contract.view' , ['id' => $contract->open_contracting_id]) }}">
								{!! $contract->metadata.'...' !!}
								<span class="contract-group">@lang('global.metadata')</span>
							</a>
						</p>
					@endif
				</div>
				@if($annotations->total>0)
					@if(\Illuminate\Support\Facades\Input::has('annotation_category'))
						<?php $annotation_categories = \Illuminate\Support\Facades\Input::get('annotation_category')?>
						@foreach($annotation_categories as $category)
							<?php
							$annotation = searchInArray($annotations->result, 'category', $category);
							?>
							@if($annotation)
								<?php $annotation_type = isset($annotation['shapes']) ? 'pdf' : 'text'; ?>
								{{str_limit($category,50)}}-
								<span style="color: #404040;">
										{{str_limit($annotation['text'],50)}}
								</span>
								<a style="float: none"
								   href="{{route('contract.detail',['id'=>$contract->open_contracting_id])}}#/{{$annotation_type}}/page/{{$annotation['page_no']}}/annotation/{{$annotation['id']}}">
									[Pg {{$annotation['page_no']}}]
								</a>
								<br>
							@endif
						@endforeach
					@endif
				@endif
			</td>
			<td>
				<div class="contract-info-section">
					<div class="download-main-wrap">
						<div class="download-wrap">
							<span>@lang('global.download')</span>
						</div>
						<ul class="dropdown-menu">
							<li>
								<a href="{{route('contract.download.pdf',['id'=> $contract->open_contracting_id])}}">@lang('annotation.pdf')</a>
							</li>
							@if(!site()->isOLC() && $contract->is_ocr_reviewed == true)
								<li>
									<a href="{{route('contract.download',['id'=> $contract->open_contracting_id])}}">@lang('annotation.word_file')</a>
								</li>
							@endif
							@if($annotations->total>0)
								<li>
									<a href="{{route('contract.annotations.download',['id'=> $contract->open_contracting_id])}}">@lang('annotation.annotations_excel')</a>
								</li>
							@endif
						</ul>
					</div>
				</div>
			</td>
			@if( !site()->isCountrySite() && $contract->country_code !='')
				<td>
					<img style="width: 24px ; height: auto" src="{{getFlagUrl($contract->country_code)}}"/>
					<span class="country-name-title">{{@trans('country')[$contract->country_code]}}</span>
				</td>
			@endif
			@if($showYear)
				@if($contract->year_signed !='')
					<td>{{$contract->year_signed}}</td>
				@else
					<td></td>
				@endif
			@endif
			<td>
				<?php
				if (isset($url['sortby']) && $url['sortby'] == "resource") {
					if ($url['order'] == "asc") {
						asort($contract->resource);
					}
					if ($url['order'] == "desc") {
						rsort($contract->resource);
					}
				}
				?>
				<ul>
					@forelse($contract->resource as $resource)
						@if(!empty($resource))
							<li>
								@if(Lang::has('resources.'.$resource))
									@lang('resources.'.$resource)
								@else
									{{ $resource }}
								@endif
							</li>
						@else
							-
						@endif
					@empty
						-
					@endforelse
				</ul>
			</td>
			<td>
				<ul>
					@if(is_array($contract->contract_type))
						@foreach($contract->contract_type as $contracttype)
							@if(!empty($contracttype))
								<li>
									@if(Lang::has('codelist/contract_type.'.$contracttype))
										{{ trans('codelist/contract_type')[$contracttype] }}
									@else
										{{ $contracttype }}
									@endif
								</li>

							@else
								-
							@endif
						@endforeach
					@endif
				</ul>
			</td>
		</tr>
	@empty
		<tr>
			<td colspan="100%" class="search-not-found">
				@lang('search.search_not_found' , ['link' => route('contracts')])
			</td>
		</tr>
	@endforelse
	</tbody>
</table>