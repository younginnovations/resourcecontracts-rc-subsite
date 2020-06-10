var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)

function draw(ht) {
    $("#map").html("<svg id='map' xmlns='http://www.w3.org/2000/svg' width='100%' height='" + ht + "'></svg>");
    map = d3.select("svg");
    var width = $("svg").parent().width();
    var height = ht;

    projection = d3.geo
      .geoEckert3()
      .scale((width / 640) * 100)
      .translate([width / 2, height / 2]);
    var path = d3.geo.path().projection(projection);
    var newObj = {};

    var changingType = JSON.parse(selectedCountries);
    changingType.forEach(function (d) {
        newObj[d.key] = d.total;
    });

    map.selectAll('path').data(geoNew.features).enter()
        .append('path')
        .attr('d', path)
        .attr("width", width)
        .attr("height", width / 2)
        .attr("fill", function (d, i) {
            if (newObj[d.properties.code] != undefined) {
                return highlightColor;
            }
            return landColor;
        })
        .attr("cursor", function (d, i) {
            if (newObj[d.properties.code] != undefined) {
                return 'pointer';
            }
        })
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9)
                .style("padding", "8px");
            var str = d.properties.name;
            var documents = parseInt(newObj[d.properties.code]);

            if (documents == 1) {
                str = documents + ' '+ documentLang + '<br/>' + str;
            }

            if (documents > 1) {
                str = documents + ' '+ documentsLang + '<br/>' + str;
            }

            tooltip.html(str)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 30) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on("click", function (e) {
            if (newObj[e.properties.code] != undefined) {
                var code = e.properties.code;
                var win = window.open(app_url + '/countries/' + code.toLowerCase(), '_self');
                win.focus();
            }
        });
}

draw(($("#map").width()) / 2);

$(window).resize(function () {
    if (this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function () {
        $(this).trigger('resizeEnd');
    }, 500);
});

$(window).bind('resizeEnd', function () {
    var height = $("#map").width() / 2;
    $("#map svg").css("height", height);
    draw(height);
});
