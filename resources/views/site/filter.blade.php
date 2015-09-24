@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper search-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="panel-title">
                        Search results for <span>{{\Illuminate\Support\Facades\Input::get('q')}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="filter-wrapper">
            <div class="col-lg-12">
                <div class="filter-country-wrap">
                  @include('layout.partials.search', ['searchPage' => true])
              </div>
            </div>
            @if(!empty($contract_id))
                <div class="download-csv"><a href="{{route('contract.metadata.download',['id'=>implode(',',$contract_id)])}}">Download as CSV</a></div>
            @endif
        </div>
        <div class="contract-number-wrap contract-search-number-wrap">
            <span>{{$contracts->total}}</span> @if($contracts->total > 1)contracts @else Contract @endif
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12 country-list-wrapper search-list-wrapper">
            <div class="panel panel-default panel-wrap country-list-wrap">
                <div class="panel-body">
                    <div id="compare-block">
                        <h2>Compare</h2>
                        <ul>
                        </ul>
                        <button class="btn btn-compare">Compare</button>
                    </div>

                    <table class="table table-responsive table-contract table-contract-list">
                        <tbody>
                        @forelse($contracts->results as $contract)
                            <?php
                            $api = app('App\Http\Services\APIService');
                            $annotations = $api->getAnnotations($contract->contract_id);
                            ?>
                            <tr>
                                <td>
                                    <input type="checkbox" class="compare" name="compare[]" value="{{$contract->contract_id}}" />
                                    <a class="title-{{$contract->contract_id}}" href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                                        {{ $contract->contract_name or ''}}
                                    </a>

                                    @if($annotations->total>0)
                                        <div class="annotate-text"> Annotated </div>
                                    @endif

                                    <div class="search-text">
                                        {!!$contract->text or ''!!}
                                        {!!$contract->annotations or ''!!}
                                        {!!$contract->metadata or ''!!}
                                      </div>
                                    <div class="contract-info-section">
                                        <div class="download-main-wrap">
                                            <div class="download-wrap">
                                                <span>Download</span>
                                            </div>

                                            <ul class="dropdown-menu">
                                                <li><a href="{{route('contract.download.pdf',['id'=> $contract->contract_id])}}" >Pdf</a></li>
                                                <li><a href="{{route('contract.download',['id'=> $contract->contract_id])}}" >Word File</a></li>
                                            </ul>
                                        </div>
                                    @if(isset($contract->group) && count($contract->group)>0)
                                        <div class="contract-group">
                                            <label for="">Found in: </label>
                                            @foreach($contract->group as $group)
                                                <a>{{$group}}</a>
                                            @endforeach
                                        </div>
                                    @endif
                                    </div>
                                    @if($annotations->total>0)
                                        @if(\Illuminate\Support\Facades\Input::has('annotation_category'))
                                            <?php $annotation_categories = \Illuminate\Support\Facades\Input::get(
                                                    'annotation_category'
                                            )?>
                                            @foreach($annotation_categories as $category)
                                                <?php
                                                $annotation = searchInArray(
                                                        $annotations->result,
                                                        'category',
                                                        $category
                                                );
                                                ?>
                                                @if($annotation)
                                                <?php $annotation_type = isset($annotation['shapes']) ? 'pdf' : 'text'; ?>
                                                {{str_limit($category,50)}}-<span
                                                        style="color: #404040;">{{str_limit($annotation['text'],50)}}</span>
                                                <a style="float: none" href="{{route('contract.detail',['id'=>$contract->contract_id])}}#/{{$annotation_type}}/page/{{$annotation['page_no']}}/annotation/{{$annotation['id']}}">
                                                    [Pg {{$annotation['page_no']}}]</a>
                                                <br>
                                                @endif
                                            @endforeach

                                        @endif
                                    @endif
                                    <div class="resource-contract-list">
                                        <div class="resource-type">
                                            <label for="">Resource: </label>
                                            @foreach($contract->resource as $resource)
                                                {{$resource}}
                                            @endforeach
                                        </div>
                                        <div class="contract-type">
                                            <label for="">Contract Type:</label>{{$contract->contract_type}}
                                        </div>
                                    </div>
                                </td>
                                @if($contract->country !='')
                                    <td>{{$contract->signature_year}}</td>
                                    <td>
                                        {{@trans('country')[$contract->country]}}
                                    </td>
                                @endif

                            </tr>
                        @empty
                            <tr>
                                <td colspan="2" class="search-not-found">{{'Search result not found.'}}</td>
                            </tr>
                        @endforelse
                        </tbody>
                    </table>
                    @include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage ])
                </div>
            </div>
        </div>
    </div>
