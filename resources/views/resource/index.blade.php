@extends('layout.app-full')

@section('content')

    @include('layout.partials.header')

    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">
            <div class="breadcrumb-wrapper">
                <ul>
                    <li><a href="{{url()}}">Home</a></li>
                    <li>Resources</li>
                </ul>
            </div>
            <div class="panel-title">
                Resources
            </div>
            <div class="filter-wrapper">
                <div class="col-lg-2">
                    <div class="filter-country-wrap">
                        <form class="search-form filter-form">
                            <div class="form-group">
                                <button type="submit" class="btn btn-filter-search pull-left"></button>
                                <input type="text" class="form-control search pull-left" placeholder="Filter by country name...">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="pagination-wrapper">
                        <ul>
                            <li><a href="#" data-code="" class="alpha active">All</a></li>
                            <li><a href="#" class="alpha" data-code="A">A</a></li>
                            <li><a href="#" class="alpha" data-code="B">B</a></li>
                            <li><a href="#" class="alpha" data-code="C">C</a></li>
                            <li><a href="#" class="alpha" data-code="D">D</a></li>
                            <li><a href="#" class="alpha" data-code="E">E</a></li>
                            <li><a href="#" class="alpha" data-code="F">F</a></li>
                            <li><a href="#" class="alpha" data-code="G">G</a></li>
                            <li><a href="#" class="alpha" data-code="H">H</a></li>
                            <li><a href="#" class="alpha" data-code="I">I</a></li>
                            <li><a href="#" class="alpha" data-code="J">J</a></li>
                            <li><a href="#" class="alpha" data-code="K">K</a></li>
                            <li><a href="#" class="alpha" data-code="L">L</a></li>
                            <li><a href="#" class="alpha" data-code="M">M</a></li>
                            <li><a href="#" class="alpha" data-code="N">N</a></li>
                            <li><a href="#" class="alpha" data-code="O">O</a></li>
                            <li><a href="#" class="alpha" data-code="P">P</a></li>
                            <li><a href="#" class="alpha" data-code="Q">Q</a></li>
                            <li><a href="#" class="alpha" data-code="R">R</a></li>
                            <li><a href="#" class="alpha" data-code="S">S</a></li>
                            <li><a href="#" class="alpha" data-code="T">T</a></li>
                            <li><a href="#" class="alpha" data-code="U">U</a></li>
                            <li><a href="#" class="alpha" data-code="V">V</a></li>
                            <li><a href="#" class="alpha" data-code="W">W</a></li>
                            <li><a href="#" class="alpha" data-code="X">X</a></li>
                            <li><a href="#" class="alpha" data-code="Y">Y</a></li>
                            <li><a href="#" class="alpha" data-code="Z">Z</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="filter-resource-wrap">
                        <div class="filter-label" data-toggle="collapse-side" data-target=".side-collapse" data-target-2=".side-collapse-container">Filter by Resources<i></i></div>
                    </div>
                    <div class="side-collapse in">
                        <ul id="countries">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row side-collapse-container">
        <div id="resources" class="col-lg-12 country-list-wrap f32">

        </div>
    </div>

    <a href="#" class="sort" data-value="asc">asc</a>
    <a href="#" class="sort" data-value="desc">desc</a>

@stop

