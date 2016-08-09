var country_latitude = 40.75;
var country_longitude = 0;
var zoom_level = 1.5;


//country detail show page and project index default page
function initmap() {
    // set up the map
    var map = new L.Map("map", {
        zoomControl: false
    });
    map.scrollWheelZoom.disable();

    // create the tile layer with correct attribution
    var osmUrl = '';//http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = '';
    var osm = new L.TileLayer(osmUrl, {minZoom: zoom_level, maxZoom: 16, attribution: osmAttrib, transparent: true});
    var selectedCountries = ["NP", "US"];
    // start the map in Nepal
    map.setView(new L.LatLng(country_latitude, country_longitude), zoom_level);
    map.addLayer(osm);
    L.geoJson(geoData, {
        style: function(feature) {
            console.log(feature.properties.code, $.inArray(feature.properties.code, selectedCountries));
            if($.inArray(feature.properties.code, selectedCountries) !== -1) {
                return {
                    color: "#FCCE99"
                };
            }
            else{
                return{
                    color: "#E0E0DC"
                }
            }
        }
    }).addTo(map);

    L.control.zoom({
        position:'topright'
    }).addTo(map);

};

initmap();