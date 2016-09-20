import React, {Component} from "react";

class Cluster extends Component {
    constructor(props) {
        super(props);
        this.state = ({show: false})
    }

    handleClick(cluster, e) {
        e.preventDefault();
        var selected = cluster;
        if (selected == 'All') {
            $('.annotation-item').show();
        } else {
            $('.annotation-item').hide();
            $('.' + selected).show();
        }
        $(".annotations-topic-list > span").removeClass("selected-topic");
        $(e.target).addClass("selected-topic");
    }

    render() {
        return (
            <div className="annotations-topic-list">
                <span className="selected-topic" onClick={this.handleClick.bind(this,'All')}>{LANG.all}</span>
                <span onClick={this.handleClick.bind(this,'general')}>{LANG.general}</span>
                <span onClick={this.handleClick.bind(this,'environment')}>{LANG.environment}</span>
                <span onClick={this.handleClick.bind(this,'fiscal')}>{LANG.fiscal}</span>
                <span onClick={this.handleClick.bind(this,'operations')}>{LANG.operations}</span>
                <span onClick={this.handleClick.bind(this,'social')}>{LANG.social}</span>
                <span onClick={this.handleClick.bind(this,'legal_rules')}>{LANG.legal_rules}</span>
            </div>
        );
    }
}

export default Cluster;