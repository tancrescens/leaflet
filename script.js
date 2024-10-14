let singaporeCor = [1.29, 103.85]; // Singapore latlng
let cckCor = [1.384, 103.747];
let singaporeMap = L.map("map").setView(singaporeCor, 13); // Set the center point

// Tile layers setup
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(singaporeMap);
