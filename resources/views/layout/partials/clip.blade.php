@if(site()->isClipEnabled())
    <div class="clip-head">
        <a href="{{route('clip.index')}}" id="annotation-count" data-toggle="popover"  data-title=" @lang('clip.view-all-clips') @lang('clip.or') <a href='https://www.google.com'>@lang('clip.learn_more')</a>" style="display: none"></a>
        <a href="#" class="" id="hide-annotation" style="display: none">@lang('clip.hide')</a>
    </div>
@endif