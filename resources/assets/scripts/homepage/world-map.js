var country_latitude = 40.75;
var country_longitude = 0;
var zoom_level = 1.5;
var countryList = JSON.parse(selectedCountries);



var map = new L.Map("map", {
    zoomControl: false
});
map.scrollWheelZoom.disable();

// create the tile layer with correct attribution
var osmUrl = '';//http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = '';
var osm = new L.TileLayer(osmUrl, {minZoom: zoom_level, maxZoom: 16, attribution: osmAttrib, transparent: true});

// start the map in Nepal
map.setView(new L.LatLng(country_latitude, country_longitude), zoom_level);
map.addLayer(osm);
geojson=L.geoJson(geoData, {
    style: style,
    onEachFeature:onEachFeature
}).addTo(map);


var info = L.control();

function style(feature) {
    if($.inArray(feature.properties.code, countryList) !== -1) {
        return {
            color: "#FCCE99",
            weight:2,
            opacity: 1,
            fillOpacity: 0.7
        };
    }
    else{
        return{
            color: "#E0E0DC"
        }
    }
}

function onEachFeature(feature, layer) {
    if($.inArray(feature.properties.code, countryList) !== -1) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: clickCountry
        });
    }
}

function clickCountry(e)
{
    var code = e.target.feature.properties.code;
    var win = window.open(app_url+'/countries/'+code.toLowerCase(), '_blank');
    win.focus();
}

function highlightFeature(e)
{
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}


    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = props ?'<h4>' + props.name + '</h4>': '';
    };

    info.addTo(map);
L.control.zoom({
    position:'topright'
}).addTo(map);






