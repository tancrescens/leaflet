// MODEL: Fetch data from fouresquare api

// START Declaring constants =======================================================================
// Fouresquare API key
const foursquare_API_KEY = "fsq30T1qctTML0U/mp7xUSEXaPiu8weIdCCYY5J4SknVa6k=";
// jsonbin API key
const JSONBIN_BIN_ID = "67277fbee41b4d34e44d9a25";
const JSONBIN_ROOT_API_URL = "https://api.jsonbin.io/v3"
// END Declaring constants =======================================================================


// START READ bookmarks from jsonbin=======================================================================
// returns an array of all bookmarks, from database (jsonbin)
async function getBookmarksData(){
    let request = await axios.get(`${JSONBIN_ROOT_API_URL}/b/${JSONBIN_BIN_ID}/latest`);
    let bookmarksArray = request.data.record.places;
    console.log("fetching bookmark finished ", bookmarksArray);
    return bookmarksArray;
}
// END READ bookmarks from jsonbin=======================================================================


// START CREATE a bookmark and push to jsonbin=======================================================================
// create a bookmark
async function createBookmarkData(){
    let bookmarksArray = await getBookmarksData();
    let request = await axios.put(`${JSONBIN_ROOT_API_URL}/b/${JSONBIN_BIN_ID}`, data);
    console.log(request);
}
// END CREATE a bookmark and push to jsonbin=======================================================================


// START UPDATE a bookmark and push to jsonbin=======================================================================
// create a bookmark
async function updateBookmarkData(){
    
}
// END UPDATE a bookmark and push to jsonbin=======================================================================