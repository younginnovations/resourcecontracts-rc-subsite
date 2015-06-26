<div class="top-container">
  <div class="top-inner-container">
    <div class="search-wrapper">
      <div class="search-box">
        <input type="text" placeholder="Search for a contract..." class="text">
        <input type="submit" class="submit">
      </div>
      <form role="form" method="get" action="{{route('filter')}}">
      <span class="search-link open">Advanced Search</span>
      <span class="search-link search-hide">Close Advanced Search</span>

        <div class="search-input-wrapper">
          <div class="search-input">
            <div class="input-wrapper">
              <label for="">Year (from)</label>
              <input class="datetimepicker" type="text">
            </div>
            <div class="input-wrapper">
              <label for="">Year (to)</label>
              <input class="datetimepicker" type="text">
            </div>
            <div class="input-wrapper">
              <label for="">Country</label>
              <select name="country" id="">
                @foreach($summary['country_summary'] as $country)
                <option value="{{$country['key']}}">{{ucfirst($country['key'])}}</option>
                @endforeach
              </select>
            </div>
            <div class="input-wrapper">
              <label for="">Contract type</label>
              <select name="resource" id="">
                @foreach($summary['resource_summary'] as $resource)
                  <option value="{{$resource['key']}}">{{ucfirst($resource['key'])}}</option>
                @endforeach
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-search">Search</button>
        </div>
    </div>
    </form>
  </div>
  {{--<div class="breadcrumb-wrapper">--}}
    {{--<div class="breadcrumb">--}}
      {{--<ul>--}}
        {{--<li><a href="{{route('home')}}">Home</a></li>--}}
        {{--<li>All Contracts</li>--}}
      {{--</ul>--}}
    {{--</div>--}}
  {{--</div>--}}
</div>