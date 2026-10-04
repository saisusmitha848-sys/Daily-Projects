const API_KEY = "YOUR_API_KEY";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movieContainer = document.getElementById("movieContainer");
const message = document.getElementById("message");

searchBtn.addEventListener("click", searchMovies);

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchMovies();
    }
});

async function searchMovies() {

    const movieName = searchInput.value.trim();

    if (movieName === "") {
        message.textContent = "Please enter a movie name.";
        movieContainer.innerHTML = "";
        return;
    }

    message.textContent = "Searching...";
    movieContainer.innerHTML = "";

    try {

        const url =
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`;

        const response = await fetch(url);

        const data = await response.json();

        if (data.Response === "False") {
            message.textContent = "Movie not found.";
            return;
        }

        message.textContent = "";

        displayMovies(data.Search);

    } catch (error) {

        console.error(error);

        message.textContent =
            "Something went wrong. Please try again.";
    }
}

function displayMovies(movies) {

    movieContainer.innerHTML = "";

    movies.forEach(function (movie) {

        const card = document.createElement("div");

        card.classList.add("movie-card");

        const poster =
            movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Poster";

        card.innerHTML = `
            <img src="${poster}" alt="${movie.Title}">

            <div class="movie-info">

                <h2>${movie.Title}</h2>

                <p>
                    <strong>Year:</strong>
                    ${movie.Year}
                </p>

                <p>
                    <strong>Type:</strong>
                    ${movie.Type}
                </p>

            </div>
        `;

        movieContainer.appendChild(card);
    });
}
