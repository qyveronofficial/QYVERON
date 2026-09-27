const urlParams = new URLSearchParams(window.location.search);

const animeTitle =
    urlParams.get("title");

const animeId =
    urlParams.get("id");


const animeData = {

    "Bleach": {

    type: "Anime Series",
    episodes: 416,
    status: "Finished",
    cover: "https://m.media-amazon.com/images/I/71i1yiEB1iL._AC_SX679_.jpg",

    structure: [

        {
            title: "S01",
            episodes: "366 Episodes"
        },

        {
            title: "Thousand-Year Blood War",

            parts: [

                {
                    title: "Part 01",
                    episodes: "13 Episodes"
                },

                {
                    title: "Part 02",
                    episodes: "13 Episodes"
                },

                {
                    title: "Part 03",
                    episodes: "14 Episodes"
                },

                {
                    title: "Part 04",
                    episodes: "Coming Soon"
                }

            ]

        }

    ]

},

"Attack on Titan": {

    type: "Anime Series",
    episodes: 89,
    status: "Finished",
    cover: "https://www.yourdecoration.co.uk/cdn/shop/files/gbeye-fp3463-attack-on-titan-key-art-poster-61x91-5cm_729e0aad-0634-41a3-9b87-ac802f67e75d_500x.jpg?v=1767620867",

    structure: [

        {
            title: "Season 1",
            episodes: "25 Episodes"
        },

        {
            title: "Season 2",
            episodes: "12 Episodes"
        },

        {
            title: "Season 3",
            episodes: "22 Episodes"
        },

        {
            title: "Final Season",
            episodes: "30 Episodes"
        }

    ]

}
    
};

// =====================================
// QYVERON AUTOMATIC ANIME DETAILS
// =====================================

async function loadAutomaticAnimeDetails() {

    if (!animeId) {

        console.log(
            "No AniList anime ID found."
        );

        return;

    }


    try {

        console.log(
            "QYVERON DETAILS: Loading AniList ID:",
            animeId
        );


        const query = `
            query ($id: Int) {

                Media(id: $id, type: ANIME) {

                    id

                    title {
                        romaji
                        english
                        native
                    }

                    type

                    episodes

                    status

                    averageScore

                    coverImage {
                        large
                    }

                }

            }
        `;


        const response = await fetch(
            "https://graphql.anilist.co",
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    query: query,

                    variables: {
                        id: Number(animeId)
                    }

                })

            }
        );


        if (!response.ok) {

            throw new Error(
                "AniList details request failed: " +
                response.status
            );

        }


        const result =
            await response.json();


        const anime =
            result?.data?.Media;


        if (!anime) {

            throw new Error(
                "Anime details were not found."
            );

        }


        console.log(
            "QYVERON DETAILS: AniList data loaded:",
            anime
        );


        // =====================================
        // TITLE
        // =====================================

        const automaticTitle =
            anime.title?.english ||
            anime.title?.romaji ||
            anime.title?.native ||
            animeTitle;


        document.getElementById(
            "animeTitle"
        ).textContent = automaticTitle;


        // =====================================
        // TYPE
        // =====================================

        document.getElementById(
            "animeType"
        ).textContent =
            "Type: " +
            (anime.type || "Anime");


        // =====================================
        // EPISODES
        // =====================================

        document.getElementById(
            "animeEpisodes"
        ).textContent =
            "Episodes: " +
            (anime.episodes ?? "Unknown");


        // =====================================
        // STATUS
        // =====================================

        document.getElementById(
            "animeStatus"
        ).textContent =
            "Status: " +
            (anime.status || "Unknown");


        // =====================================
        // COVER
        // =====================================

        const animeCover =
            document.getElementById(
                "animeCover"
            );


        if (
            animeCover &&
            anime.coverImage?.large
        ) {

            animeCover.src =
                anime.coverImage.large;

        }


        // =====================================
        // PAGE TITLE
        // =====================================

        document.title =
            automaticTitle +
            " - QYVERON";


    } catch (error) {

        console.error(
            "QYVERON DETAILS ERROR:",
            error
        );

    }

}
const currentAnime = animeData[animeTitle];


if (currentAnime) {

    document.getElementById("animeTitle").textContent = animeTitle;


    document.getElementById("animeType").textContent =
    "Type: " + currentAnime.type;


    document.getElementById("animeEpisodes").textContent =
    "Episodes: " + currentAnime.episodes;


    document.getElementById("animeStatus").textContent =
    "Status: " + currentAnime.status;


    document.getElementById("animeCover").src =
    currentAnime.cover;

}
const ratingTabs = document.querySelectorAll(".rating-tab");

const ratingGraph = document.getElementById("ratingGraph");


const ratingData = {

    imdb: {

        title: "IMDb",

        points: [
            { season: "S01", rating: 9.0 },
            { season: "S02", rating: 9.5 },
            { season: "S03", rating: 10.0 }
        ]

    },


    tmdb: {

        title: "TMDB",

        points: [
            { season: "S01", rating: 9.0 },
            { season: "S02", rating: 9.5 },
            { season: "S03", rating: 10.0 }
        ]

    },


    qyveron: {

        title: "QYVERON",

        points: [
            { season: "S01", rating: 9.2 },
            { season: "S02", rating: 9.7 },
            { season: "S03", rating: 9.8 }
        ]

    },


    community: {

        title: "COMMUNITY",

        points: [
            { season: "S01", rating: 8.8 },
            { season: "S02", rating: 9.3 },
            { season: "S03", rating: 9.6 }
        ]

    },


    "your-rating": {

        title: "YOUR RATING",

        points: [
            { season: "S01", rating: 9.0 },
            { season: "S02", rating: 9.5 },
            { season: "S03", rating: 10.0 }
        ]

    }

};


