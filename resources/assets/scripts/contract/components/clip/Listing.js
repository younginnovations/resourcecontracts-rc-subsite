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
                key: index,
                annotation_id: clip.annotation_id,
                open_contracting_id :  clip.open_contracting_id,
                category: clip.category,
                name: clip.name,
                text: clip.text,
                country: clip.country,
                contractYear: clip.year,
                resources: clip.resource,
                page_url: clip.page_url,
                article_reference: clip.article_reference,
                pages: clip.pages,
                country_code : clip.country_code
            }
            return <Item { ...props }/>
        })

        return (
            <div id="clip-annotation-list">
                <table className="table table-responsive table-contract table-contract-list">
                    <thead>
                    <tr>
                        <th></th>
                        <th width="25%" className="document">
                            <span>{ langClip.document }</span>
                        </th>
                        <th width="15%"><span>{ langClip.category }</span>
                        </th>
                        <th width="32%"><span>{ langClip.text }</span></th>
                        <th width="10%"><span>{ langClip.country }</span>
                        </th>
                        <th ><span>{ langClip.resource }</span>
                        </th>
                        <th  data-sorting="no-sorting">{ langClip.actions }</th>
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