@section('js')
    <script type="text/javascript" src="{{url('js/lib/backbone.js')}}"></script>
    <script type="text/javascript" src="{{url('js/lib/underscore.js')}}"></script>
    <script type="text/template" id="resource-template">
        <div class="col-lg-2">
            <a href="{{url('resource')}}/<%= code %>">
                <div class="country-name"><%= name %></div>
            </a>
            <div class="contract-count"><%= contract %> contracts</div>
        </div>
    </script>

    <script type="text/template" id="country-template">
        <li>
            <label>
                <input class="resource" name="resource[]" type="checkbox" value="<%= value %>" />
                <%= name %>
            </label>
        </li>
    </script>

    <script>
        var data ={!! json_encode($resources) !!};

        String.prototype.ucfirst = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }


        //Model
        var CountryModel = Backbone.Model.extend({});

        var FilterCountryCollection = Backbone.Collection.extend({
            model:CountryModel,
            initialize: function () {
                // Default sort field and direction
                this.sortField = "name";
                this.sortDirection = "ASC";
            },

            setSortField: function (field, direction) {
                this.sortField = field;
                this.sortDirection = direction;
            },

            comparator: function (m) {
                return m.get(this.sortField);
            },

            // Overriding sortBy (copied from underscore and just swapping left and right for reverse sort)
            sortBy: function (iterator, context) {
                var obj = this.models,
                        direction = this.sortDirection;

                return _.pluck(_.map(obj, function (value, index, list) {
                    return {
                        value: value,
                        index: index,
                        criteria: iterator.call(context, value, index, list)
                    };
                }).sort(function (left, right) {
                    // swap a and b for reverse sort
                    var a = direction === "ASC" ? left.criteria : right.criteria,
                            b = direction === "ASC" ? right.criteria : left.criteria;

                    if (a !== b) {
                        if (a > b || a === void 0) return 1;
                        if (a < b || b === void 0) return -1;
                    }
                    return left.index < right.index ? -1 : 1;
                }), 'value');
            }

        });

        //collection
        var CountryCollection = Backbone.Collection.extend({
            model:CountryModel,
            alphabeticSearch:function(letter)
            {
                var where = 'resource';
                if(letter == "" || typeof  letter =='undefined') return this;

                letter= letter.toLowerCase();
                var pattern = new RegExp("^"+letter);
                return _(this.filter(function(data) {
                    return pattern.test(data.get(where));
                }));
            },
            search:function(collection, word){
                var where = 'resource';
                if(word == "") return collection;
                var pattern = new RegExp(word,"gi");
                return _(collection.filter(function(data) {
                    return pattern.test(data.get(where));
                }));

                /*  if (what === '' || typeof  what == 'undefined') {
                 return this;
                 }
                 lookin = 'name';
                 var filtered = this.filter(function (model) {
                 return _.some(_.values(model.pick(lookin)), function (value) {
                 return ~value.toLowerCase().indexOf(what);
                 });
                 });
                 filtered = new FilterCountryCollection(filtered);
                 return filtered;*/
            },
            filterByResource:function(collection, resources){
                var filtered = collection.filter(function(model) {
                    if( typeof resources === 'undefined' || resources.length === 0) return true;
                    return _.contains(resources, model.get("resource"));
                });

                filtered = new FilterCountryCollection(filtered);

                return filtered;
            },
            resources:function(resources, sort_type, search, alphabet)
            {
                var filteredResources = this.alphabeticSearch(alphabet);
                filteredResources = this.search(filteredResources, search);
                filteredResources = this.filterByResource(filteredResources, resources);

                if(typeof sort_type === 'undefined')
                {
                    sort_type = 'asc';
                }

                filteredResources.setSortField("resource", sort_type.toUpperCase());
                filteredResources.sort();

                var resourceGroup = filteredResources.groupBy('resource');

                var totalContractsByresource =[];

                for (var code in resourceGroup) {

                    var total = _.reduce(resourceGroup[code], function(meme, model) {
                        return meme + model.get('contract');
                    }, 0);

                    var model = resourceGroup[code][0];

                    if(code !=='')
                    {
                        totalContractsByresource.push({code: code, name: model.get('resource').ucfirst(), contract: total})
                    }
                }

                return totalContractsByresource;
            }
        });

        var collection = new CountryCollection(data);


        //Views
        var ResourceView = Backbone.View.extend({
            initialize:function(){
                this.template = _.template($('#resource-template').html())
            },

            render:function(){
                $(this.el).html(this.template(this.model));
                return this;
            }
        });

        var ResourceList = Backbone.View.extend({
            initialize: function(options) {
                this.sort_type = options.sort_type;
                this.search = options.search;
                this.alphabet = options.alphabet;

            },
            render: function() {
                var self = this;
                var resources = this.collection.resources('', this.sort_type, this.search, this.alphabet);
                $(self.el).html('');
                _.each(resources, function(model) {
                    $(self.el).append(new ResourceView({
                        model: model
                    }).render().el);
                });
                return this;
            },
            reset: function(resources) {
                this.country = country;
                this.render();
            }
        });

        var option = [
            resources = [],
            sort_type = 'asc',
            search = '',
            alphabet = ''
        ];


        var resourceList = new ResourceList({
            el: '#resources',
            sort_type: option.sort_type,
            collection: collection,
            resources: option.country
        }).render();




        $(function(){
            $(document).on('click', '.sort', function(e){
                e.preventDefault();
                option.sort_type = $(this).data('value');
                updateView();
            });

            $(document).on('input', '.search', function(){
                option.search = $(this).val();
                updateView();
            });

            $(document).on('click', '.alpha', function(){
                option.alphabet = $(this).data('code');
                $('.alpha').removeClass('active');
                $(this).addClass('active');
                updateView();
            });

            function updateView()
            {
                resourceList.alphabet = option.alphabet;
                resourceList.search = option.search;
                resourceList.sort_type = option.sort_type;
                console.log(resourceList);
                resourceList.render();
            }
        });

    </script>
@stop