@stop

@section('js')
    <script src="{{url('js/jquery.cookie.js')}}"></script>
    <script>
       $(function(){
           var compareList = function(cookieName) {
               return {
                   "add": function(val) {
                       var items = this.items();
                       if(items)
                       {
                           items.push(val);
                       }
                       else
                       {
                           items = [val];
                       }
                       Cookies.set(cookieName, JSON.stringify(items));
                   },
                   "remove": function (index) {
                       var items = this.items();
                           items.splice(index, 1);
                       Cookies.set(cookieName, JSON.stringify(items));
                   },
                   "clear": function() {
                       Cookies.remove(cookieName);
                   },
                   "items": function() {
                       var item = Cookies.getJSON(cookieName);
                       if(item)
                       {
                           return item;
                       }
                       return [];
                   },
                   "isLimitExceed":function(){
                       return this.items().length > 1;
                   },
                   "delete":function(id){
                       console.log(id);
                       var self = this;
                       $.each(this.items(), function(index,val){
                           if(val.id == id)
                           {
                               self.remove(index);
                           }
                       });
                   }
               }
           };

           var compareView = function(){
               return {
                    "disableCheckbox" :function(el)
                    {
                        $(el).attr('disabled','disabled');
                    },
                   "enableCheckbox" :function(el)
                   {
                       $(el).removeAttr('disabled');
                   },
                   "itemTemplate" : function (id, title) {
                       return '<li class="item-'+id+'"><a href="#" data-id="'+id+'" class="item-delete">delete</a>'+title+' </li>';
                   },
                   "removeItem":function(id)
                   {
                       $('.item-'+id).remove();
                   },
                   "render":function(el, items)
                   {
                       if(items.length > 0)
                       {
                           $('#compare-block').show();
                       }else {
                           $('#compare-block').hide();
                       }

                       $(el).html('');

                       var self = this;

                       $.each(items, function(index, val){

                           $(el).append(self.itemTemplate(val.id,val.title));
                       });
                   }
               };
           };

           var list = new compareList('contractList');
           var listView = new compareView('compareView');
           init();
           $(document).on('change','.compare', function(){
               var id = $(this).val();
               var checked = this.checked;
               if(checked)
               {
                   var title=$('.title-'+id).text();
                   if(!list.isLimitExceed())
                   {
                       list.add({"id":id,"title": title});
                   }
                   listView.render('#compare-block ul', list.items())
               }else{
                   list.delete(id);
                   $("input[value="+id+"]").prop('checked', false);
                   listView.render('#compare-block ul', list.items())
               }

               if(list.isLimitExceed()){
                   listView.disableCheckbox('.compare');
               }else{
                   listView.enableCheckbox('.compare');

               }

               if(list.items().length >1)
               {
                   $('#compare-block button').show();
               }else{
                   $('#compare-block button').hide();
               }

               console.log(list.items());
           });

           $(document).on('click','.item-delete', function(e) {
               e.preventDefault();
               var id = $(this).data('id');
               list.delete(id);
               listView.removeItem(id);
               listView.render('#compare-block ul', list.items());
               if(list.isLimitExceed()){
                   listView.disableCheckbox('.compare');
               }else{
                   listView.enableCheckbox('.compare');

               }

               if(list.items().length >1)
               {
                   $('#compare-block button').show();
               }else{
                   $('#compare-block button').hide();
               }

               $("input[value="+id+"]").prop('checked', false);

           });

           function init()
           {
               listView.render('#compare-block ul', list.items());

               if(list.isLimitExceed()){
                   listView.disableCheckbox('.compare');
               }else{
                   listView.enableCheckbox('.compare');
               }

               $.each(list.items(), function(index, value){
                    $("input[value="+value.id+"]").prop('checked', true);
               });

               if(list.items().length >1)
               {
                   $('#compare-block button').show();
               }else{
                   $('#compare-block button').hide();
               }

               console.log(list.items());

           }

           $(document).on('click','#compare-block button', function(){
               var url = '{{url('contract')}}';
               $.each(list.items(), function(index, value){
                   url+='/'+value.id;
               });
              url+='/compare';
               window.location.href = url;

           });

       });
    </script>
@stop
