import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import clipHelper from "../../clip/clipHelper";

//let clipHelper = new ClipHelper();

class DownloadManager extends React.Component{

    constructor( props ){
        super( props )

        this.state ={
            key: key,
            clips: this.props.clips,
            clipsToDownload: [],
            loadingPDF:false,
            clipKey:"",
            clipSaving: false,
            shareDropdownOpen: false,
            facebook_url: 'https://www.facebook.com/sharer/sharer.php?u=',
            twitter_url: 'https://twitter.com/share?text=',
        }

    }

    getClipsToDownload = ( ids ) => {

        var checkedClips = this.state.clips.filter((annotation)=> {
            let annotation_id = String(annotation.annotation_id);
            return ids.indexOf(annotation_id) > -1;
        })

        if(checkedClips.length > 0) {
            return checkedClips;

        }else{
            return this.state.clips;
        }
    }
    getAnnotationIdsToDownload = ()=>{

        if( checkedClips.length > 0 ){
            return checkedClips;
        }

        let annotationIds = clipHelper.getLocalClips();
        if(!annotationIds){
            annotationIds = this.state.clips.map( clip=> {
                return clip.annotation_id;
            })
        }

        return annotationIds;

    }

    downloadXLS = () =>{

        let annotationIds = this.getAnnotationIdsToDownload();

        if( annotationIds ) {
            window.open( app_url + "/clip/xls-download?id="+annotationIds.toString());
        }
        else{
            alert("No clips added. Please add some clips");
            return null;
        }

    }
    setPrintData = ( annotationIds ) =>{
        let checkedClips = this.getClipsToDownload( annotationIds );
        let printData = "";

        checkedClips.map(function (clip, index) {
            printData += '<div></div><ul  style="list-style: none;padding: 0;">' +
                "<li style='margin-bottom: 5px;'><b style='font-size: large'>" + clip.name + "</b></td>" +
                "<li style='margin-bottom: 8px;'>" + clip.text + "</li>" +
                "<li style='margin-bottom: 5px;'><b>Category:</b> " + clip.category + "</li>" +
                "<li> <b>Year : </b>" + clip.year + ", <b>Country: </b>" + clip.country + ", <b>Resource: </b>" + clip.resource.toString() + "</li>" +
                "</ul></div>" + "<hr>";
        });

        return printData;
    }

    openPrintWindow = ( printData ) =>{
        let myWindow = window.open('', 'my div', 'height=800,width=600');
        myWindow.document.write('<html><head><title>');
        myWindow.document.write('</title>')
        myWindow.document.write('</head><body >');
        myWindow.document.write( printData );
        myWindow.document.write('</body></html>');
        myWindow.document.close(); // necessary for IE >= 10
        myWindow.focus(); // necessary for IE >= 10
        myWindow.print();
        myWindow.close();
        return true;
    }

    handlePrint = () =>{
        let annotationIds = this.getAnnotationIdsToDownload();

        if( annotationIds ) {
            let printData = this.setPrintData( annotationIds );

            this.openPrintWindow(printData);
        }else{
            alert("No clips added. Please add some clips");
            return null;
        }
    };

    downloadPDF = () =>{
        let self = this;
        self.setState({
            loadingPDF:true
        });

        let annotationIds = this.getAnnotationIdsToDownload();
        axios.post( app_url + '/clip/zip?id=' + annotationIds )
            .then( ( response ) => {
                window.open(response.data, "__blank");
                self.setState({
                    loadingPDF:false
                })
            })
            .catch( ( error )=>{
                console.log( error );
                self.setState({
                    loadingPDF:false
                })
            })
    };

    getShareUrl =() => {
        return app_url +"/clip/" + Cookies.get('clip_key');
    };
    getFacebookShare = () =>{
        return this.state.facebook_url + this.getShareUrl();
    };
    getTwitterShare = () =>{
        return this.state.twitter_url + document.title + '&url=' + this.getShareUrl();
    };

    handleSaveClip =()=>{

        if(!key) {
            this.setState({
                clipSaving: true
            });

            if( !this.state.shareDropdownOpen ){

                let postData = {
                    data: clipHelper.getLocalClips(),
                    key: Cookies.get('clip_key')?Cookies.get('clip_key'):""
                };

                axios.post( app_url + '/clip/save', postData)
                    .then( ( response ) => {

                        Cookies.set('clip_key', response.data.key?response.data.key:"" );

                        this.setState({
                            clipSaving:false,
                            clipKey: response.data.key?response.data.key:""
                        })


                    })
                    .catch( ( error )=>{
                        console.log( error );

                    })
            }
        }else{
            return null;
        }

    };

    render() {
        let loadingPDF = this.state.loadingPDF?"(Processing...)":"";
        let savingStyle;
        if( this.state.clipSaving ){
            savingStyle = {
                cursor: "progress",
                opacity: 0.5
            }
        }

        let shareText = this.state.clipSaving?"Saving...":langClip.save_and_shareClip;

        return (
            <div className="actions-wrapper action-btn">

                <div className="download-dropdown dropdown-wrapper">
                    <a className="dropdown-toggle"><span className="text">{langClip.download}</span></a>
                    <ul className="dropdown-menu ">
                        <li><a id="download-clip-filter" onClick={ this.downloadXLS }>{langClip.xls}</a></li>
                        <li><a id="pdf_downloader" onClick={ this.downloadPDF }>{ langClip.zip } <small><i>{ loadingPDF  }</i></small></a></li>
                    </ul>
                </div>
                <div id="print-clip-filter" onClick={ this.handlePrint }><span className="text">{langClip.printClip}</span></div>
                <div className="modal-social-share-wrap social-share share-dropdown dropdown-wrapper">
                    <a id="save-clipping" className="dropdown-toggle" onClick={ this.handleSaveClip }><span className="text">{ shareText }</span></a>
                    <ul className="dropdown-menu">
                        <li className="facebook" style={ savingStyle }>
                            <a href={ this.getFacebookShare() } target="_blank"></a>
                        </li>
                        <li className="twitter" style={ savingStyle }>
                            <a href={ this.getTwitterShare() } target="_blank"></a>
                        </li>
                        <li className="email" style={ savingStyle }>
                            <a href="#"
                               className="shareEmailToggler"
                               data-toggle="modal"
                               data-target="#emailModel"
                               data-title={ langClip.share_clips_email }
                               data-share="clip">

                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

module.exports = DownloadManager;