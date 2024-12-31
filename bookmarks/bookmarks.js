async function main() {
    displayBookmarks();
}

async function displayBookmarks() {
    let bookmarksArray = await getBookmarks();
    let htmlToAdd = "";

    for (let i = 0; i < bookmarksArray.length; i++) {

        htmlToAdd += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${bookmarksArray[i].name}</td>
                    <td><a href="https://www.google.com/maps/place/${bookmarksArray[i].latlng}">Google Maps</a></td>
                </tr>`
    }

    let bookmarksTableBody = document.querySelector("#bookmarksTableBody");
    bookmarksTableBody.innerHTML = htmlToAdd;
}

main();


