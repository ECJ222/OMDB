const baseUrl = "https://www.omdbapi.com/?apikey=22517f08"
const form = document.getElementById("submit")
const searchText = document.getElementById("searchInput")
const movieContainer = document.getElementById("movieContainer")

form.addEventListener("submit", onSubmit)

function onSubmit(event) {
  event.preventDefault()

  fetch(`${baseUrl}&type=movie&s=${searchText.value}`)
    .then((data) => {
      return data.json()
    })
    .then((res) => {
      console.log(res)
      movieContainer.innerHTML = ""

      if (Array.isArray(res.Search)) {
        res.Search.forEach((movie, index) => {
          addMovieToGrid(movie, index)
        })
      } else {
        toast(res.Error, duration = 3000)
      }
    })
}

function addMovieToGrid(movie, index) {
  movieContainer.innerHTML += `
    <div class="movie-poster fade-in" id="movie-${index}">
      <img src="${movie.Poster}" alt="${movie.Title}"/>
      <div class="details collapsed">
        <span class="title">
          ${movie.Title.length > 15 ? movie.Title.substring(0, 15) + ".." : movie.Title}
        </span>
        <a role="button" onclick="showMovieDetails(this, 'movie-${index}')" data-movie-id="${movie.imdbID}" class="primary-btn">
          Show Details
        </a>
      </div>
   </div>
    `
}

function showMovieDetails(element, movieId) {
  const imdbId = element.getAttribute("data-movie-id")
  const movieElement = document.getElementById(movieId)

  fetch(`${baseUrl}&type=movie&i=${imdbId}`)
    .then((data) => {
      return data.json()
    })
    .then((movie) => {
      movieElement.innerHTML = `
      <div class="movie-poster fade-in" id="${movieId}">
       <img src="${movie.Poster}" alt="${movie.Title}"/>
       <div class="details expanded">
          <div class="md-info">
            <span>
             Title:
            </span>
            <span>
             ${movie.Title}
            </span>
          </div>
          <div class="md-info">
            <span>
             Genre:
            </span>
            <span>
             ${movie.Genre}
            </span>
          </div>
          <div class="md-info">
            <span>
             Director:
            </span>
            <span>
             ${movie.Director}
            </span>
          </div>
          <div class="md-info">
            <span>
             Actors:
            </span>
            <span>
             ${movie.Actors}
            </span>
          </div>
          <div class="md-info">
            <span>
             Country:
            </span>
            <span>
             ${movie.Country}
            </span>
          </div>
          <div class="md-info">
            <span>
             DVD:
            </span>
            <span>
             ${movie.DVD}
            </span>
          </div>
          <div class="md-info">
            <span>
             Language:
            </span>
            <span>
             ${movie.Language}
            </span>
          </div>
          <div class="md-info">
            <span>
             Production:
            </span>
            <span>
             ${movie.Production}
            </span>
          </div>
          <div class="md-info">
            <span>
             Rated:
            </span>
            <span>
             ${movie.Rated}
            </span>
          </div>
          <div class="md-info">
            <span>
             Year:
            </span>
            <span>
             ${movie.Year}
            </span>
          </div>
          <div class="md-info">
            <span>
             Imdb Rating:
            </span>
            <span>
             ${movie.imdbRating}
            </span>
          </div>
          <div class="md-info">
            <span>
             Imdb Votes:
            </span>
            <span>
             ${movie.imdbVotes}
            </span>
          </div>
          <a role="button" onclick="closeMovieDetails(this, '${movieId}')" data-movie-id="${movie.imdbID}" class="primary-btn">
        Close Details
      </a>
      </div>
    </div>
  `
    })
}

function closeMovieDetails(element, movieId) {
  console.log("here")
  const imdbId = element.getAttribute("data-movie-id")
  const movieElement = document.getElementById(movieId)

  fetch(`${baseUrl}&type=movie&i=${imdbId}`)
    .then((data) => {
      return data.json()
    })
    .then((movie) => {
      movieElement.innerHTML = `
        <div class="movie-poster fade-in" id="${movieId}">
          <img src="${movie.Poster}" alt="${movie.Title}"/>
          <div class="details collapsed">
            <span class="title">
              ${movie.Title.length > 15 ? movie.Title.substring(0, 15) + ".." : movie.Title}
            </span>
            <a role="button" onclick="showMovieDetails(this, '${movieId}')" data-movie-id="${movie.imdbID}" class="primary-btn">
              Show Details
            </a>
          </div>
        </div>
      `
    })
}

function toast(msg, duration = 2000) {
  const toastContainer = document.createElement("div")
  const toastMsg = document.createTextNode(msg)

  toastContainer.id = "toastContainer"
  toastContainer.classList.add("slide-in")

  toastContainer.appendChild(toastMsg)
  document.body.appendChild(toastContainer)

  setTimeout(() => {
    toastContainer.classList.add("fade-out")
  }, duration)
  setTimeout(() => {
    document.body.removeChild(toastContainer)
  }, duration + 100)
}
