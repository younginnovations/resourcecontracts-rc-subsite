import React from "react";
import Item from "./Item";

class Listing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            clips: [],
            totalAnnotations: 0,
            key: ''
        }
    }

    componentWillMount() {
        this.setState({
            clips: this.state.clips.concat(this.props.clips),
            totalAnnotations: this.props.clips.length,
            key: key
        })
    }

    render() {
        let items = this.state.clips.map((clip, index) => {
            let props = {
                key: index,
                annotation_id: clip.annotation_id,
                open_contracting_id: clip.open_contracting_id,
                category: clip.category,
                name: clip.name,
                text: clip.text,
                country: clip.country,
                contractYear: clip.year,
                resources: clip.resource,
                pages: clip.pages,
                country_code: clip.country_code,
                year: clip.year
            };
            return <Item { ...props }/>
        });

        let hideStyle = {
            display: "none"
        };

        return (
            <div id="clip-annotation-list">
                {
                    this.state.key ? "" :
                        <div className="checkedInfo" style={ hideStyle }>
                            <span className="info"><span className="checkedCount">0</span>
                                <span className="singular"> { langClip.clip_selected }</span>
                                <span className="plural"> { langClip.clips_selected }</span>
                            </span>
                            <span className="bulk_actions">
                                <button className="removeSelectedBtn"><span></span>{ langClip.remove_selected }</button>
                            </span>
                        </div>
                }
                <table className="table table-responsive table-contract table-contract-list">
                    <thead>
                    <tr>
                        {
                            this.state.key ? "" :
                                < th data-sorting="no-sorting" className="no-sort">
                                    <input type="checkbox" className="selectVisible"/>
                                </th>
                        }
                        <th width="25%" className="document">
                            <span>{ langClip.document }</span>
                        </th>
                        <th><span>{ langClip.year }</span></th>
                        <th width="15%"><span>{ annotationTerms.annotation_category }</span>
                        </th>
                        <th width="32%"><span>{ annotationTerms.annotation_text }</span></th>
                        <th width="10%"><span>{ langClip.country }</span>
                        </th>
                        <th width="15%"><span>{ langClip.resource }</span>
                        </th>
                        <th data-sorting="no-sorting">{ annotationTerms.view_annotation }</th>
                    </tr>
                    </thead>
                    <tbody>
                    { items }
                    </tbody>
                </table>
            </div>
        );
    }
}

module.exports = Listing;
