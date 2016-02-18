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
            'loading': false
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
            var annotid = self.getAnnotationop  Id(self.props.clipCollection);
            self.setState({check_data: annotid});
            self.setClips(self.props.clipCollection);
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
        if (annotationID.length < 1) {
            filterClips = this.props.clipCollection;
        }
        if (annotationID.length < 1 && this.state.filters.length > 0) {
            filterClips = this.props.clipCollection.withFilter(this.state.filters);
        }
        this.props.clipCollection.trigger('filterData', filterClips);
    },
    handleSort: function (field) {
        var orderby = 'asc';
        if (field == this.state.sort_by && this.state.order == "asc") {
            orderby = 'desc';
        }
        this.state.order = orderby;
        this.state.sort_by = field;
        var clips = this.props.clipCollection.clipSort(this.state.sort_by, this.state.order);
        this.setClips(clips);
    },
    showSortArrow: function (field) {
        var order = 'fa fa-black fa-sort-' + this.state.order;
        if (field == this.state.sort_by) {
            return (<i className={order}></i>);
        }
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
                return (<div className="no-record">There is no clipped annotations.</div>);
            }
            var pagination = '';
            if (this.state.total_pages > 1) {
                pagination = (<Pagination clipCollection={this.props.clipCollection} pageState={this.state}/>);
            }
            return (
                <div id="clip-annotation-list">
                    <table className="table table-responsive table-contract table-contract-list">
                        <thead>
                        <tr>
                            <th width="75px"><ClipSelectCount clipCollection={this.props.clipCollection}/></th>
                            <th width="20%"><a onClick={this.handleSort.bind(this,'name')}>
                                Document {this.showSortArrow('name')}</a></th>
                            <th><a
                                onClick={this.handleSort.bind(this,'category')}>{langClip.category}{this.showSortArrow('category')}</a>
                            </th>
                            <th width="35%"><a
                                onClick={this.handleSort.bind(this,'text')}>{langClip.text}{this.showSortArrow('text')}</a></th>
                            <th width="114px"><a
                                onClick={this.handleSort.bind(this,'country')}>{langClip.country}{this.showSortArrow('country')}</a>
                            </th>
                            <th width="84px"><a
                                onClick={this.handleSort.bind(this,'year')}>{langClip.year}{this.showSortArrow('year')}</a></th>
                            <th><a
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