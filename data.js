// MODEL: Fetch data from fouresquare api

// START Declaring constants =======================================================================
// Fouresquare API key
const foursquare_API_KEY = "fsq30T1qctTML0U/mp7xUSEXaPiu8weIdCCYY5J4SknVa6k=";
// jsonbin API key
const JSONBIN_BIN_ID = "6748790cad19ca34f8d20406";
const JSONBIN_ROOT_API_URL = "https://api.jsonbin.io/v3";

// END Declaring constants =======================================================================


// START READ bookmarks from jsonbin=======================================================================
// returns an array of all bookmarks, from database (jsonbin)
async function getBookmarksData() {
    let request = await axios.get(`${JSONBIN_ROOT_API_URL}/b/${JSONBIN_BIN_ID}/latest`);
    let bookmarkArray = request.data.record.places;
    return bookmarkArray;
}
// END READ bookmarks from jsonbin=======================================================================


// START CREATE a bookmark and push to jsonbin=======================================================================
// create a bookmark
//gptb4
// async function createBookmarkData(bookmarkArray, bookmarkName, bookmarkLat, bookmarkLng){
//     console.log(bookmarkArray);
//     bookmarkArray.push({name: bookmarkName, latlng:[parseFloat(bookmarkLat), parseFloat(bookmarkLng)]})
//     console.log("createBookmarkData() adter adding new bookmark: ", bookmarkArray)
//     let request = await axios.put(`${JSONBIN_ROOT_API_URL}/b/${JSONBIN_BIN_ID}`, bookmarkArray);
//     console.log(request);
// }
//gpt
async function createBookmarkData(bookmarkArray, bookmarkName, bookmarkLat, bookmarkLng) {
    bookmarkArray.push({ name: bookmarkName, latlng: [bookmarkLat, bookmarkLng] });

    let request = await axios.put(`${JSONBIN_ROOT_API_URL}/b/${JSONBIN_BIN_ID}`, { places: bookmarkArray });
    console.log("createBookmarkData(): Updated Bookmark Array:", request.data);
}
//gpt
// Trigger map layer refresh:
async function refreshMap() {
    let bookmarkArray = await getBookmarks();
    main(bookmarkArray); // Re-run the map initialization
}

// END CREATE a bookmark and push to jsonbin=======================================================================


// START UPDATE a bookmark and push to jsonbin=======================================================================
// create a bookmark
async function updateBookmarkData() {

}
// END UPDATE a bookmark and push to jsonbin=======================================================================