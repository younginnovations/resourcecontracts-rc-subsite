import React, {Component} from "react";
import Item from "./item";
import _map from "lodash/map";
import _groupBy from "lodash/groupBy";
import Event from '../../event';

var List = React.createClass({
    getInitialState() {
        return {
            isLoading: true,
            annotations: [],
            sortBy: null
        }
    },
    componentWillReceiveProps(props)
    {
        this.setState({
            isLoading: false,
            annotations: props.annotations,
            sortBy: props.sort,
            selectedAnnotation: props.selectedAnnotation
        });
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextProps.annotations.length == 0) {
            return true;
        }
        return true;
      //  return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    },
    getAnnotations()
    {
        var result = this.state.annotations;
        if (this.state.sortBy == 'cluster') {
            result = _groupBy(result, function (annotation) {
                return annotation.category_key;
            });
            var cluster = [];
            _map(result, function (k, v) {
                cluster.push(v);
            });
            var sortByCluster = [];
            _map(cluster.sort(), function (k, v) {
                sortByCluster.push(result[k]);
            });

            result = sortByCluster;
        } else {
            var sortByPage = [];
            _map(result, function (k, v) {
                sortByPage.push([k]);
            });
            result = sortByPage;
        }

        return result;
    },
    isActiveAnnotation(annotations){
        var active = false;

        _map(annotations, (v) => {
            if (this.state.selectedAnnotation == v.id) {
                active = true;
            }
        });

        return active;
    },
    renderItems(){
        debug('Annotation List :', this.getAnnotations());
        var annotations = this.getAnnotations();
        return _map(annotations, function (annotations, key) {
            return (
                <Item key={key} active={this.isActiveAnnotation(annotations)} annotation={annotations}/>)
        }.bind(this));
    },
    render() {
        var render = (<p className="annotation-loading">{LANG.loading_annotations}</p>);

        if (!this.state.isLoading) {
            var annotations = this.getAnnotations();
            if (annotations.length > 0) {
                render = this.renderItems();
            } else {
                render = (<p className="annotation-loading">{LANG.no_annotation}</p>);
            }
        }

        return (
            <div className="annotations-list" id="id-annotations-list">
                {render}
            </div>
        );
    }
});

export default List;