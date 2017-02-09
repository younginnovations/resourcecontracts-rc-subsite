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


        var confirmRemoveClip = confirm("Are you sure that you want to remove the clips?");

        if( confirmRemoveClip ){

            //this.handleTotalOnRemove();

            $(e.target.closest("tr")).remove();

            clipHelper.removeClip(e.target.getAttribute("data-id"));

            if($( ".table-contract-list tbody").find("tr").length == 0 ){
                $( ".table-contract-list tbody").append("<tr><td colspan='9' class='noClipMsg'> There are currently no Clips.</td></tr>");
            }
        }else{
            return null
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


    /*handleTotalOnRemove = () =>{
        this.props.handleTotal( true );
    }


    handleTotal = ( e ) => {

        let status = this.state.checked;

        this.props.handleTotal( status );
        this.setState({
            checked:!this.state.checked
        })

    }*/
    render() {

        let docURL = app_url + "/contract/" + this.props.open_contracting_id + '/view';
        let shortText = this.getShortText();
        let moreText = this.state.shownFullText?"less":"more";

        return (
            <tr>

                <td>
                    { this.props.name }
                </td>
                <td>
                    <a href={ docURL }>{ this.props.category }</a>
                </td>
                <td className="clipping-article">
                    { this.state.showEllipse?shortText:this.state.text }
                    <span onClick={ this.handleText } className="listMore"> {this.state.hasEllipses? moreText :null}</span><br/>
                    <span dangerouslySetInnerHTML={{__html: this.getPages()}} />
                </td>

                <td>
                    <span className="country-name-title">{ this.props.country }</span>
                </td>
                <td>
                    { this.props.contractYear }
                </td>
                <td>
                    <ul>
                        { this.props.resources.map( (resource) => <li>{ resource }</li>) }
                    </ul>
                </td>
                <td className="view-clip">
                    <a href={ this.props.page_url } target="_blank" ><span></span></a>
                </td>
                {
                    this.state.key?""
                        :<td className="delete-clip">
                            <span data-id={ this.props.annotation_id } onClick={ this.removeClip }></span>
                        </td>
                }
            </tr>
        );

    }
}
