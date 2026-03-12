let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppend(result) {

    let img = document.createElement("img");
    img.src = result.imageLink;
    img.classList.add("m-2");

    let author = document.createElement("p");
    author.textContent = result.author;

    let container = document.createElement("div");
    container.appendChild(img);
    container.appendChild(author);

    searchResultsEl.appendChild(container);
}

function displayResults(data){
    spinnerEl.classList.add("d-none");

    if(data.search_results.length === 0){
        searchResultsEl.textContent = "No results found";
    }
    else{
        for(let each of data.search_results){
            createAndAppend(each);
        }
    }
}

function searchInputElement(event){

    if(event.key === "Enter"){

        searchResultsEl.textContent = "";
        spinnerEl.classList.remove("d-none");

        let searchValue = searchInputEl.value;

        let url = "https://apis.ccbp.in/book-store?title=" + searchValue;

        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            displayResults(data);
        });
    }
}

searchInputEl.addEventListener("keydown", searchInputElement);