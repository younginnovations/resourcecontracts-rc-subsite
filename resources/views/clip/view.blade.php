@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="breadcrumb-wrapper">
                        <ul>
                            <li><a href="{{url()}}">@lang('global.home')</a></li>
                            <li>Clip</li>
                        </ul>
                    </div>
                    <div class="panel-title">
                     Clipped Annotations
                    </div>
                </div>
            </div>
        </div>
    </div>
   <div class="row">
       <div class="col-lg-12 annotation-table">
           {{--<div style="float: right;margin-bottom: 20px;border: 2px solid; border-radius: 20px; width: 100px;text-align: center;margin-right: 55px;cursor: auto;">
            <a>Download</a>
           </div>--}}
           <div class="col-lg-12">
               <table class="table table-bordered">
                   <thead>
                   <tr>
                       <th>OpenContracting Id</th>
                       <th>Category</th>
                       <th>Text</th>
                       <th>Action</th>
                   </tr>
                   </thead>
                   <tbody id="annotationsresults">
                   </tbody>
               </table>
           </div>
       </div>
   </div>


@endsection