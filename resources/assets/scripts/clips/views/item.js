var Item = React.createClass({
    getInitialState: function () {
        return {
            maxWords: 60,
            text: '',
            shortText: '',
            showEllipse: '',
            showMoreFlag: ''
        };
    },

    componentDidMount: function () {
        var text = this.props.item.get('text');
        var showEllipse = this.shallShowEllipse(text);
        var shortText = "";
        if (showEllipse) {
            shortText = this.truncate(text);
        }

        this.setState({
            text: text,
            showEllipse: showEllipse,
            shortText: shortText,
            showMoreFlag: true
        });
    },

    componentWillReceiveProps: function (prev) {
        var text = prev.item.get('text');
        var showEllipse = this.shallShowEllipse(text);
        var shortText = "";
        if (showEllipse) {
            shortText = this.truncate(text);
        }

        this.setState({
            text: text,
            showEllipse: showEllipse,
            shortText: shortText,
            showMoreFlag: true
        });
    },
    truncate: function (text) {

        var words = (text + "").split(" ");
        words = words.splice(0, this.state.maxWords);

        return words.join(" ");
    },
    shallShowEllipse: function (text) {
        var words = (text + "").split(' ');
        if (words.length >= this.state.maxWords) {
            return true;
        }
        return false;
    },
    toggleShowMore: function () {
        this.setState({showMoreFlag: !this.state.showMoreFlag})
    },
    handleClick: function (e) {
        e.preventDefault();
        this.toggleShowMore();
    },
    getShowText: function () {
        var more = '';
        var texToShow = "";
        var textToReturn = '';

        if (this.state.showMoreFlag && this.state.shortText.length > 0) {
            texToShow = this.state.shortText + '...';
            more = langClip.more;
        }
        if (!this.state.showMoreFlag && this.state.text.length > 0) {

            texToShow = this.state.text;

            more = langClip.less;
        }
        if (texToShow.length == 0) {
            texToShow = this.state.text;
        }
        textToReturn = (<span>{texToShow}<a onClick={this.handleClick}>{more}</a></span>);
        return textToReturn;
    },
    getResource: function () {
        var resource = "";
        var data = this.props.item.get('resource');

        _.map(data, function (d) {
            resource += '<li>' + langResource[d] + '</li>';
        });

        return resource;
    },
    getChecked: function () {

    },
    getPageUrl: function () {
        var pages = this.props.item.get('pages');
        var articleRef = this.props.item.get('article_reference');
        articleRef = (articleRef == '') ? '' :  articleRef ;
        var pageUrl = '';
        var openContractingId = this.props.item.get('open_contracting_id');
        _.map(pages, function (page) {
            var url = app_url + "/contract/" + openContractingId + '/view#/' + page.type + '/page/' + page.page + '/annotation/' + page.id;
            pageUrl += langClip.page+" " + page.page +' (<a href=' + url + '>'  + articleRef + '</a>)';
        });
        return pageUrl;
    },
    openViewPage: function () {
        var newwindow = window.open(this.props.item.get('page_url'), '_blank', 'toolbar=0,width=650,height=500,location=0,menubar=0, scrollbars=yes');
        if (window.focus) {
            newwindow.focus()
        }
    },

    render: function () {
        var docUrl = app_url + "/contract/" + this.props.item.get('open_contracting_id') + '/view';

        return (
            <tr>
                <td>
                    <Checkbox index={this.props.index} item={this.props.item} clipCollection={this.props.clipCollection}
                              checkData={this.props.checkData}/>
                </td>
                <td>
                    {this.props.item.get('name')}
                </td>
                <td>
                    <a href={docUrl}>{this.props.item.get('category')}</a>
                </td>
                <td>
                    {this.getShowText()}<br/>
                    <span dangerouslySetInnerHTML={{__html: this.getPageUrl()}}/>
                </td>

                <td>
                    <span className="country-name-title">{langCountry[this.props.item.get('country_code')]}</span>
                </td>
                <td>
                    {this.props.item.get('year')}
                </td>
                <td>
                    <ul dangerouslySetInnerHTML={{__html: this.getResource()}}/>
                </td>
                <td className="view-clip">
                    <span onClick={this.openViewPage}></span>
                </td>
            </tr>
        );
    }
});


var Checkbox = React.createClass({

    componentDidMount: function () {

        var self = this;
        $('.' + self.getClassName()).on("click", function (e) {
            var l = self.props.checkData;
            var value = parseInt($(this).val());
            if ($(this).is(':checked')) {

                l.push(value);
            }
            else {
                if (l.indexOf(value) >= 0) {
                    var index = l.indexOf(value);
                    l.splice(index, 1);
                }
            }
            self.props.clipCollection.trigger('checkbox:click', {value: l});
        });

    },
    getChecked: function () {
        var data = this.props.checkData;
        if (data.indexOf(this.props.item.get('annotation_id')) > -1) {
            return "checked";
        }
        return null;


    },
    getClassName: function () {
        return "checkbox-" + this.props.item.get('annotation_id');
    },
    render: function () {
        return (
            <input type="checkbox" name={this.getClassName()} className={this.getClassName()}
                   checked={this.getChecked()} value={this.props.item.get('annotation_id')}/>
        );
    },
});
