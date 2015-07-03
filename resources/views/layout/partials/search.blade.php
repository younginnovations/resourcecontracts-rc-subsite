<div class="top-container @if(isset($show_advance) && $show_advance) expand @endif">
    <div class="top-inner-container">
        <div class="search-wrapper">
            <form role="form" id="advance-search" method="get" action="{{route('filter')}}">
                <div class="search-box">
                    <form role="form" method="get" action="{{route('filter')}}">
                        <input name="q" value="{{$filter['q'] or ''}}" type="text"
                               placeholder="Search for a contract..." class="text">
                        <input type="submit" class="submit"/>
                </div>

                <span class="search-link open" @if(isset($show_advance) && $show_advance) style="display:none"  @endif>Advanced Search</span>
                <span class="search-link search-hide" @if(isset($show_advance) && $show_advance) style="display:inline-block"  @endif>Close Advanced Search</span>

                <div class="search-input-wrapper" @if(isset($show_advance) && $show_advance) style="display: block"  @endif >
                    <div class="search-input">
                        <div class="input-wrapper">
                            <label for="">Country</label>
                            <select name="country[]" id="" multiple="multiple">
                                @foreach($summary['country_summary'] as $country)
                                    <option @if(isset($filter['country']) && in_array($country['key'], $filter['country']))
                                        selected="selected"
                                        @endif value="{{$country['key']}}">{{trans('country.'.strtoupper($country['key']))}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="input-wrapper">
                            <label for="year">Year</label>
                            <select name="year[]" id="year" multiple="multiple">
                                @foreach($summary['year_summary'] as $year)
                                    <option  @if(isset($filter['year']) && in_array($year['key'], $filter['year']))
                                        selected="selected" @endif    value="{{$year['key']}}">{{$year['key']}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="input-wrapper">
                            <label for="sortby">Order by</label>
                            <select name="sortby" id="sortby">
                                <option value="">Select</option>
                                <option @if(isset($filter['sortby']) && $filter['sortby'] == 'country')
                                    selected="selected" @endif value="country">Country
                                </option>
                                <option @if(isset($filter['sortby']) && $filter['sortby'] == 'year') selected="selected"
                                                                                                     @endif value="year">
                                    Year
                                </option>
                            </select>
                        </div>

                        <div class="input-wrapper">
                            <label for="order">Sort by</label>
                            <select name="order" id="order">
                                <option value="">Select</option>
                                <option @if(isset($filter['order']) && $filter['order'] == 'asc') selected="selected"
                                                                                                  @endif value="asc">ASC
                                </option>
                                <option @if(isset($filter['order']) && $filter['order'] == 'desc') selected="selected"
                                                                                                   @endif value="desc">
                                    DESC
                                </option>
                            </select>
                        </div>
                    </div>
                    <input type="button" class="btn btn-reset btn-default" value="reset">
                    <button type="submit" class="btn btn-search">Search</button>
                </div>
        </div>
        </form>
    </div>

    @section('script')
        <script>
            $(function () {
                $('.btn-reset').on('click', function () {
                    $('input[type=text]').val('');
                    $('select', '#advance-search').each(function(){
                        $(this).select2('val', null);
                    });
                });
            });
        </script>
    @stop


    <div class="breadcrumb-wrapper">
        <div class="breadcrumb">
            <ul>
                <li><a href="{{route('home')}}">Home</a></li>
                <li>@if(isset($filters))
                        @foreach($filters as $filter=>$value)
                            @if($filter=='country')
                                {{$filter}}-{{trans('country.'.strtoupper($value))}}
                            @else
                                {{ucfirst($filter)}}-{{$value}}
                            @endif

                        @endforeach
                    @else All Contracts @endif </li>
            </ul>
        </div>
    </div>
</div>