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
async function getBookmarks(){
    let request = await axios.get(`${JSONBIN_ROOT_API_URL}/b/${JSONBIN_BIN_ID}/latest`);
    let bookmarksArray = request.data.record.places;
    console.log("fetching bookmark finished ",bookmarksArray);
    return bookmarksArray;
}
// END READ bookmarks from jsonbin=======================================================================


// START CREATE a bookmark and push to jsonbin=======================================================================
// create a bookmark
async function createBookmark(){
    let data = {
        "places": [
            {
                "name": "Brothers Ramen",
                "latlng": [
                    1.2761402436896734,
                    103.84621509560635
                ]
            },
            {
                "name": "Hokkaido Ramen Santouka",
                "latlng": [
                    1.2891689786154696,
                    103.8460687260308
                ]
            },
            {
                "name": "Bari Uma",
                "latlng": [
                    1.3338561994968565,
                    103.83936119617341
                ]
            }
        ]
    };
    await axios.put(`${JSONBIN_ROOT_API_URL}/b/${JSONBIN_BIN_ID}`, data);
    console.log("creating bookmark finished")
}
// END CREATE a bookmark and push to jsonbin=======================================================================


// START UPDATE a bookmark and push to jsonbin=======================================================================
// create a bookmark
async function updateBookmark(){
    let bookmarksArray = await getBookmarks();
    let toInsert = bookmarksArray.map((element) => {
        return `<li>${element.name}</li>`
    });
    let toDisplay = 
    `<ol>
        ${toInsert.join("")}
    </ol>`

    console.log("toInsert: ", toInsert);
    console.log("toDisplay: ", toDisplay);

    // Display all bookmarks
    let bookmarksDisplay = document.querySelector("#bookmarksDisplay");
    bookmarksDisplay.innerHTML = "";
    bookmarksDisplay.innerHTML = toDisplay;
    console.log("Successfully displayed all bookmarks")

    // // Updating bookmark
    // await axios.put(`${JSONBIN_ROOT_API_URL}/b/${JSONBIN_BIN_ID}`, data);
    // console.log("update of selected bookmark finished")
}
// END UPDATE a bookmark and push to jsonbin=======================================================================