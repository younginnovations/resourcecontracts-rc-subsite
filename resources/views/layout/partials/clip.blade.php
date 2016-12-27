@if(site()->isClipEnabled())
    <div class="clip-head">
        <a href="{{route('clip.index')}}" id="annotation-count" data-toggle="popover"  data-title=" @lang('clip.view-all-clips') ( <a target='_blank' href={{url('faqs')}}>@lang('clip.learn_more')</a>)" style="display: none"></a>
        <a href="#" class="" id="hide-annotation" style="display: none">@lang('clip.hide')</a>
    </div>
@endif