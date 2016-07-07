$(function () {
    var clipData = [];
    data.map(function (d) {
        clipData.push(d.id);
    });

    if (key != '') {
        var clipCollection = new ClipCollection(app_url + '/clip/api?key=' + key);
        clipCollection.fetch({reset: true});

    }
    else {
        var clipCollection = new ClipCollection(app_url + '/clip/annotations?data=' + clipData.toString());
        clipCollection.fetch({reset: true});
    }

    clipCollection.on('reset', function () {
        clipCollection.trigger('data:change')
    });

    React.render(<ClipView clipCollection={clipCollection} clipLocal={clipData}/>,
        document.getElementById('clip-annotations')
    );
});
