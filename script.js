// CONTROLLER: Receive data from data.js and display it onto index.html

// START Setting up essential variables
const JAWG_ACCESS_TOKEN =
  "890xUFmEiNigo8eh1cbOpyQ7he6o2aq2kmrqIM0Vc9Knqm1wWgmACjHwmqwKE1VK";
let singaporeCor = [1.29,103.85]; // Singapore latlng
let cckCor = [1.384, 103.747];
let singaporeMap = L.map("map").setView(singaporeCor, 13); // Set the center point
// END Setting up essential variables

// START Display Jawg.sunny tile
var Jawg_Sunny = L.tileLayer(
  "https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}",
  {
    attribution:
      '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 22,
    accessToken: JAWG_ACCESS_TOKEN,
  }
);
Jawg_Sunny.addTo(singaporeMap);
// END Display Jawg.sunny tile

// START Display cckCor marker
cckMarker = L.marker(cckCor);
cckMarker.bindPopup(`Choa Chu Kang`);
cckMarker.addTo(singaporeMap);
// END Display cckCor marker

// START Circle display cck 500m radius
let cckCircle = L.circle(cckCor, {
  color: "red",
  fillColor: `orange`,
  fillOpacity: 0.1,
  radius: 500,
});
cckCircle.addTo(singaporeMap);
// END Circle display cck 500m radius

// START Clustering Markers
function getRandomLatLng(map) {
  // get the boundaries of the map
  let bounds =    map.getBounds();
  let southWest = bounds.getSouthWest();
  let northEast = bounds.getNorthEast();
  let lngSpan =   northEast.lng - southWest.lng;
  let latSpan =   northEast.lat - southWest.lat;

  let randomLng = Math.random() * lngSpan + southWest.lng;
  let randomLat = Math.random() * latSpan + southWest.lat;

  return [ randomLat, randomLng,];
}
// Create marker cluster
let markerClusterLayer = L.markerClusterGroup();
for(let i = 0; i < 1000; i++){
  let pos = getRandomLatLng(singaporeMap);
  L.marker(pos).addTo(markerClusterLayer);
}
// add marker cluster to map
markerClusterLayer.addTo(singaporeMap);
// END Clustering Markers

