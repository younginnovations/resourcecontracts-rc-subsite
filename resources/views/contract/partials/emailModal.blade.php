<div class="modal fade" id="emailModel">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">@lang('clip.shareViaEmail')</h4>
            </div>
            <div class="modal-body ">
                <form id="send-email">
                    <div class="email-result"></div>
                    <div class="form-group">
                        <label for="to">@lang('clip.to')</label>
                        <input type="text" id="to" name="to" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="from">@lang('clip.from')</label>
                        <input type="text" name="from" id="from" ref="emailFrom" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="subject">@lang('clip.subject')</label>
                        <input type="text" name="subject" id="subject" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="body">@lang('clip.message')</label>
                        <textarea type="text" name="body" id="body"  class="form-control"></textarea>
                    </div>
                    <div class="form-group url-wrap">
                        URL : <span id="url"><a href="{{app('url')->full()}}" target="__blank">{{app('url')->full()}}</a></span>
                    </div>
                    <div class="modal-footer">
                        <input type="submit" class="btn btn-submit" value="{{trans('clip.send_email')}}" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>