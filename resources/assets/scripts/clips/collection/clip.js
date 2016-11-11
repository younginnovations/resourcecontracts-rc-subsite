var Clip = Backbone.Model.extend({});

var ClipCollection = Backbone.Collection.extend({
    initialize: function (url) {
        this.url = url;
        this.sortField = "name";
        this.sortDirection = "ASC";
    },
    setSortField: function (field, direction) {
        this.sortField = field;
        this.sortDirection = direction;
    },

    comparator: function (m) {
        return m.get(this.sortField);
    },

    // Overriding sortBy (copied from underscore and just swapping left and right for reverse sort)
    sortBy: function (iterator, context) {
        var obj = this.models,
            direction = this.sortDirection;

        return _.pluck(_.map(obj, function (value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function (left, right) {
            // swap a and b for reverse sort
            var a = direction === "ASC" ? left.criteria : right.criteria,
                b = direction === "ASC" ? right.criteria : left.criteria;

            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index < right.index ? -1 : 1;
        }), 'value');
    },
    model: Clip,
    url: this.url,
    parse: function (data) {
        this.total = data.result.length;
        return data.result;
    },
    paginate: function (b, e, filter) {
        var clips = this.withFilter(filter);
        clips = _(clips.filter(function (data, index) {
            if (index >= b && index <= e) {

                return data;
            }
        }));

        return new ClipCollection(clips.toArray());
    },
    findIntersection: function (array1, array2) {
        return _.intersection(array1, array2);
    },
    convertToInteger: function (data) {
        var year = [];
        data.map(function (y) {
            year.push(parseInt(y));
        });
        return year;
    },
    withFilter: function (value) {
        var self = this;
        var clips = this;

        if (typeof value['year'] != 'undefined' && value['year'] != null) {
            value['year'] = self.convertToInteger(value['year']);
            clips = _(clips.filter(function (data) {
                if (value['year'].indexOf(data.get('year')) > -1) {
                    return data;
                }
            }));
        }
        if (typeof value['country'] != 'undefined' && value['country'] != null) {
            clips = _(clips.filter(function (data) {
                if (value['country'].indexOf(data.get('country')) > -1) {
                    return data;
                }
            }));
        }

        if (typeof value['resource'] != 'undefined' && value['resource'] != null) {
            clips = _(clips.filter(function (data) {
                if (self.findIntersection(data.get('resource'), value['resource']).length > 0) {
                    return data;
                }
            }));
        }
        if (typeof value['category'] != 'undefined' && value['category'] != null) {
            clips = _(clips.filter(function (data) {
                if (value['category'].indexOf(data.get('category')) > -1) {
                    return data;
                }
            }));
        }

        return new ClipCollection(clips.toArray());
    },
    filterCheckData: function (annotId) {
        var clips = [];
        clips = _(this.filter(function (data) {
            if (annotId.indexOf(data.get('annotation_id')) > -1) {
                return data;
            }
        }));

        return new ClipCollection(clips.toArray());
    },
    getSelectedClips: function (clips, annotId) {
        clips = _(this.filter(function (data) {
            if (annotId.indexOf(data.get('annotation_id')) > -1) {
                return data;
            }
        }));

        return new ClipCollection(clips.toArray());
    },
    clipSort: function (field, order) {
        console.log(field,order);

        this.setSortField(field, order.toUpperCase());
        return this.sort();
//        return this;
    },
    clipSortForCheckBox: function (checkedData, order) {
        var checkClip = [];
        var unCheckClip = [];
        _.map(this.models, function (clip) {
            if (checkedData.indexOf(clip.get('annotation_id')) >= 0) {
                checkClip.push(clip);
            }
            else {
                unCheckClip.push(clip)
            }
        });
        if (order == "asc") {
            return new ClipCollection(checkClip.concat(unCheckClip));
        }
        return new ClipCollection(unCheckClip.concat(checkClip));


    },
    filterMetadata: function () {
        var filter = [];
        filter['year'] = [];
        filter['country'] = [];
        filter['resource'] = [];
        filter['category'] = [];

        this.map(function (d) {
            filter['year'].push(d.get('year'));
            filter['country'].push(d.get('country'));
            filter['category'].push(d.get('category'));
            filter['resource'] = filter['resource'].concat(d.get('resource'));
        });
        filter['year'] = _.uniq(filter['year']);
        filter['country'] = _.uniq(filter['country']);
        filter['category'] = _.uniq(filter['category']);
        filter['resource'] = _.uniq(filter['resource']);

        return filter;
    },

    removeClip: function (annotation) {
        this.remove(annotation);
        var clip = new ClipLocal({id: annotation.get('annotation_id')});
        clipLocalCollection.localStorage.destroy(clip);
        updateAnnotationCount();
    }
});