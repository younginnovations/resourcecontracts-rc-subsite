<?php
?>

@extends('layout.app-full')

@section('content')
	<div class="row">
		<div class="col-lg-12 panel-top-wrapper attached-top-wrapper">
			<div class="panel-top-content clearfix">
				<div class="pull-left left-top-content clearfix">
					<a href="#" class="back-button back"><span>@lang('global.go_back')</span></a>
					<div class="panel-title contract-panel-title" id="show-full-title">
						{{$contract->metadata->name}}
					</div>
				</div>
				<div class="action-links">
					<ul>
						@if($contract->pages->total>0)
							<li class="pull-left">
								<a href="{{route('contract.detail',['id'=>$contract->metadata->open_contracting_id])}}">@lang('global.view_document')</a>
							</li>
						@endif
					</ul>
				</div>
			</div>
			<div class="head-wrap">
				<div class="right-column-view">
					<div class="download-main-wrap dropdown-wrapper">
						<a class="download-wrap dropdown-toggle"> </a>
						<ul class="dropdown-menu">
							<li>
								<a href="{{route('contract.download.pdf',['id'=> $contract->metadata->open_contracting_id])}}">@lang('annotation.pdf')</a>
							</li>
							@if(!site()->isOLC() && $contract->metadata->is_ocr_reviewed == 1 && $contract->pages->total > 0)
								<li>
									<a href="{{route('contract.download',['id'=> $contract->metadata->open_contracting_id])}}">@lang('global.word_file')</a>
								</li>
							@endif
						</ul>
					</div>
					<div class="social-share dropdown-wrapper" id="social-toggler">
						<a class="dropdown-toggle"><span>@lang('contract.social_share')</span></a>
						@include('contract.partials.share')
					</div>
					@if(site()->isClipEnabled())
						<button class="clip-btn on-annotation" id="on-annotation">@lang('clip.clip_on')</button>
					@endif
				</div>
			</div>
		</div>
	</div>

	<div class="row contract-detail-wrapper">
		<div class="col-lg-12 remove-buffer-side">
			<div class="col-md-6 col-lg-6">
				<div class="panel panel-default panel-wrap panel-contract-wrap">
					<div class="panel-body">
						<div class="row">
						<ul>
							<li class="col-sm-6 ">
								<label for="">@lang('contract.open_contracting_id')</label>
								<span >{{_e($contract->metadata,'open_contracting_id','-')}}</span>
							
							</li>
							<li class="col-sm-6 publication-date">
								@if(site()->isOLC())
								<label for="">@lang('contract.posted_date')</label>

								@else
								<label for="">@lang('contract.publication_date')</label>
								@endif
								<span>
									<?php
									$date = $contract->metadata->published_at;
									$date = strtotime($date);
									?>
									<span>@if($date) <?php $m = date(
												'F',
												$date
										);?>{{ trans('codelist/month')[$m] }} {{date('d',$date)}}, {{date('Y',$date)}}@else
											- @endif</span>
							</li>
						</ul>
						<ul>
							<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<label for="">@lang('global.language')</label>
                                <span>@if((_e($contract->metadata,'language','-')))
										{{ trans('codelist/language')[$contract->metadata->language] }}
									@endif
                                </span>
							</li>
							<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<label for="">@lang('global.country')</label>
								@if($code = strtolower(_e($contract->metadata->country,'code')))
									<span>

											<?php $c = $contract->metadata->country;?>
										{{trans('country')[$c->code]}}

										@if(site()->isRC())
											@if(isset($contract->metadata->amla_url) && !empty($contract->metadata->amla_url))
												<span class="amla-link">@lang('contract.see')
													<a href="{{$contract->metadata->amla_url}}" target="_blank">
														@lang('contract.legislation')
													</a>
													&nbsp;@lang('contract.african_mining')
												</span>
											@endif
										@endif
									</span>
								@endif
							</li>
						</ul>
						<ul class="government-entity-wrap">
							<li class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<label for="">@lang('global.government_entity')</label>
								@if(isset($contract->metadata->government_entity))
									@foreach($contract->metadata->government_entity as $governmentEntity)
										<span>
                                        @if(isset($governmentEntity->name) && isset($governmentEntity->identifier) && !empty($governmentEntity->name))
												{{$governmentEntity->name}} @if($governmentEntity->identifier)
													({{$governmentEntity->identifier}})@endif
											@endif

                                    	</span>
									@endforeach
								@else
									-
								@endif
							</li>

						</ul>
						<ul>
							<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<label for="">@lang('global.signature_date')</label>
								<?php
								$date = $contract->metadata->date_signed;
								$date = strtotime($date);
								?>
								<span>@if($date) <?php $m = date(
											'F',
											$date
									);?>{{ trans('codelist/month')[$m] }} {{date('d',$date)}}, {{date('Y',$date)}}@else
										- @endif</span>
							</li>
							<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<label for="">@lang('global.document_type')</label>
                                <span><?php $d = _e($contract->metadata, 'type', '-')?>
									{{ _l('codelist/document_type',$d) }}
                                </span>
							</li>
						</ul>
						<ul>
							<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<label for="">@lang('global.type_contract')</label>
                                <span class="contract-type-list">@if(isset($contract->metadata->contract_type) && !empty($contract->metadata->contract_type) && is_array($contract->metadata->contract_type))
										@foreach($contract->metadata->contract_type as $contractype)
											<a href="{{route("search/group",['contract_type'=>$contractype])}}">{{_l('codelist/contract_type',$contractype) }}</a>
										@endforeach
									@endif
                                </span>
							</li>
							<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<label for="">@lang('global.resource')</label>
								<?php
								$resource = _e($contract->metadata, 'resource', '-');
								$resource = is_array($resource) ? $resource : [];
								?>
								<span class="resource-list">
                                @foreach($resource as $res)
										<a href="{{route("resource.detail",['key'=>urlencode($res)])}}">{{_l("resources",$res)}}</a>
									@endforeach
                            </span></li>
						</ul>


						@if(site()->isOLC())
							<ul>
								<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
									<label for="">@lang('global.land_matrix_id')</label>
                                <span>@if(isset($contract->metadata->matrix_page) && isset($contract->metadata->deal_number) && !empty($contract->metadata->matrix_page) && !empty($contract->metadata->deal_number))
										<a
										   href="{{ $contract->metadata->matrix_page }}">#{{$contract->metadata->deal_number}}</a>
									@else
										- @endif</span>
								</li>
							</ul>
						@endif


						@if(!$contract->metadata->is_contract_signed)
							<ul>
								<li>
									<label>@lang('contract.contract_not_signed')</label>
								</li>
							</ul>
						@endif
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6 col-lg-6">
				<div class="panel panel-default panel-wrap panel-annotation-wrap">
					<div class="panel-body">
						<div class="annotation-block">
							<div class="title">@if(site()->isRCCategorySite()) @lang('annotation.annotations_new') @else @lang('annotation.annotations') @endif</div>
							<ul>
								<?php $i = 0; ?>
								@forelse($contract->annotationsGroup as $category=>$annotation)
									@if($i < 5 )
										<li><a class="view-annotation-category"
											   href="#{{str_slug($category,'-')}}">{{_l('codelist/annotation.categories',$category)}}</a>
										</li>
										<?php $i++; ?>
									@endif
								@empty
									<div class="no-data">@if(site()->isRCCategorySite()) @lang('contract.annotation_message_new') @else @lang('contract.annotation_message') @endif</div>
								@endforelse
							</ul>
						</div>
						<div class="view-all-annotations">
							@if(count($contract->annotationsGroup)>0)
								<a @if(site()->isRCCategorySite()) href="#keyclauses" @else href="#annotations" @endif
								   class="view-annotation"><span>@if(site()->isRCCategorySite()) @lang('global.view_annotations_new') @else @lang('global.view_annotations') @endif</span></a>
							@else
								<a href="javascript:void();"
								   class="view-annotation disabled"><span>@if(site()->isRCCategorySite()) @lang('global.view_annotations_new') @else @lang('global.view_annotations') @endif</span></a>
							@endif
						
						</div>
					</div>
				</div>
			</div>
		</div>
		@if(isset($contract->metadata->note) && ($contract->metadata->note != ""))
			<div class="col-lg-12">
				<div class="panel panel-default panel-wrap panel-contract-wrap">
					<div class="panel-body metadata-note">
						<span>@lang('annotation.note')</span>
						{{$contract->metadata->note}}
					</div>
				</div>
			</div>
		@endif


		<div class="col-lg-12">
			<div class="panel panel-default panel-wrap panel-contract-wrap">
				<div class="panel-heading">
					@lang('contract.company')
				</div>
				@foreach($contract->metadata->participation as $company)
					<div class="panel-body panel-col3-wrap">
						<ul>
							<li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
								<label for="">@lang('contract.company_name')</label>
                                <span>@if(isset($company->company->name) && !empty($company->company->name)) <a
											href="{{route("search/group",['company_name'=>$company->company->name])}}">{{$company->company->name}} </a> @else
										- @endif</span>
							</li>
							<li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
								<label for="">@lang('contract.jurisdiction')</label>
                        <span>
                        <?php $ji = _e($company->company->identifier->creator, 'spatial', null);?>
							@if(!is_null($ji))
								{{trans('country')[strtoupper($ji)]}}
							@else
								-
							@endif
                        </span>
							</li>
							<li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
								<label for="">@lang('contract.open_corporate_ID')</label>
                                <span>
									@if(isset($company->company->opencorporates_url) && !empty($company->company->opencorporates_url))
										<a href="{{$company->company->opencorporates_url}}" target="_blank">
											{{str_limit($company->company->opencorporates_url,25)}}
										</a>
									@else
										-
									@endif
								</span>
							</li>
						</ul>
						<ul>
							<li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
								<label for="">@lang('contract.company_add')</label>
								<span>{{_e($company->company,'address','-')}}</span>
							</li>
							<li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
								<label for="">@lang('contract.company_number')</label>
								<span>{{_e($company->company->identifier,'id','-')}}</span>
							</li>
							<li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
								<label for="">@lang('contract.corporate_grouping')</label>
                                <span>
									@if(isset($company->company->corporate_grouping) && !empty($company->company->corporate_grouping))
										<a href="{{route("search/group",
										['corporate_group'=>$company->company->corporate_grouping])}}">{{$company->company->corporate_grouping}} </a>
									@else
										-
									@endif

                                </span>
							</li>
						</ul>
						@if(!site()->isOLC())
							<ul>
								<li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
									<label for="">@lang('contract.registration_agency')</label>
									<span>{{_e($company->company->identifier->creator,'name','-')}}</span>
								</li>
								<li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
									<label for="">@lang('contract.share')</label>
                                <span>
                                    <?php
									$ps = _e($company, 'share', '');
									echo ($ps == '') ? '-' : $ps * 100 .'%';
									?>
                                    </span>
								</li>
								<li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
									<label for="">@lang('contract.operator')</label>

									<span>
										@if(isset($company->is_operator))
											@if($company->is_operator==true)
												@lang('global.yes')
											@elseif($company->is_operator==false)
												@lang('global.no')
											@else
												-
											@endif
										@endif
									</span>
								</li>
							</ul>
						@endif
					</div>
				@endforeach
			</div>
		</div>

		<div class="col-lg-12">
			<section class="panel panel-default panel-wrap panel-contract-wrap" id="associatedcontracts">
				<div class="panel-heading">
					@lang('contract.associated_documents')
				</div>
				<div class="panel-body panel-table">
					<table class="table table-responsive table-contract table-associated-contract">
						<tbody>

						@foreach($contract->metadata->parent as $parentContract)
							<tr>
								<td width="70%">
									@if($parentContract->is_published==1)
										<a href="{{route('contract.detail',
										['id'=>$parentContract->open_contracting_id])}}">{{$parentContract->name}}</a>
										&nbsp; @lang('contract.main_contract')
									@else
										{{$parentContract->name}} @lang('contract.main_contract')
									@endif
								</td>
							</tr>
						@endforeach

                        <?php
                        $supportingContracts = _e($contract->metadata, 'associated', []);
                        $style = !empty($contract->metadata->parent)?"padding-left: 60px !important;":"";
                        $counter = 0;
                        ?>
						@foreach($contract->metadata->associated as $supportingContract)
							<?php $counter++;?>
							@if($counter==1 && !$contract->metadata->is_associated_document)
								<tr>
									<td width="70%" style="padding-left: 10px !important;" class="greyed">
										<span> {{$contract->metadata->name}} @lang('contract.main_contract')</span>
									</td>
								</tr>
							@endif
							@if($supportingContract->is_published==1)
								<tr>
									<td width="70%" style="<?php echo $style;?>">
										<a href="{{route('contract.detail',
										['id'=>$supportingContract->open_contracting_id])}}"> {{$supportingContract->name}}</a>
									</td>
								</tr>
							@endif
						@endforeach

						@if(empty($contract->metadata->parent) && empty($contract->metadata->associated))
							<tr>
								<td class="no-data">
									@lang('contract.ass_doc_msg')
								</td>
							</tr>
						@endif
						</tbody>
					</table>
				</div>
			</section>
		</div>

		@if(!site()->isOLC())
			<div class="col-lg-12">
				<div class="panel panel-default panel-wrap panel-contract-wrap">
					<div class="panel-heading">
						@lang('contract.concession')
					</div>
					<div class="panel-body">
						<ul>
							<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<label for="">@lang('contract.project_title')</label>
								<span>{{_e($contract->metadata->project,'name','-')}}</span>
							</li>
							<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<label for="">@lang('contract.project_identifier')</label>
								<span>{{_e($contract->metadata->project,'identifier','-')}}</span>
							</li>
						</ul>
						<ul>
							<?php
							$concessions = _e($contract->metadata, 'concession', []);
							?>
							@foreach($concessions as $concession)
								<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
									<label for="">@lang('contract.license_name')</label>
									<span>{{_e($concession,'name','-')}}</span>
								</li>
								<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
									<label for="">@lang('contract.license_identifier')</label>
									<span>{{_e($concession,'identifier','-')}}</span>
								</li>
							@endforeach
						</ul>
					</div>
				</div>
			</div>
		@endif
		<div class="col-lg-12">
			<div class="panel panel-default panel-wrap panel-contract-wrap">
				<div class="panel-heading">
					@lang('contract.source')
				</div>
				<div class="panel-body">
					<ul>
						<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
							<label for="">@lang('contract.source_url')</label>
                            <span>@if(!empty(_e($contract->metadata,'source_url')))<a
										href="{{$contract->metadata->source_url}}"
										target="_blank">{{str_limit($contract->metadata->source_url,50)}}</a>@else
									-@endif</span>
						</li>
						<li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
							<label for="">@lang('contract.disclosure_mode')</label>
                            <span>
                                @if(!empty($contract->metadata->publisher->type))
									<?php $a = $contract->metadata->publisher->type ?>
									{{_l("codelist/disclosure",$a)}}
									@if(!empty($contract->metadata->publisher->note))
										( {{$contract->metadata->publisher->note}} )
									@endif
								@else -
								@endif
                            </span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	@if(count($contract->annotationsGroup)>0)
		<div class="row annotation-list-wrapper"	@if(site()->isRCCategorySite()) id="keyclauses" @else id="annotations" @endif>
			<div class="col-lg-12">
				<div class="panel panel-default panel-wrap panel-annotation-list-wrap">
					<div class="panel-heading clearfix">
						<div class="annotation-left">
							{{count($contract->annotationsGroup)}}
							@if(count($contract->annotationsGroup) > 1)
								@if(site()->isRCCategorySite()) @lang('annotation.annotations_new') @else @lang('annotation.annotations') @endif
							@else
								@if(site()->isRCCategorySite()) @lang('annotation.annotation_new') @else @lang('annotation.annotation') @endif
							@endif
						</div>
						@if(site()->isClipEnabled())
							<button id="clip-all-annotations" class="pull-right annotation-clip clipToggleElems static"
									content="Clip all annotations">
								<span class="link">@lang('clip.clip_all')</span>
							</button>
						@endif
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-md-4">
								<div class="annotation-category-cluster">
									<ul>
										@foreach($contract->annotationsCluster as $cluster=>$value)
											<li>
												<a href="#cluster-{{str_slug($cluster,'-')}}">  {{_l('annotation', snake_case($cluster))}}</a>
											</li>
										@endforeach
									</ul>
								</div>
							</div>

							<div class="col-md-8">
								@forelse($contract->annotationsCluster as $cluster => $annotations)
									<div id="cluster-{{str_slug($cluster,'-')}}" class="cluster-wrap">
										<div class="category-title">
											{{_l('annotation', snake_case($cluster))}}
										</div>
										<?php ksort($annotations);?>
										@foreach($annotations as $annotation)
											<?php $annotation = array_values($annotation)[0][0];?>
											<div>

												<div id="{{str_slug($annotation->category,'-')}}"
													 class="sub-category clearfix">
													<a href="#{{str_slug($annotation->category,'-')}}"><i
																class='glyphicon glyphicon-link'
																style="display:none;"></i></a>
													<div class="annotation-left">
														{{_l('codelist/annotation.categories',$annotation->category_key)}}
													</div>
													@if(site()->isClipEnabled())
														<button data-id="{{ $annotation->annotation_id }}"
																data-popover="true"
																data-html="false"
																data-content="@lang('clip.clip_annotation')"
																class="pull-right annotation-clip-icon static clipToggleElems">

																@lang('clip.clips')

														</button>
													@endif
												</div>
												<div class="annotation-text">
													{{$annotation->text}}
												</div>
												<div class="annotation-page">
													<?php
													$pages = collect($annotation->pages);
													$pages = $pages->groupBy('page_no');
													$j = 0;
													$route_split_key = site()->isRC()?'tagged':'annotation';
													?>
													@foreach($pages as $refs)
														<?php  $page = $refs[0]; $j++;?>
														@lang('annotation.page') {{_e($page,'page_no')}}
														@foreach($refs as $key => $ref)
															@if($ref->article_reference !='')
																<?php $page_type = isset($page->shapes) ? 'pdf' : 'text'; ?>
																(
																<a href="{{route('contract.detail',['id'=>$contract->metadata->open_contracting_id])}}#/{{$page_type}}/page/{{$ref->page_no}}/{{$route_split_key}}/{{$ref->id}}">
																	{{$ref->article_reference}}
																</a>
																)
																@if($key < (count($refs)-1))
																	,
																@endif
															@endif
														@endforeach
														@if($j < ($pages->count()))
															,
														@endif
													@endforeach
												</div>
											</div>
										@endforeach
									</div>
								@empty

									<div class="category-wrap">
										<ul>
											<li class="no-data">@if(site()->isRCCategorySite()) @lang('contract.annotation_message_new') @else @lang('contract.annotation_message') @endif</li>
										</ul>
									</div>
								@endforelse
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	@endif
@stop

