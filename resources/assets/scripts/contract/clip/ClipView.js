import React from "react";
import axios from "axios";
import dataTable from "../../vendor/dataTables.min.js";

import ClipHelper from "./clipHelper";

import DownloadManager from "../components/clip/DownloadManager";
import Listing from "../components/clip/Listing";

let clipHelper = new ClipHelper();
let localClip = clipHelper.getLocalClips();

class ClipView extends React.Component{
    constructor() {
        super();

        this.state = {
            noClips:true,
            clips: [],
            loading:true
        }

    }

    componentWillMount() {

        let self = this;

        if( key ){

            this.setState({
                noClips:false
            })

            // Make a request
            axios.get( app_url + '/clip/api?key=' + key )
                .then(function (response) {

                    self.setState({
                        clips: self.state.clips.concat(response.data.result)
                    })

                    self.setState({
                        loading: false
                    })

                    $('.table-contract-list').DataTable({
                        paging:true,
                        lengthChange: false,
                        searching: false,
                        pagingType: "full_numbers",
                        info: false
                    });

                })
                .catch(function (error) {
                    console.log(error);
                });


        }else{

            if( localClip ){
                this.setState({
                    noClips:false
                })

                // Make a request
                axios.get( app_url + '/clip/annotations?data=' + localClip )
                    .then(function (response) {

                        self.setState({
                            clips: self.state.clips.concat(response.data.result)
                        })

                        self.setState({
                            loading: false
                        })

                        $('.table-contract-list').DataTable({
                            paging:true,
                            lengthChange: false,
                            searching: false,
                            pagingType: "full_numbers",
                            info: false
                        });

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }else{
                this.setState({
                    noClips:true,
                    loading: false
                })
            }

        }



    }
    render = () => {

        let clips = this.state.clips;

        if( this.state.noClips ){
            return <div className="no-record">There are currently no Clips.</div>
        }

        if(this.state.loading){
            return <div className="loading">Loading... </div>
        }

        return (
            <div>
                <DownloadManager clips={ clips }/>
                <Listing clips={ clips }/>
            </div>
        );
    }
}


module.exports = ClipView;

