var Listing = React.createClass({
    getInitialState: function () {
        return {
            clips: [],
            filter: [],
            per_page: 20,
            total_pages: 0,
            current_page: 0,
            filters: [],
            check_data: [],
            sort_by: 'name',
            'order': 'asc',
            'loading': false,
            'allclip':true
        }
    },
    getFilters: function (filter) {
        var stateFilter = this.state.filter;
        stateFilter[filter['key']] = [];
        stateFilter[filter['key']] = filter['value'];
        this.setState({filter: stateFilter});
        return this.state.filter;
    },
    componentDidMount: function () {
        var self = this;


        this.setState({loading: true});
        this.props.clipCollection.on('data:change', function () {
            var annotid = self.getAnnotationId(self.props.clipCollection);
            self.setState({check_data: annotid});
            self.setClips(self.props.clipCollection);
            var sortField = window.getCookie('sortfield');
            var sortOrder = window.getCookie('sortorder');

            if(sortOrder != '')
            {
                self.state.order=sortOrder;
            }

            if(sortField != '')
            {
                self.state.sort_by=sortField;
            }

            self.sorting();

        });

        this.props.clipCollection.on('checkbox:click', function (data) {
            self.setState({check_data: _.uniq(data.value)});
            self.filterOnCheck(self.state.check_data);
        });

        this.props.clipCollection.on('paginate', function (page) {
            if (page.page == "Prev") {
                page.page = self.state.current_page;
            }
            if (page.page == "Next") {
                page.page = self.state.current_page + 2;
            }
            if (page.page == "First") {
                page.page = 1;
            }
            if (page.page == "Last") {
                page.page = self.state.total_pages;
            }

            self.state.current_page = page.page - 1;
            var clips = self.props.clipCollection.clipSort(self.state.sort_by, self.state.order);

            self.setClips(clips);
        });

        this.props.clipCollection.on('filter:change', function (filter) {
            var filter = self.getFilters(filter);
            self.setState({filters: filter});
            var clips = self.props.clipCollection.withFilter(filter);
            self.setState({current_page: 0});
            self.setClips(clips);
        });



        var clipPage = window.getCookie('clippage');

        if(clipPage != '')
        {
            var totalPage =  window.getCookie('totalpages');
            if (clipPage == "Prev") {
                clipPage = self.state.current_page - 2;
            }
            if (clipPage == "Next") {
                clipPage = self.state.current_page + 2;
            }
            if (clipPage == "First") {
                clipPage = 1;
            }
            if (clipPage == "Last") {
                clipPage = parseInt(totalPage);
            }
            self.setState({current_page:clipPage-1});
        }


    },
    componentWillMount:function()
    {
        var self=this;

    },
    getAnnotationId: function (clips) {
        var annotationID = [];
        clips.map(function (data) {
            annotationID.push(data.get('annotation_id'));
        });

        return annotationID;
    },
    setClips: function (clips) {
        this.setState({loading: true});
        var filterClips = this.props.clipCollection.withFilter(this.state.filters);
        var downloadData = filterClips;
        if (this.state.check_data.length > 0) {
            downloadData = this.props.clipCollection.getSelectedClips(downloadData, this.state.check_data);
        }
        this.props.clipCollection.trigger('filterData', downloadData);
        this.state.total_pages = Math.ceil(filterClips.length / this.state.per_page);
        var begin = this.state.current_page * this.state.per_page;
        var end = begin + (this.state.per_page - 1);
        clips = clips.paginate(begin, end, this.state.filters);
        this.setState({clips: clips});
        this.setState({loading: false})
    },
    filterOnCheck: function (annotationID) {
        var filterClips = this.props.clipCollection.filterCheckData(annotationID);
        this.props.clipCollection.trigger('selectedData', annotationID);
        this.props.clipCollection.trigger('filterData', filterClips);
    },
    handleSort: function (field) {
        var orderby = 'asc';
        if (field == this.state.sort_by && this.state.order == "asc") {
            orderby = 'desc';
        }

        this.state.order = orderby;
        this.state.sort_by = field;

        $.cookie("sortfield", field, {
            path: '/'
        });
        $.cookie("sortorder", orderby, {
            path: '/'
        });

        this.sorting();

    },

    sorting: function()
    {
        if(this.state.sort_by=="checkbox")
        {
            var clips = this.props.clipCollection.clipSortForCheckBox(this.state.check_data,this.state.order);
        }
        else{
            var clips = this.props.clipCollection.clipSort(this.state.sort_by, this.state.order);
        }
        this.setClips(clips);

    },

    showSortArrow: function (field) {
        var order = 'fa fa-black fa-sort-' + this.state.order;
        if (field == this.state.sort_by) {
            return (<i className={order}></i>);
        }
    },
    toggleDropdown: function () {
        this.setState({dropdown: !this.state.dropdown})

    },
    uncheckDocs :  function()
    {
        var self = this;
        self.setState({check_data: []})
        self.filterOnCheck([]);
    },
    checkAllDocs : function()
    {
        var self = this;
        var data=[];
        _.map(self.state.clips['models'], function (clips) {
            data.push(clips.get('annotation_id'));
        });

        self.setState({check_data:_.uniq(data)});
        self.filterOnCheck(self.state.check_data);
    },

    toggleCheckBox : function()
    {
        var self=this;
        var data=[];
        var clips = self.props.clipCollection;

        self.state.allclip=!this.state.allclip;
        if(self.state.allclip)
          {
              _.map(clips['models'], function (clip) {
                  data.push(clip.get('annotation_id'));
              });
          }
        self.setState({check_data:  _.uniq(data)});
        self.state.check_data=_.uniq(data);
        self.filterOnCheck(self.state.check_data);
    },

    render: function () {
        var self = this;
        var tableview = '';
        if (this.state.clips) {
            tableview = this.state.clips.map(function (data, index) {
                return (<Item item={data} index={index} clipCollection={self.props.clipCollection}
                              checkData={self.state.check_data}/>)
            });
        }

        if (!this.state.loading) {
            if (this.state.clips.length < 1) {
                return (<div className="no-record">{langClip.currently_no_clips}</div>);
            }
            var pagination = '';
            if (this.state.total_pages > 1) {
                pagination = (<Pagination clipCollection={this.props.clipCollection} pageState={this.state}/>);
            }
            var isBoxChecked =  this.state.allclip?"checked":null;
            return (
                <div id="clip-annotation-list">
                    <table className="table table-responsive table-contract table-contract-list">
                        <thead>
                        <tr>

                            <th width="75px">
                                    <ClipSelectCount clipCollection={this.props.clipCollection}/>
                                    <input type="checkbox" checked={isBoxChecked} onClick={this.toggleCheckBox.bind()} />
                                    <a onClick={this.handleSort.bind(this,'checkbox')}>
                                    {this.showSortArrow('checkbox')}</a>

                            </th>

                            <th><a onClick={this.handleSort.bind(this,'name')}>
                                Document {this.showSortArrow('name')}</a></th>
                            <th width="15%"><a
                                onClick={this.handleSort.bind(this,'category')}>{langClip.category}{this.showSortArrow('category')}</a>
                            </th>
                            <th width="35%"><a
                                onClick={this.handleSort.bind(this,'text')}>{langClip.text}{this.showSortArrow('text')}</a></th>
                            <th width="114px"><a
                                onClick={this.handleSort.bind(this,'country')}>{langClip.country}{this.showSortArrow('country')}</a>
                            </th>
                            <th width="84px"><a
                                onClick={this.handleSort.bind(this,'year')}>{langClip.year}{this.showSortArrow('year')}</a></th>
                            <th width="150px"><a
                                onClick={this.handleSort.bind(this,'resourcetemp')}>{langClip.resource}{this.showSortArrow('resourcetemp')}</a>
                            </th>
                            <th>{langClip.viewClip}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableview}
                        </tbody>
                    </table>
                    {pagination}
                </div>
            );
        }
        else {
            return (<p className="loading">{langClip.loading}</p>);
        }
    }
});