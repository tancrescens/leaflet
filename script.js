let singaporeCor = [1.29, 103.85]; // Singapore latlng
let singaporeMap = L.map("map").setView(singaporeCor, 13); // Set the center point

// Setup the tile layers
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(singaporeMap);

// Setup circle
let circle = L.circle([1.384, 103.747], 50);
