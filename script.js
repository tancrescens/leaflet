// CONTROLLER: Receive data from data.js and display it onto index.html

// START Setting up essential variables =======================================================================
const JAWG_ACCESS_TOKEN =
  "890xUFmEiNigo8eh1cbOpyQ7he6o2aq2kmrqIM0Vc9Knqm1wWgmACjHwmqwKE1VK";
let singaporeCor = [1.39,103.80]; // Singapore latlng
let cckCor = [1.384, 103.747];
let singaporeMap = L.map("map").setView(singaporeCor, 13); // Set the center point
// END Setting up essential variables =======================================================================


// START Display Jawg.sunny tile =======================================================================
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
// END Display Jawg.sunny tile =======================================================================


// START Display cckCor marker =======================================================================
let cckGroup = L.layerGroup();
cckMarker = L.marker(cckCor);
cckMarker.bindPopup(`Choa Chu Kang`);
cckMarker.addTo(cckGroup);
// END Display cckCor marker


// START Circle display cck 500m radius
let cckCircle = L.circle(cckCor, {
  color: "red",
  fillColor: `orange`,
  fillOpacity: 0.1,
  radius: 500,
});
cckCircle.addTo(cckGroup);
// END Circle display cck 500m radius =======================================================================


// START Clustering Markers =======================================================================
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
// Create random marker cluster group
let randomMarkerClusterGroup = L.layerGroup();
// Create grandom marker cluster
let randomMarkerClusterLayer = L.markerClusterGroup();
for(let i = 0; i < 1000; i++){
  let pos = getRandomLatLng(singaporeMap);
  L.marker(pos).addTo(randomMarkerClusterLayer);
}
// add marker cluster to map
randomMarkerClusterLayer.addTo(randomMarkerClusterGroup);
// END Clustering Markers =======================================================================


// START Polylines creation =======================================================================
// Various locations
let polylineGroup = L.layerGroup();
const brothersRamen = {latlng:[1.2761402436896734, 103.84621509560635], name:"Brothers Ramen"};
const hokkaidoRamenSantouka = {latlng:[1.2891689786154696, 103.8460687260308], name:"Hokkaido Ramen Santouka"};
// Compiled locations                                                                                                                                                                                                                                                                                                                                                                                                               
var places = [
  brothersRamen,
  hokkaidoRamenSantouka
];
// marker creation for compiled locations
places.forEach(place=>{
  // create marker for each place
  marker = L.marker(place.latlng);
  marker.bindPopup(place.name);
  marker.addTo(polylineGroup);
});
// push each latlng into array
let latlngArray = places.map(place=>place.latlng);
// polyline creation
var polyline = L.polyline(latlngArray, {color:'red'})
polyline.addTo(polylineGroup);
// END Polylines creation =======================================================================


// START layering =======================================================================
// baseLayers: only 1 baseLayer can appear at a time
let baseLayers = {

}
// overlays: all selected overlays/groups will appear
let overlays = {
  'CCK': cckGroup,
  'Random Clusters': randomMarkerClusterGroup,
  'Polyline': polylineGroup
}
// Add layers to the map
L.control.layers(baseLayers, overlays).addTo(singaporeMap);
// END layering =======================================================================
