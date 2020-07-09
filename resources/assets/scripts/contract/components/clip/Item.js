import  React from "react";
import  clipHelper from "../../clip/clipHelper";
import _SortBy from 'lodash/sortBy';
import _GroupBy from 'lodash/groupBy';
import _Map from 'lodash/map';


export default class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            key: '',
            maxWords: 60,
            text: "",
            shortText: "",
            hasEllipses: true,
            showEllipse: true,
            shownFullText: false
        }
    }

    componentWillMount() {
        let text = this.props.text + " ";
        let showEllipse = this.shallShowEllipses();
        this.setState({
            text,
            hasEllipses: showEllipse,
            showEllipse,
            key: key
        });
    }

    getShortText() {
        let words = this.props.text.split(" ");

        if (words) {
            return words.splice(0, this.state.maxWords).join(" ") + "... ";
        }

        return null;
    }

    shallShowEllipses() {
        let words = this.props.text.split(" ");
        let totalWords = words.length;

        return totalWords > this.state.maxWords ? true : false;
    }

    removeClip = (e) => {

        var remainingClip = $(e.target.closest("table")).find("tbody tr").length;
        var annotation_id = $(e.target).attr("data-id");

        if (remainingClip <= 1) {

            var confirmRemoveClipAll = confirm(langClip.no_clip_remain);

            if (confirmRemoveClipAll) {

                clipTable.row($(e.target).closest("tr")).remove().draw(false);

                clipHelper.removeClip(e, annotation_id);
                $("#clear-all").hide();
                $("#clip-annotations .clipMainWrapper").hide();
                $("#clip-annotations").append('<div class="no-record">' + langClip.currently_no_clips + '</div>');

            } else {
                return null
            }

        } else {

            var removeConfirmMsg = langClip.remove_clip_confirm+' '+langClip.cannot_be_undone;
            var confirmRemoveClip = confirm(removeConfirmMsg);

            if (confirmRemoveClip) {

                clipTable.row($(e.target).closest("tr")).remove().draw(false);

                clipHelper.removeClip(e, annotation_id);

            } else {
                return null
            }

        }

    };

    handleText() {
        this.setState({
            shownFullText: !this.state.shownFullText,
            showEllipse: !this.state.showEllipse
        });
    }

    getPages() {
        let pages = this.props.pages;
        let OCID = this.props.open_contracting_id;
        let pageURL = [];
        let articleRef = '';
        let url = '';
        let ref = '';
        pages = _SortBy(pages, 'page');
        pages = _GroupBy(pages, 'page');
        _Map(pages, (page, pagenumber) => {
            articleRef = [];
            page.map((p, i)=> {
                url = app_url + "/contract/" + OCID + '/view#/' + p.type + '/page/' + p.page + '/annotation/' + p.id;
                ref = p.article_reference ? p.article_reference : p.page;
                articleRef.push(' ( <a href=' + url + '>' + ref + '</a> ) ');
            });
            pageURL.push(langClip.page + " " + pagenumber + articleRef.join(', '));
        });

        return pageURL.join(', ');
    }

    getFlagUrl(country_code) {
        if (country_code != '') {
            var imageName = country_code.toLowerCase() + ".png";
            return "https://raw.githubusercontent.com/younginnovations/country-flags/master/png250px/" + imageName;
        } else {
            return null;
        }
    }

    getPopupUrl() {
        let pages = _SortBy(this.props.pages, 'page');
        let page = pages[0].id;

        return app_url + "/contract/" + this.props.open_contracting_id + '/popup/' + page;
    }

    openViewPage(e) {
        e.preventDefault();
        var newWindow = window.open(this.getPopupUrl(), '_blank', 'toolbar=0,width=650,height=500,location=0,menubar=0, scrollbars=yes');
        if (window.focus) {
            newWindow.focus()
        }
    }

    render() {
        let docURL = app_url + "/contract/" + this.props.open_contracting_id + '/view#/pdf/page/' + this.props.pages[0].page +'/annotation/' + this.props.pages[0].id;
        let flagURL = this.getFlagUrl(this.props.country_code);
        let shortText = this.getShortText();
        let moreText = this.state.shownFullText ? "less" : "more";

        let flagStyle = {
            width: "24px",
            height: "auto",
            marginRight: "5px"
        };

        return (
            <tr>
                {
                    this.state.key ? "" :
                        < td className="checkbox_row">
                            < input type="checkbox"
                                    className="clipSelect"
                                    data-id={ this.props.annotation_id }
                            />
                        </td>
                }
                <td data-title={ langClip.document } className="document_title">
                    <a href={ docURL }>{ this.props.name }</a>
                </td>
                <td>{ this.props.year }</td>
                <td data-title={ langClip.key_clause }>
                    { this.props.category }
                </td>
                <td className="clipping-article" data-title={ langClip.clause_summary }>
                    { this.state.showEllipse ? shortText : this.state.text }
                    <span onClick={ this.handleText.bind(this) }
                          className="listMore"> {this.state.hasEllipses ? moreText : null}</span><br/>
                    <span dangerouslySetInnerHTML={{__html: this.getPages()}}/>
                </td>

                <td data-title={ langClip.country }>
                    { flagURL ? <img style={ flagStyle } src={ flagURL } alt=""/> : "" }
                    <span className="country-name-title">{ this.props.country }</span>
                </td>
                <td data-title={ langClip.resource }>
                    <ul>
                        { this.props.resources.map((resource) => <li>{ resource }</li>) }
                    </ul>
                </td>
                <td className="actions" data-title={ langClip.actions }>
                    <a href="#"
                       data-toggle="tooltip"
                       title={ langClip.view_on_doc }
                       onClick={ this.openViewPage.bind(this) }
                    >
                        <span className="actions__view"></span>
                    </a>
                    {
                        this.state.key ? ""
                            : <span className="delete" data-toggle="tooltip" title={ langClip.remove_clip }
                                    data-id={ this.props.annotation_id } onClick={ this.removeClip }></span>
                    }
                </td>
            </tr>
        );
    }
}
