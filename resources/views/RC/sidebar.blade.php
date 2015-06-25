<strong>Country</strong>
@foreach($summary['country_summary'] as $country=>$value)
    <table>
        <tr>
            <td>{{$country}}</td><td>{{$value}}</td>
        </tr>
    </table>
@endforeach

<strong>Year</strong>
@foreach($summary['year_summary'] as $year=>$value)
    <table>
        <tr>
            <td>{{$year}}</td><td>{{$value}}</td>
        </tr>
    </table>
@endforeach

<strong>Resource</strong>
@foreach($summary['resource_summary'] as $resource=>$value)
    <table>
        <tr>
            <td>{{$resource}}</td><td>{{$value}}</td>
        </tr>
    </table>
@endforeach