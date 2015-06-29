<div class="top-container">
    <div class="top-inner-container">
        <div class="search-wrapper">
            <div class="search-box">
                <form role="form" method="get" action="{{route('filter')}}">
                    <input name="q" value="@if(isset($filters['q'])) {{$filters['q']}}@endif" type="text"
                           placeholder="Search for a contract..." class="text">
                    <input type="submit" class="submit">
                </form>
            </div>
            <form role="form" method="get" action="{{route('filter')}}">
                <span class="search-link open">Advanced Search</span>
                <span class="search-link search-hide">Close Advanced Search</span>

                <div class="search-input-wrapper">
                    <div class="search-input">
                        {{--<div class="input-wrapper">--}}
                        {{--<label for="">Year (from)</label>--}}
                        {{--<input  type="text">--}}
                        {{--</div>--}}
                        {{--<div class="input-wrapper">--}}
                        {{--<label for="">Year (to)</label>--}}
                        {{--<input  type="text">--}}
                        {{--</div>--}}
                        <div class="input-wrapper">
                            <label for="">Country</label>
                            <select name="country" id="">
                                @foreach($summary['country_summary'] as $country)
                                    <option @if(isset($filters['country']) and $country['key'] == $filters['country'])
                                        selected
                                        @endif value="{{$country['key']}}">{{trans('country.'.strtoupper($country['key']))}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="input-wrapper">
                            <label for="">Contract type</label>
                            <select name="resource" id="">
                                @foreach($summary['resource_summary'] as $resource)
                                    <option @if(isset($filters['resource']) and $resource['key'] == $filters['resource'])
                                        selected
                                        @endif value="{{$resource['key']}}">{{ucfirst($resource['key'])}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-search">Search</button>
                </div>
        </div>
        </form>
    </div>
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