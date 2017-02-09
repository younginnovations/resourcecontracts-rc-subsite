import React from "react";
import Item from "./Item";

class Listing extends React.Component{

    constructor( props ) {
        super( props );

        this.state = {
            clips: [],
            totalAnnotations:0,
            key: ''
        }

    }
    componentWillMount(){
        this.setState({
            clips: this.state.clips.concat(this.props.clips),
            totalAnnotations: this.props.clips.length,
            key: key
        })

    }
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

                        { this.state.key?"":<th data-sorting="no-sorting">Actions</th>}
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