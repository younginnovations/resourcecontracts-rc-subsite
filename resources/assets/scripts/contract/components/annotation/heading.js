import React, {Component} from "react";

class Heading extends Component {

    constructor(props) {
        super(props);
        this.state = ({total: 0});
    }

    componentWillReceiveProps(props) {
        this.setState({total: props.total});
    }

    render() {
        return (
            <div className="annotation-title">{this.state.total} {annotationTerms.annotation_count_text}</div>
        );
    }
}

export default Heading;