function showRatingGraph(type, mode = "grid") {

    const data = ratingData[type];

    ratingGraph.innerHTML = `

        <h3>
            ${data.title}
        </h3>

        <div class="graph-container">

            <div class="${
    mode === "wrapped"
        ? "rating-wrapped"
        : mode === "timeline"
            ? "rating-timeline"
            : "rating-grid"
}">

    ${data.points.map(point => `

        <div class="${
            mode === "wrapped"
                ? "rating-wrapped-item"
                : mode === "timeline"
                    ? "rating-timeline-item"
                    : "rating-grid-item"
        }">

            ${
                mode === "timeline"
                    ? `<span class="rating-timeline-line"></span>`
                    : ""
            }

            <span class="rating-season">
                ${point.season}
            </span>

            <span class="rating-value">
                ${point.rating}/10
            </span>

        </div>

    `).join("")}

</div>

    `;

}


ratingTabs.forEach(tab => {

    tab.addEventListener("click", function () {

        ratingTabs.forEach(button => {
            button.classList.remove("active");
        });


        this.classList.add("active");


        const type = this.dataset.rating;

        showRatingGraph(type);

    });

});


showRatingGraph("imdb");
const viewModeButton = document.getElementById("viewModeButton");
const viewModeMenu = document.getElementById("viewModeMenu");

viewModeButton.addEventListener("click", function () {

    if (viewModeMenu.style.display === "block") {
        viewModeMenu.style.display = "none";
    } else {
        viewModeMenu.style.display = "block";
    }

});


const viewModeOptions = document.querySelectorAll(".view-mode-option");

viewModeOptions.forEach(option => {

    option.addEventListener("click", function () {

        const selectedMode = this.dataset.view;

        viewModeButton.textContent = selectedMode.toUpperCase();

        viewModeMenu.style.display = "none";

        showRatingGraph(
            document.querySelector(".rating-tab.active").dataset.rating,
            selectedMode
        );

    });

});
const episodeViewModeButton = document.getElementById("episodeViewModeButton");
const episodeViewModeMenu = document.getElementById("episodeViewModeMenu");


const episodeData = [

    {
        season: "S01",
        episode: 1,
        rating: 9.5,
        category: "absolute"
    },

    {
        season: "S01",
        episode: 2,
        rating: 8.8,
        category: "awesome"
    },

    {
        season: "S01",
        episode: 3,
        rating: 7.5,
        category: "great"
    },

    {
        season: "S01",
        episode: 4,
        rating: 6.5,
        category: "good"
    },

    {
        season: "S01",
        episode: 5,
        rating: 5.5,
        category: "average"
    },

    {
        season: "S01",
        episode: 6,
        rating: 3.5,
        category: "bad"
    },

    {
        season: "S01",
        episode: 7,
        rating: 1.5,
        category: "garbage"
    }

];


function showEpisodes(mode = "grid") {

    const episodeList = document.getElementById("episodeList");

    episodeList.className = "";

    if (mode === "wrapped") {

        episodeList.classList.add("episode-wrapped");

    } 
    else if (mode === "timeline") {

        episodeList.classList.add("episode-timeline");

    } 
    else {

        episodeList.classList.add("episode-grid");

    }


    episodeList.innerHTML = episodeData.map(ep => `

        <div class="rating-card ${ep.category}">

            <span class="rating-label">
                E${ep.episode}
            </span>

            <span class="rating-score">
                ${ep.rating}
            </span>

        </div>

    `).join("");

}



episodeViewModeButton.addEventListener("click", function () {

    if (episodeViewModeMenu.style.display === "block") {

        episodeViewModeMenu.style.display = "none";

    } else {

        episodeViewModeMenu.style.display = "block";

    }

});



const episodeViewModeOptions = document.querySelectorAll(".episode-view-mode-option");


episodeViewModeOptions.forEach(option => {

    option.addEventListener("click", function () {

        const selectedMode = this.dataset.view;

        episodeViewModeButton.textContent = selectedMode.toUpperCase();

        episodeViewModeMenu.style.display = "none";

        showEpisodes(selectedMode);

    });

});


showEpisodes("grid");

// =====================================
// CONTENT STRUCTURE
// =====================================

const contentStructure = document.getElementById("contentStructure");



function showContentStructure(title) {


    if (!contentStructure) return;


    const data = animeData[title]?.structure;


    if (!data) {

        contentStructure.innerHTML =
        "Structure unavailable";

        return;

    }


    contentStructure.innerHTML = data.map(item => {


        if (item.parts) {


            return `

            <div class="content-structure-item">

                <span class="content-structure-title">
                    ${item.title}
                </span>

            </div>


            ${
                item.parts.map(part => `

                <div class="content-structure-item">

                    <span class="content-structure-title">
                        ${part.title}
                    </span>

                    <span class="content-structure-info">
                        ${part.episodes}
                    </span>

                </div>

                `).join("")
            }

            `;

        }


        return `

        <div class="content-structure-item">

            <span class="content-structure-title">
                ${item.title}
            </span>

            <span class="content-structure-info">
                ${item.episodes}
            </span>

        </div>

        `;


    }).join("");

}



showContentStructure(animeTitle);
loadAutomaticAnimeDetails();