import React, {Component} from "react";
import Item from "./item";
import _map from "lodash/map";
import _groupBy from "lodash/groupBy";
import Event from '../../event';
import ClipAll from '../clip/all';

let List = React.createClass({
    getInitialState() {
        return {
            isLoading: true,
            annotations: [],
            sortBy: null
        }
    },
    componentDidMount: function () {
        let offset = 150;
        let duration = 200;

        $("#annotations-box").scroll(function () {
            if ($(this).scrollTop() > offset) {
                $('.back-to-top').fadeIn(duration);
            } else {
                $('.back-to-top').fadeOut(duration);
            }
        });

        $('.back-to-top').click(function (event) {
            event.preventDefault();
            $('.annotation-inner-viewer').animate({scrollTop: 0}, duration);
            return false;
        })
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
    getAnnotations()
    {
        let result = this.state.annotations;
        if (this.state.sortBy == 'cluster') {
            result = _groupBy(result, function (annotation) {
                return annotation.category_key;
            });
            let cluster = [];
            _map(result, (k, v) => {
                cluster.push(v);
            });
            let sortByCluster = [];
            cluster.sort().forEach((k, v) => {
                sortByCluster.push(result[k]);
            });

            result = sortByCluster;
        } else {
            let sortByPage = [];
            result.forEach((k, v) => {
                sortByPage.push([k]);
            });
            result = sortByPage;
        }

        return result;
    },
    isActiveAnnotation(annotations){
        let active = false;

        annotations.forEach(v => {
            if (this.state.selectedAnnotation == v.id) {
                active = true;
            }
        });

        return active;
    },
    renderItems(){
        debug('Annotation List :', this.getAnnotations());
        let annotations = this.getAnnotations();
        return annotations.map((annotations, key) => {
            return (
                <Item key={key} active={this.isActiveAnnotation(annotations)} annotation={annotations}/>)
        });
    },
    render() {
        let render = (<p className="annotation-loading">{annotationTerms.langAnnotation.loading_annotations}</p>);
        let clipAll = null;
        if (!this.state.isLoading) {
            let annotations = this.getAnnotations();
            if (annotations.length > 0) {
                render = this.renderItems();
                clipAll = (<ClipAll/>);
            } else {
                render = (<p className="annotation-loading">{annotationTerms.no_annotation_msg}</p>);
            }
        }

        return (
            <div className="annotations-list" id="id-annotations-list">
                {clipAll}
                {render}
                <a href="#" className="back-to-top btn btn-primary"><i className="fa fa-arrow-up"></i></a>
            </div>
        );
    }
});

export default List;