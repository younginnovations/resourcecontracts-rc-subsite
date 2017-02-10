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

        var remainingClip = $(e.target.closest("table")).find("tbody tr").length;

        if(remainingClip <= 1){

            var confirmRemoveClipAll = confirm("No Clip will remain. Are you sure you want to remove the Clip anyway?");

            if( confirmRemoveClipAll ){

                $(e.target.closest("tr")).remove();

                clipHelper.removeClip(e.target.getAttribute("data-id"));
                $("#clear-all").hide();
                $("#clip-annotations").html('<div class="no-record">There are currently no Clips.</div>');

            }else{
                return null
            }

        }else{

            var confirmRemoveClip = confirm("Are you sure you want to remove the Clip?");

            if( confirmRemoveClip ){

                //this.handleTotalOnRemove();

                $(e.target.closest("tr")).remove();

                clipHelper.removeClip(e.target.getAttribute("data-id"));

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

            articleRef = articleRef? articleRef : (langClip.page + " " + page.page);

            pageURL += langClip.page + " " + page.page + ' (<a href=' + url + '>'  + articleRef  + '</a>) ';

        })
        return pageURL;

    }
    render() {

        let docURL = app_url + "/contract/" + this.props.open_contracting_id + '/view';
        let shortText = this.getShortText();
        let moreText = this.state.shownFullText?"less":"more";

        return (
            <tr>

                <td data-title={ langClip.document }>
                    { this.props.name }
                </td>
                <td data-title={ langClip.category }>
                    <a href={ docURL }>{ this.props.category }</a>
                </td>
                <td className="clipping-article" data-title={ langClip.text }>
                    { this.state.showEllipse?shortText:this.state.text }
                    <span onClick={ this.handleText } className="listMore"> {this.state.hasEllipses? moreText :null}</span><br/>
                    <span dangerouslySetInnerHTML={{__html: this.getPages()}} />
                </td>

                <td data-title={ langClip.country }>
                    <span className="country-name-title">{ this.props.country }</span>
                </td>
                <td data-title={ langClip.year }>
                    { this.props.contractYear }
                </td>
                <td data-title={ langClip.resource }>
                    <ul>
                        { this.props.resources.map( (resource) => <li>{ resource }</li>) }
                    </ul>
                </td>
                <td className="view-clip" data-title={ langClip.viewClip }>
                    <a href={ this.props.page_url } target="_blank" ><span></span></a>
                </td>
                {
                    this.state.key?""
                        :<td className="delete-clip" data-title="ACTION">
                            <span data-id={ this.props.annotation_id } onClick={ this.removeClip }></span>
                        </td>
                }
            </tr>
        );

    }
}
