const episodes = {

    "aot-s1-e1": {

        title: "Attack on Titan - Episode 1: To You, in 2000 Years: The Fall of Shiganshina (1)",

        episodeImage: "images/episodes/aot-s1-e1.jpg",

        season: "1",

        episode: "1",

        airDate: "April 7, 2013",

        duration: "24 Minutes",

        rating: "9.2",

        overview: "Humanity lives behind walls protecting itself from Titans."

    },


    "aot-s1-e2": {

        title: "Attack on Titan - Episode 2: That Day: The Fall of Shiganshina (2)",

        episodeImage: "images/episodes/aot-s1-e2.jpg",

        season: "1",

        episode: "2",

        airDate: "April 14, 2013",

        duration: "24 Minutes",

        rating: "8.5",

        overview: "The survivors face the terrifying reality of the Titans."

    }

};



const urlParams = new URLSearchParams(window.location.search);

const episodeID = urlParams.get("id");


const currentEpisode = episodes[episodeID];


if (currentEpisode) {


    document.querySelector(".episode-info h1").textContent =
    currentEpisode.title;

document.querySelector(".episode-cover").src =
currentEpisode.episodeImage;

    const details =
    document.querySelectorAll(".episode-info p");


    details[0].textContent =
    "Season: " + currentEpisode.season;


    details[1].textContent =
    "Episode: " + currentEpisode.episode;


    details[2].textContent =
    "Air Date: " + currentEpisode.airDate;


    details[3].textContent =
    "Duration: " + currentEpisode.duration;


    document.querySelector(".episode-rating").textContent =
    "⭐ Rating: " + currentEpisode.rating + "/10";


    document.querySelector(".episode-overview p").textContent =
    currentEpisode.overview;

}
const previousButton = document.getElementById("previousEpisode");
const nextButton = document.getElementById("nextEpisode");

const episodeIDs = Object.keys(episodes);

const currentIndex = episodeIDs.indexOf(episodeID);

if (currentIndex > 0) {
    previousButton.onclick = function () {
        window.location.href = "episode.html?id=" + episodeIDs[currentIndex - 1];
    };
} else {
    previousButton.disabled = true;
}

if (currentIndex < episodeIDs.length - 1) {
    nextButton.onclick = function () {
        window.location.href = "episode.html?id=" + episodeIDs[currentIndex + 1];
    };
} else {
    nextButton.disabled = true;
}

