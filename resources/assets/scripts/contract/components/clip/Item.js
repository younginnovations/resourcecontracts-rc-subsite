import  React from "react";
import  ClipHelper from "../../clip/clipHelper";

let clipHelper = new ClipHelper();

export default class Item extends React.Component {
    constructor( props ) {
        super( props );

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
    componentWillMount(){

        let text = this.props.text + " ";
        let showEllipse= this.shallShowEllipses();

        this.setState({
            text,
            hasEllipses: showEllipse,
            showEllipse,
            key: key
        });

    }
    getShortText =()=>{

        let words = this.props.text.split(" ");
        let shortText= "";

        if( words ){
            let shortText = words.splice(0, this.state.maxWords).join(" ") + "... ";

            return shortText;

        }else{

            return null;

        }

    }
    shallShowEllipses =()=>{
        let words = this.props.text.split(" ");
        let totalWords = words.length;

        return totalWords > this.state.maxWords?true:false;
    }


    removeClip = ( e ) => {
        console.log(typeof($(e.target).attr("data-id")));

        var remainingClip = $(e.target.closest("table")).find("tbody tr").length;

        if(remainingClip <= 1){

            var confirmRemoveClipAll = confirm( langClip.no_clip_remain );

            if( confirmRemoveClipAll ){

                $(e.target.closest("tr")).remove();

                clipHelper.removeClip($(e.target).attr("data-id"));
                $("#clear-all").hide();
                $("#clip-annotations").html('<div class="no-record">' +  langClip.currently_no_clips + '</div>');
                $(".viewClipCount").text( parseInt($(".viewClipCount").text()) - 1 );

            }else{
                return null
            }

        }else{

            var confirmRemoveClip = confirm( langClip.remove_clip_confirm );

            if( confirmRemoveClip ){

                //this.handleTotalOnRemove();

                $(e.target.closest("tr")).remove();

                clipHelper.removeClip(e.target.getAttribute("data-id"));
                $(".viewClipCount").text( parseInt($(".viewClipCount").text()) - 1 );

            }else{
                return null
            }

        }

    }
    handleText = ()=>{
        this.setState({
            shownFullText: !this.state.shownFullText,
            showEllipse: !this.state.showEllipse
        })
    }

    getPages=()=>{
        let pages = this.props.pages;
        let OCID = this.props.open_contracting_id;
        let articleRef = this.props.article_reference;
        let pageURL = "";

        pages.map( (page, index) => {
            let url = app_url + "/contract/" + OCID + '/view#/' + page.type + '/page/' + page.page + '/annotation/' + page.id;

            articleRef = articleRef? articleRef : page.page;

            pageURL += langClip.page + " " + page.page + ' (<a href=' + url + '>'  + articleRef  + '</a>) ';

        });
        return pageURL;

    }
    getFlagUrl = ( country_code )=>{
        if (country_code != '') {
            var imageName = country_code.toLowerCase() + ".png";
            return "https://raw.githubusercontent.com/younginnovations/country-flags/master/png250px/" + imageName;
        }else{
            return null
        }

    }

    openViewPage = (e) =>{
        e.preventDefault();
        var newWindow = window.open(this.props.page_url, '_blank', 'toolbar=0,width=650,height=500,location=0,menubar=0, scrollbars=yes');
        if (window.focus) {
            newWindow.focus()
        }
    }
    render() {

        let docURL = app_url + "/contract/" + this.props.open_contracting_id + '/view';
        let flagURL = this.getFlagUrl( this.props.country_code );
        let shortText = this.getShortText();
        let moreText = this.state.shownFullText?"less":"more";

        let flagStyle = {
            width: "24px",
            height: "auto",
            marginRight: "5px"
        }

        return (
            <tr>
                <td></td>
                <td data-title={ langClip.document }>
                    <a href={ docURL }>{ this.props.name }</a>
                </td>
                <td data-title={ langClip.category }>
                    { this.props.category }
                </td>
                <td className="clipping-article" data-title={ langClip.text }>
                    { this.state.showEllipse?shortText:this.state.text }
                    <span onClick={ this.handleText } className="listMore"> {this.state.hasEllipses? moreText :null}</span><br/>
                    <span dangerouslySetInnerHTML={{__html: this.getPages()}} />
                </td>

                <td data-title={ langClip.country }>
                    { flagURL?<img style={ flagStyle } src={ flagURL } alt=""/>:"" }
                    <span className="country-name-title">{ this.props.country }</span>
                </td>
                <td data-title={ langClip.resource }>
                    <ul>
                        { this.props.resources.map( (resource) => <li>{ resource }</li>) }
                    </ul>
                </td>
                <td className="actions"  data-title={ langClip.actions }>
                    <a href="#"
                       data-toggle="tooltip"
                       title={ langClip.view_on_doc }
                       onClick={ this.openViewPage }
                    >
                        <span className="view"></span>
                    </a>
                    {
                        this.state.key?""
                            :<span className="delete" data-toggle="tooltip" title={ langClip.remove_clip } data-id={ this.props.annotation_id } onClick={ this.removeClip }></span>
                    }
                </td>

            </tr>
        );

    }
}
