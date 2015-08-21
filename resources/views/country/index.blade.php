@extends('layout.app')

@section('content')

    <a href="#" class="sort" data-value="asc">asc</a>
    <a href="#" class="sort" data-value="desc">desc</a>

    <div id="countries">
    </div>

    <div id="resources">
    </div>
@stop




@section('js')
    <script type="text/javascript" src="{{url('js/lib/backbone.js')}}"></script>
    <script type="text/javascript" src="{{url('js/lib/underscore.js')}}"></script>
    <script type="text/template" id="country-template">
        <div>
            <%= country %>
            <%= total %>
        </div>
    </script>

    <script type="text/template" id="resource-template">
        <div>
            <input class="resource" name="resource[]" type="checkbox" value="<%= value %>" />
            <%= name %>
        </div>
    </script>




    <script>
        var data ={!! json_encode($countries) !!};

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

            filterByResource:function(resources){
                var filtered = this.filter(function(model) {
                    if( typeof resources === 'undefined' || resources.length === 0) return true;
                    return _.contains(resources, model.get("resource"));
                });

               filtered = new FilterCountryCollection(filtered);
               return filtered;

            },
            countries:function(resources, sort)
            {
               var filteredCountries = this.filterByResource(resources);
               var countryGroup = filteredCountries.groupBy('code');

                console.log(countryGroup);
               // countryGroup.setSortField("contract", "DESC");
               // countryGroup.sort();

               var totalContractsByCountry =[];

                for (var countryCode in countryGroup) {

                    var total = _.reduce(countryGroup[countryCode], function(meme, model) {
                        return meme + model.get('contract');
                    }, 0);

                    totalContractsByCountry.push({country: countryCode, total: total})
                }
                return totalContractsByCountry;
            },
            resources:function()
            {
                var resources =  _.uniq(this.pluck('resource'));
                var resourceList = [];

                _.each(resources, function(res){
                    resourceList.push({value: res, name:res });
                });

                return resourceList;
            }
        });

        var collection = new CountryCollection(data);

        //Views
        var CountryView = Backbone.View.extend({
            initialize:function(){
                this.template = _.template($('#country-template').html())
            },

            render:function(){
                $(this.el).html(this.template(this.model));
              return this;
            }
        });

        var CountryList = Backbone.View.extend({
            initialize: function(options) {
                this.resources = options.resources;
                this.sort = options.sort;
            },
            render: function() {
                var self = this;
                var countries = this.collection.countries(this.resources, this.sort);
                $(self.el).html('');
                _.each(countries, function(model) {
                    $(self.el).append(new CountryView({
                        model: model
                    }).render().el);
                });
                return this;
            },
            reset: function(resources) {
                this.resources = resources;
                this.render();
            }
        });

        var option = [
            resources = [],
            sort = 'asc'
        ];


        var countryList = new CountryList({
            el: '#countries',
            sort: option.sort,
            collection: collection,
            resources: option.resources
        }).render();


        var ResourceView = Backbone.View.extend({
            initialize: function () {
                this.template = _.template($('#resource-template').html());
            },
            render:function(){
                $(this.el).html(this.template(this.model));
                return this;
            }
        });

        var ResourceList = Backbone.View.extend({
            render:function(){
                var self = this;
                var resources = this.collection.resources();
                $(self.el).html('');
                _.each(resources, function(model) {
                    $(self.el).append(new ResourceView({
                        model: model
                    }).render().el);
                });
                return this;
            }
        });


        var resourceList = new ResourceList({
            el : '#resources',
            collection :collection
        }).render();


        $(function(){
            $(document).on('click', '.resource', function(){
                option.resources = [];
                $(".resource:checked").each(function(){
                    option.resources.push($(this).val());
                });
                updateView();
            });

            $(document).on('click', '.sort', function(){
                option.sort = $this.data('value');
                updateView();
            });


            function updateView()
            {
                countryList.sort = option.sort;
                countryList.resources = option.resources;
                countryList.render();
            }



        });

    </script>
@stop

