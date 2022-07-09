const movieWrapper = document.querySelector(".movies");
const searchInput = document.getElementById("input");
const userSearch = document.getElementById("user__search");
const notFound = document.querySelector(".movies__not-found");
const welcomeScreen = document.querySelector(".welcome__screen");
const mainContent = document.querySelector(".container");
const filterSelect = document.getElementById("filter");
const moviesLoading = document.getElementById("movies-loading");

let results = null

searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getSearchResult()
  }
});

function openSearch() {
  window.scrollTo({top: 0, behavior: 'smooth'});
  searchInput.focus();
}

/* Used to clear after faulty search/page refresh */
function clearSearch() {
  searchInput.value = "";
  userSearch.innerHTML = "";
  movieWrapper.replaceChildren();
  notFound.style.display = "none";
  filterSelect.style.display = "none";
  mainContent.style.display = "none";
  welcomeScreen.style.display = "flex";
  moviesLoading.classList.remove("building-blocks");
}

/* Getting value from user input and posting it to getResult function */
function getSearchResult() {
  mainContent.style.display = "block"
  moviesLoading.classList.add("building-blocks");
  welcomeScreen.style.display = "none";
  filterSelect.style.display = "none";
  const title = searchInput.value;
  movieWrapper.replaceChildren();
  getResult(title)
  //  HTML CHANGES
  userSearch.innerHTML = `Search results: ${title}`;
  filterSelect.value = "";
  notFound.style.display = "none";
}

async function getResult(title) {
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=bc1a9c54&s=${title}`
  );
  const moviesData = await movies.json();

  if (moviesData.Response === "False") {
    setTimeout(noResults, 2600)
  } else {
    results = moviesData.Search.slice(0,8);
    setTimeout(renderMovies, 2600)
  }
}

function noResults(){
  notFound.style.display = "flex";
  filterSelect.style.display = "none";
  movieWrapper.replaceChildren();
  moviesLoading.classList.remove("building-blocks");
}

function filterMovies(event) {
  renderMovies(event.target.value);
}

function renderMovies(filter) {
  moviesLoading.classList.remove("building-blocks");
  filterSelect.style.display = "block";
  if (filter === "OLD_TO_NEW") {
    results.sort((a, b) => a.Year - b.Year);
  } else if (filter === "NEW_TO_OLD") {
    results.sort((a, b) => b.Year - a.Year);
  }
  movieWrapper.innerHTML = results
    .map((movie) => {
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
            </div>`;
    })
    .join("")
}


/* MOBILE MENU */
function openMenu() {
  document.body.classList += " menu--open"
}

function closeMenu() {
  document.body.classList.remove('menu--open')
}

/* WELCOME SCREEN - SLIDESHOW */

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "flex";  
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}