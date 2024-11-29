// CONTROLLER: Receive data from data.js and display it onto index.html
async function createBookmark(bookmarkArray, bookmarkName, bookmarkLat, bookmarkLng) {
    createBookmarkData(bookmarkArray, bookmarkName, bookmarkLat, bookmarkLng);
}

async function getBookmarks() {
    let bookmarkArray = await getBookmarksData();
    return bookmarkArray;
}

async function updateBookmark() {

}

async function deleteBookmark() {

}