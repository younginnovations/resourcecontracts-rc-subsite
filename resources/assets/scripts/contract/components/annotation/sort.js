import React, {Component} from "react";
import Cluster from './cluster';
import Event from '../../event';

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            show: true,
            sortBy: "cluster"
        })
    }

    changeType(type) {
        this.setState({sortBy: type});
        Event.publish('sort:change', type);
        debug('sort:change triggered', type);
    }

    onClickPage(e) {
        e.preventDefault();
        $('.annotation-item').show();
        this.changeType("page");
    }

    onClickCluster(e) {
        e.preventDefault();
        this.changeType("cluster");
    }

    componentWillReceiveProps(props)
    {
        this.setState({sortBy: props.type});
    }

    render() {
        var cluster = '';
        var pageClassName = "active", clusterClassName = "";
        if (this.state.sortBy == "cluster") {
            pageClassName = "";
            clusterClassName = "active";
            cluster = <Cluster/>;
        }

        if (!this.state.show) {
            return null;
        }

        return (
            <div className="annotation-sort">
                <span className={pageClassName} onClick={this.onClickPage.bind(this)}>{lang.by_page}</span>
                <span className={clusterClassName} onClick={this.onClickCluster.bind(this)}>{lang.by_topic}</span>
                {cluster}
            </div>
        );
    }
}

export default Sort;