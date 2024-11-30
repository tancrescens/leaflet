// CONTROLLER: Receive data from data.js and display it onto index.html
document.addEventListener("DOMContentLoaded", async function () {
  let bookmarkArray = await getBookmarks();

  // connect to json database
  main(bookmarkArray);
});

async function main(bookmarkArray) {
  // START Setting up essential variables =======================================================================
  let singaporeCor = [1.39, 103.80]; // Singapore latlng
  let singaporeMap = L.map("map").setView(singaporeCor, 13); // Set the center point


  const JAWG_ACCESS_TOKEN =
    "890xUFmEiNigo8eh1cbOpyQ7he6o2aq2kmrqIM0Vc9Knqm1wWgmACjHwmqwKE1VK";
  // Stadia Tile API
  const STADIA_API_Key = "c3d03e60-23f4-4387-b5a9-4016b692ad95";
  const STADIA_TILE = "osm_bright" //alidade_smooth, osm_bright
  // END Setting up essential variables =======================================================================

  // Displaying Jawg Sunny map tile
  // displayJawgSunnyTile(singaporeMap, JAWG_ACCESS_TOKEN);
  displayStadiaTile(singaporeMap, STADIA_TILE, STADIA_API_Key)

  // Group creation
  let cckGroup = displayCckCordinates();
  let randomMarkerClusterGroup = addRandomMarkerClusters(singaporeMap, 100);
  let polylineGroup = await createBookmarkPolylines(bookmarkArray);

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
}// END main() =======================================================================


// Map displays
function displayStadiaTile(map, STADIA_TILE, STADIA_API_Key) {
  var Stadia_AlidadeSmooth = L.tileLayer(
    `https://tiles.stadiamaps.com/tiles/${STADIA_TILE}/{z}/{x}/{y}{r}.png?api_key={accessToken}`,
    {
      attribution:
        '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 1,
      maxZoom: 20,
      accessToken: STADIA_API_Key,
    }
  );
  Stadia_AlidadeSmooth.addTo(map);
}
function displayJawgSunnyTile(map, JAWG_ACCESS_TOKEN) {
  var Jawg_Sunny = L.tileLayer(
    "https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}",
    {
      attribution:
        '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 1,
      maxZoom: 22,
      accessToken: JAWG_ACCESS_TOKEN,
    }
  );
  Jawg_Sunny.addTo(map);
}
// Map displays ends

function displayCckCordinates() {
  let cckCor = [1.384, 103.747];
  let cckGroup = L.layerGroup();

  // cck marker --> cckGroup
  cckMarker = L.marker(cckCor);
  cckMarker.bindPopup(`Choa Chu Kang`);
  cckMarker.addTo(cckGroup);

  // cck circle --> cckGroup
  let cckCircle = L.circle(cckCor, {
    color: "red",
    fillColor: `orange`,
    fillOpacity: 0.1,
    radius: 500,
  });
  cckCircle.addTo(cckGroup);

  return cckGroup
}

function getRandomLatLng(map) {
  // get the boundaries of the map
  let bounds = map.getBounds();
  let southWest = bounds.getSouthWest();
  let northEast = bounds.getNorthEast();
  let lngSpan = northEast.lng - southWest.lng;
  let latSpan = northEast.lat - southWest.lat;

  let randomLng = Math.random() * lngSpan + southWest.lng;
  let randomLat = Math.random() * latSpan + southWest.lat;

  return [randomLat, randomLng,];
}

function addRandomMarkerClusters(map, markerNumber) {
  // Create random marker cluster group
  let randomMarkerClusterGroup = L.layerGroup();
  // Create grandom marker cluster
  let randomMarkerClusterLayer = L.markerClusterGroup();
  for (let i = 0; i < markerNumber; i++) {
    let pos = getRandomLatLng(map);
    L.marker(pos).addTo(randomMarkerClusterLayer);
  }
  // add marker cluster to map
  randomMarkerClusterLayer.addTo(randomMarkerClusterGroup);

  return randomMarkerClusterGroup;
}
//gptb4
// async function createBookmarkPolylines(bookmarkArray) {
//   let polylineGroup = L.layerGroup();

//   // marker creation for compiled locations
//   bookmarkArray.forEach(bookmark => {
//     // create marker for each bookmark
//     marker = L.marker(bookmark.latlng);
//     marker.bindPopup(bookmark.name);
//     marker.addTo(polylineGroup);
//   });
//   // push each latlng into array
//   let latlngArray = bookmarkArray.map(bookmark => bookmark.latlng);
//   // polyline creation
//   let polyline = L.polyline(latlngArray, { color: 'red' })
//   polyline.addTo(polylineGroup);

//   return polylineGroup;
// }
//gpt
async function createBookmarkPolylines(bookmarkArray) {
  let polylineGroup = L.layerGroup();

  bookmarkArray.forEach(bookmark => {
    let marker = L.marker(bookmark.latlng);
    marker.bindPopup(`<b>${bookmark.name}</b>`);
    marker.addTo(polylineGroup);
  });

  let latlngArray = bookmarkArray.map(bookmark => bookmark.latlng);
  if (latlngArray.length > 1) {
    let polyline = L.polyline(latlngArray, { color: 'blue' });
    polyline.addTo(polylineGroup);
  }

  return polylineGroup;
}

// Bookmark functions =========================================================================
function clearBookmarkUI() {
  let bookmarkElement = document.querySelector('#bookmarks');
  bookmarkElement.innerHTML = '';
}

async function getBookmarksUI() {
  let bookmarkElement = document.querySelector("#bookmarks");
  let bookmarkArray = await getBookmarks();

  bookmarkElement.innerHTML = "";
  for (let bookmark of bookmarkArray) {
    let html = `<li>Name: ${bookmark.name} <br> Location: ${bookmark.latlng}<br></li>`;
    bookmarkElement.innerHTML += html;
  }
}

async function createBookmarkUI() {
  let bookmarkArray = await getBookmarks();
  let bookmarkName = document.querySelector("#bookmarkName").value;
  let bookmarkLat = parseFloat(document.querySelector("#bookmarkLat").value);
  let bookmarkLng = parseFloat(document.querySelector("#bookmarkLng").value);

  if (!bookmarkName || isNaN(bookmarkLat) || isNaN(bookmarkLng)) {
    alert("Please enter a valid name, latitude(-90 to 90), and longitude(-180 to 180).");
    return;
  }
  if (bookmarkLat < -90 || bookmarkLat > 90 || bookmarkLng < -180 || bookmarkLng > 180) {
    alert("latitude must within -90 to 90, and longitude must be within -180 to 180.");
    return;
  }

  //gptb4
  // createBookmark(bookmarkArray, bookmarkName, bookmarkLat, bookmarkLng);
  //gpt
  createBookmark(bookmarkArray, bookmarkName, bookmarkLat, bookmarkLng).then(refreshMap);
}
