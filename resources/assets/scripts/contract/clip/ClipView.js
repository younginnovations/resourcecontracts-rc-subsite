import React from "react";
import axios from "axios";
import dataTable from "../../vendor/dataTables.min.js";

import clipHelper from "./clipHelper";
import ClipCheckedManager from './ClipCheckedManager';

import DownloadManager from "../components/clip/DownloadManager";
import Listing from "../components/clip/Listing";

//let clipHelper = new ClipHelper();
//let clipCheckedManager = new ClipCheckedManager();
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
            });

            // Make a request
            axios.get( app_url + '/clip/api?key=' + key )
                .then(function (response) {

                    self.setState({
                        clips: self.state.clips.concat(response.data.result)
                    });

                    self.setState({
                        loading: false
                    });

                    window.clipTable = $('.table-contract-list').DataTable({
                        paging:true,
                        lengthChange: false,
                        searching: false,
                        pagingType: "full_numbers",
                        info: false,
                        "autoWidth": false,
                        stateSave: true,
                        "drawCallback": function( settings ) {
                            var totalPage = $(".dataTables_paginate").find("span .paginate_button").length;

                            if(totalPage < 2){
                                $(".dataTables_paginate").hide()
                            }

                            $(".viewClipCount").text(response.data.result.length);
                            $(".clipSelectCountWrapper").show();
                        },
                        "aoColumnDefs" : [ {
                            "bSortable" : false,
                            "aTargets" : [ "no-sort" ]
                        } ]
                    });


                })
                .catch(function (error) {
                    console.log(error);
                });


        }else{

            if( localClip ){
                this.setState({
                    noClips:false
                });

                // Make a request
                axios.get( app_url + '/clip/annotations?data=' + localClip )
                    .then(function (response) {
                        self.setState({
                            clips: self.state.clips.concat(response.data.result)
                        });

                        self.setState({
                            loading: false
                        });

                        var clipCheckedManager = new ClipCheckedManager();
                        let initTimes = 1;

                        window.clipTable = $('.table-contract-list').DataTable({
                            paging:true,
                            lengthChange: false,
                            searching: false,
                            pagingType: "full_numbers",
                            info: false,
                            "autoWidth": false,
                            stateSave: true,
                            "drawCallback": function( settings ) {
                                var totalPage = $(".dataTables_paginate").find("span .paginate_button").length;

                                if(totalPage < 2){
                                    $(".dataTables_paginate").hide()
                                }


                                if(initTimes == 1){
                                    clipCheckedManager.init();
                                }

                                initTimes = 0

                            },
                            "aoColumnDefs" : [ {
                                "bSortable" : false,
                                "aTargets" : [ "no-sort" ]
                            } ]
                        });

                        $(".viewClipCount").text(response.data.result.length);
                        $("#clear-all, .clipSelectCountWrapper").show();


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
            return <div className="no-record">{ langClip.currently_no_clips }</div>
        }

        if(this.state.loading){
            return <div className="loading">{ langClip.loading } </div>
        }

        return (
            <div className="clipMainWrapper">
                <DownloadManager clips={ clips }/>
                <Listing clips={ clips } removeClip={ this.removeClip }/>
            </div>
        );
    }
}


module.exports = ClipView;