@section('js')
	<script>
		var lang = <?php echo json_encode(trans('annotation'));?>;

		function isScrolledTo(elem) {
			if (elem.length < 1) {
				return;
			}
			var docViewTop = $(window).scrollTop(); //num of pixels hidden above current screen
			var docViewBottom = docViewTop + $(window).height();

			var elemTop = $(elem).offset().top; //num of pixels above the elem
			var elemBottom = elemTop + $(elem).height();

			return ((elemTop <= docViewTop));
		}

		var catcher = $('.contract-detail-wrapper');
		var sticky = $('.annotation-category-cluster');

		$(document).on("ready scroll",onScroll),$('.annotation-category-cluster a[href^="#"]').on("click",function(o){o.preventDefault(),$(document).off("scroll"),$(".annotation-category-cluster ul li a").removeClass("active"),$(this).addClass("active");var t=this.hash,n=$(t);$("html, body").stop().animate({scrollTop:n.offset().top+2},600,"swing",function(){window.location.hash=t,$(document).on("scroll",onScroll)})});


		function onScroll(){var t=$(document).scrollTop();$(".annotation-category-cluster ul li a").each(function(){var o=$(this),e=$(o.attr("href"));if(e.offset().top<=t&&e.offset().top+e.height()>t)return $(".annotation-category-cluster ul li a").removeClass("active"),o.addClass("active"),!1;$($(".annotation-category-cluster ul li a").eq(0).attr("href")).offset().top>t&&$(".annotation-category-cluster ul li a").removeClass("active").eq(0).addClass("active")}),isScrolledTo(sticky)&&sticky.css({position:"fixed",left:"36px",top:"20px"});var o=catcher.offset().top+catcher.height()+240;sticky.length>0&&o>sticky.offset().top&&sticky.css({position:"absolute",left:0,top:0})}


		var isScrolledIntoView = function (elem) {
			var $elem = $(elem);
			var $window = $(window);

			var docViewTop = $window.scrollTop();
			var docViewBottom = docViewTop + $window.height();

			var elemTop = $elem.offset().top;
			var elemBottom = elemTop + $elem.height();

			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		};

		$(window).on('scroll', function () {
			$('.annotation-category-cluster').toggle(!isScrolledIntoView('footer'));
		});

	</script>
@stop
