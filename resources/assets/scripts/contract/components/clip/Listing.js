import React from "react";
import Item from "./Item";

class Listing extends React.Component{

    constructor( props ) {
        super( props );

        this.state = {
            clips: [],
            totalAnnotations:0
        }

    }
    componentWillMount(){
        this.setState({
            clips: this.state.clips.concat(this.props.clips),
            totalAnnotations: this.props.clips.length
        })

    }
    /*
    isAllChecked = () =>{
        if( this.state.totalAnnotations === this.state.totalChecked ){
            this.setState({
                allChecked: true
            })
        }else{
            this.setState({
                allChecked: false
            })
        }

    }
    toggleAllChecked = () =>{
        if( this.state.allChecked ){
            let checkedAnnotations = document.getElementsByClassName("checkedAnnotation");

            for(let i=0; i < checkedAnnotations.length; i++ ){
                checkedAnnotations[i].click();
            };
        }else{
            let uncheckedAnnotations = document.getElementsByClassName("uncheckedAnnotation");

            for(let i=0; i < uncheckedAnnotations.length; i++ ){
                uncheckedAnnotations[i].click();
            };
        }
        this.setState({
            allChecked: !this.state.allChecked
        })
    }
    changeTotalAnnotation = ( status ) =>{
        if( status ){
           this.setState({
               totalChecked: --this.state.totalChecked
           })
        }else{
            this.setState({
                totalChecked: ++this.state.totalChecked
            })
        }

        //this.isAllChecked();
    }*/
    render() {
        let items = this.state.clips.map( ( clip, index ) => {
            let props = {
                key: index ,
                annotation_id: clip.annotation_id ,
                open_contracting_id :  clip.open_contracting_id ,
                category: clip.category ,
                name: clip.name ,
                text: clip.text ,
                country: clip.country ,
                contractYear: clip.year ,
                resources: clip.resource ,
                page_url: clip.page_url ,
                article_reference: clip.article_reference ,
                pages: clip.pages ,
            }
            return <Item { ...props }/>
        })

        return (
            <div id="clip-annotation-list">
                <table className="table table-responsive table-contract table-contract-list">
                    <thead>
                    <tr>
                        <th>
                            <a>{ langClip.document }</a>
                        </th>
                        <th width="15%"><a>{ langClip.category }</a>
                        </th>
                        <th width="35%"><a>{ langClip.text }</a></th>
                        <th width="114px"><a>{ langClip.country }</a>
                        </th>
                        <th width="84px"><a>{ langClip.year }</a></th>
                        <th width="150px"><a>{ langClip.resource }</a>
                        </th>
                        <th data-sorting="no-sorting">{ langClip.viewClip }</th>

                        <th data-sorting="no-sorting">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        { items }
                    </tbody>
                </table>
            </div>
        );
    }
};

module.exports = Listing;