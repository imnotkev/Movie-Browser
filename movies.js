const movieWrapper = document.querySelector(".movies");
const searchInput = document.getElementById("input");
const userSearch = document.getElementById("user__search");
const notFound = document.querySelector(".movies__not-found")
const filterSelect = document.getElementById("filter")

function clearSearch() {
    searchInput.value = "";
    userSearch.innerHTML = "";
    movieWrapper.replaceChildren();
    notFound.style.display = "none";
    filterSelect.style.display = "none";
}
    
function getSearchResult(){
    const title = searchInput.value;
    getResult(title);
    //  HTML CHANGES
    userSearch.innerHTML = `Search results: <span style="color:#ff1e4a;">${title}</span>`
    filterSelect.style.display = "block";
}

async function getResult(title) {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=bc1a9c54&s=${title}`);
    const moviesData = await movies.json();

    if (moviesData.Response === 'False') {
        notFound.style.display = "flex";
        movieWrapper.replaceChildren();
    }
    else {
        movieWrapper.innerHTML = moviesData.Search.slice(0,6).map((movie) => movieHTML(movie)).join("");
        notFound.style.display = "none";
    }

}

function movieHTML(movie) {
    return `<div class="movie">
                <figure class="movie__img--wrapper">
                  <img
                    class="movie__img"
                    src="${movie.Poster}"
                    alt=""
                  />
                </figure>
                <div class="movie__title">${movie.Title}</div>
                <div class="movie__year">${movie.Year}</div>
              </div>`

}












