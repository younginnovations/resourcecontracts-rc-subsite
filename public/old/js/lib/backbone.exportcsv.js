// https://gist.github.com/kjantzer/7679301
Backbone.Collection.prototype.saveToCSV = function(downloadName) {
    downloadName = downloadName ? downloadName : 'CSV data ' + (new XDate()).toString('yyyy-MM-dd hhmmss');
    if (this.length == 0) return console.log('No data to export');
    var header = _.map(_.keys(this.first().csvData()), function(val) {
        return val;
    })
    var rows = this.map(function(m) {
        return _.values(m.csvData())
    })
    var data = [header].concat(rows);
    data = _.map(data, function(row) {
        return _.map(row, function(val, key) {
            if (_.isString(val) && val.match(/,|\n|"/)) {
                val = '"' + val + '"';
            } else if (_.isArray(val)) val = '"' + val.toString() + '"';
            return val;
        })
    })
    var csvContent = "data:text/csv;charset=utf-8,";
    data.forEach(function(infoArray, index) {
        dataString = infoArray.join(",");
        csvContent += index < data.length ? dataString + "\n" : dataString;
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", downloadName + ".csv");
    link.click();
}
Backbone.Model.prototype.csvData = function(str) {
    return this.toJSON();
}