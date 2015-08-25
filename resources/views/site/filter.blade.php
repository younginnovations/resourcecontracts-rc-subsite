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
                    <form action="" method="post" class="search-form filter-form" id="search-form">
                        <div class="form-group">
                            <button type="submit" class="btn btn-filter-search pull-left"></button>
                            <input type="text" class="form-control pull-left">
                        </div>
                        <div class="search-input-wrapper">
                            <div class="col-lg-12">
                                <div class="col-lg-3 input-wrapper">
                                    <input type="date" placeholder="date">
                                </div>
                                <div class="col-lg-3 input-wrapper">
                                    <select name="" id="">
                                        <option value="">Country</option>
                                        <option value="">Albania</option>
                                        <option value="">Kenya</option>
                                        <option value="">Nepal</option>
                                    </select>
                                </div>
                                <div class="col-lg-3 input-wrapper">
                                    <select name="" id="">
                                        <option value="">Contract type</option>
                                        <option value="">Kosmos Energy</option>
                                        <option value="">Kosmos Energy</option>
                                        <option value="">Kosmos Energy</option>
                                    </select>
                                </div>
                                <div class="col-lg-3 input-wrapper">
                                    <select name="" id="">
                                        <option value="">Resource</option>
                                        <option value="">Gold</option>
                                        <option value="">Copper</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-form-search">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 country-list-wrapper search-list-wrapper">
            <div class="panel panel-default panel-wrap country-list-wrap">
                <div class="panel-body">
                    <table class="table table-responsive table-contract">
                        <tbody>

                        @forelse($contracts as $contract)
                            <tr>
                                <td width="70%">

                                     <a href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                                            {{ $contract->contract_name or ''}}
                                     </a>
                                    <span class="label label-default">{{strtoupper($contract->language)}}</span>
                                    - {{trans('country')[$contract->country]}}
                                    <div class="search-text">
                                        {!!$contract->text or ''!!}
                                        {!!$contract->annotations or ''!!}
                                        {!!$contract->metadata or ''!!}
                                    </div>
                                </td>
                                <td>{{$contract->signature_year}}</td>
                                <td align="right">{{getFileSize($contract->file_size)}}</td>
                                <td align="right">

                                    @foreach($contract->group as $group)
                                        <a>{{$group}}</a>
                                    @endforeach

                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="2">{{'Search result not found.'}}</td>
                            </tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

@stop
