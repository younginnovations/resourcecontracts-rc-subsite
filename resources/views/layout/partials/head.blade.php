<?php
if (empty($meta)) {
	$meta = [];
}
$langSelect  = trans('search.select');
$title       = (isset($meta['title'])) ? site()->meta('title').' - '.$meta['title'] : site()->meta('title');
$description = (isset($meta['description'])) ? $meta['description'] : site()->meta('description');
$favicon     = site()->getImageUrl('favicon', 'ico');
$gtmID      =  site()->getEnv("GTM_ID");
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>{{$title}}</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="{{ $description }}"/>
	<meta name="robots" content="noodp"/>
	<meta property="og:type" content="website"/>
	<meta property="og:title" content="{{ $title }}"/>
	<meta property="og:image" content="{{ site()->getImageUrl('bg')}}"/>
	<meta property="og:description" content="{{ $description}}"/>
	<meta property="og:url" content="{{ Request::url() }}"/>
	<meta name="twitter:title" content="{{ $title }}"/>
	<meta name="twitter:image" content="{{ site()->getImageUrl('bg')}}"/>
	<link rel="icon" href="{{$favicon}}">
	<style>



	</style>

	<link rel="stylesheet" href="{{url('css/style.css?v=1.08')}}">
    <link rel="stylesheet" href="{{url('css/new.css?v=1.08')}}">
    @if(site()->isRC())
        <link rel="stylesheet" href="{{url('css/new-rc.css?v=1.0')}}" media="print" onload="this.media='all'"/>
    @elseif(site()->isOLC())
        <link rel="stylesheet" href="{{url('css/new-olc.css?v=1.0')}}" media="print" onload="this.media='all'"/>
    @endif
	@yield('css')

    @if($gtmID != '')
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','{{$gtmID}}');</script>
        <!-- End Google Tag Manager -->
    @endif
    <!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
    <script src="{{url('js/plugins-bundle.js')}}"></script>
	<script>
		var app_url = '{{ url()}}';
		var langSelect = '{{$langSelect}}';
		var langClip =  {!! json_encode(trans('clip')) !!};
		var langContract = {!! json_encode(trans('contract')) !!};
		var langAnnotation = {!! json_encode(trans('annotation')) !!};
		var annotationTerms = {
			annotation_category: @if(site()->isRCCategorySite()) langClip.key_clause @else langClip.category @endif ,
			annotation_text: @if(site()->isRCCategorySite()) langClip.clause_summary @else langClip.text @endif,
			annotation_text_predefined_placeholder: @if(site()->isRCCategorySite()) langClip.clause_summary_not_prepared @else langClip.annotation_text_not_prepared @endif,
			view_annotation: @if(site()->isRCCategorySite()) langClip.view_clause @else langClip.view @endif,
			document_has_no_annotations: @if(site()->isRCCategorySite()) langAnnotation.no_tag @else langAnnotation.no_annotation @endif,
			annotation_count_text: @if(site()->isRCCategorySite()) langAnnotation.tag_count @else langAnnotation.annotation_count @endif,
			loading_annotations: @if(site()->isRCCategorySite()) langAnnotation.loading_tags @else langAnnotation.loading_tags @endif,
			no_annotation_msg: @if(site()->isRCCategorySite()) langAnnotation.no_tag @else langAnnotation.no_annotation @endif,
		};
		var lang = {!! json_encode(trans('annotation')) !!};
	</script>
</head>

<body data-spy="scroll" class="lang-{{$lang->getCurrentLang()}} {{site()->getSiteType()}} {{getPageClass()}}"  dir="{{$lang->getDirection()}}" lang="{{$lang->getCurrentLang()}}">
    @if( $gtmID != '')
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{$gtmID}}"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    @endif
<div id="wrapper">
	<div id="page-wrapper" class="sidebar-collapse-container @if(!isset($homePage)) not-front @endif">
