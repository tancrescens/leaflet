const JAWG_ACCESS_TOKEN =
  "890xUFmEiNigo8eh1cbOpyQ7he6o2aq2kmrqIM0Vc9Knqm1wWgmACjHwmqwKE1VK";

let singaporeCor = [1.29, 103.85]; // Singapore latlng
let cckCor = [1.384, 103.747];
let singaporeMap = L.map("map").setView(singaporeCor, 13); // Set the center point

// Jawg.sunny tile
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
