// =====================================
// QYVERON MAIN SYSTEM
// =====================================


// =====================================
// QYVERON CONTENT API LAYER
// =====================================

const QYVERON_API = {

    sources: {

        anime: null,

        movies: null,

        tv: null,

        games: null,

        books: null,

        sports: null

    },


    async search(query, type = "all") {

        if (!query || !query.trim()) {

            return [];

        }


        const cleanQuery = query.trim();


        console.log(
            "QYVERON SEARCH:",
            cleanQuery,
            "TYPE:",
            type
        );


        switch (type) {

            case "anime":

                return this.searchAnime(cleanQuery);


            case "movie":

                return this.searchMovies(cleanQuery);


            case "tv":

                return this.searchTV(cleanQuery);


            case "game":

                return this.searchGames(cleanQuery);


            case "book":

                return this.searchBooks(cleanQuery);


            case "sports":

                return this.searchSports(cleanQuery);


            default:

                return this.searchAll(cleanQuery);

        }

    },


            async searchAnime(query) {

        // =====================================
        // TRY JIKAN FIRST
        // =====================================

        try {

            console.log(
                "QYVERON Anime Search: Trying Jikan..."
            );


            const response = await fetch(
                "https://api.jikan.moe/v4/anime?q=" +
                encodeURIComponent(query)
            );


            if (response.ok) {

                const result = await response.json();


                if (
                    result.data &&
                    Array.isArray(result.data)
                ) {

                    console.log(
                        "QYVERON Anime Search: Jikan succeeded."
                    );


                    return result.data.map(anime => ({

                        id: anime.mal_id,

                        title: anime.title,

                        type: "Anime",

                        rating: anime.score ?? 0,

                        image:
                            anime.images?.jpg?.large_image_url ||
                            anime.images?.jpg?.image_url ||
                            ""

                    }));

                }

            }


            console.warn(
                "QYVERON Anime Search: Jikan failed. Trying AniList..."
            );


        } catch (error) {

            console.warn(
                "QYVERON Anime Search: Jikan error.",
                error
            );

        }



        // =====================================
        // ANILIST FALLBACK
        // =====================================

        try {

            console.log(
                "QYVERON Anime Search: Trying AniList..."
            );


            const queryText = `
                query ($search: String) {

                    Page(
                        page: 1,
                        perPage: 20
                    ) {

                        media(
                            search: $search,
                            type: ANIME
                        ) {

                            id

                            title {
                                romaji
                                english
                                native
                            }

                            averageScore

                            coverImage {
                                large
                            }

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

                        query: queryText,

                        variables: {
                            search: query
                        }

                    })

                }
            );


            if (!response.ok) {

                throw new Error(
                    "AniList API request failed: " +
                    response.status
                );

            }


            const result = await response.json();


            if (
                !result.data ||
                !result.data.Page ||
                !Array.isArray(
                    result.data.Page.media
                )
            ) {

                return [];

            }


            console.log(
                "QYVERON Anime Search: AniList succeeded."
            );


            return result.data.Page.media.map(anime => ({

                id: anime.id,

                title:
                    anime.title.english ||
                    anime.title.romaji ||
                    anime.title.native ||
                    "Unknown",

                type: "Anime",

                rating:
                    anime.averageScore
                        ? anime.averageScore / 10
                        : 0,

                image:
                    anime.coverImage?.large ||
                    ""

            }));


        } catch (error) {

            console.error(
                "QYVERON Anime Search: AniList failed.",
                error
            );


            return [];

        }

    },

    async searchMovies(query) {

        console.log(
            "Searching Movies:",
            query
        );

        return [];

    },


    async searchTV(query) {

        console.log(
            "Searching TV:",
            query
        );

        return [];

    },


    async searchGames(query) {

        console.log(
            "Searching Games:",
            query
        );

        return [];

    },


    async searchBooks(query) {

        console.log(
            "Searching Books:",
            query
        );

        return [];

    },


    async searchSports(query) {

        console.log(
            "Searching Sports:",
            query
        );

        return [];

    },


    async searchAll(query) {

        console.log(
            "Searching All Content:",
            query
        );

        return [];

    }

};


// =====================================
// SAMPLE CONTENT STRUCTURE
// Will be connected to automatic data later
// =====================================

const qyveronContent = [

    {
        title: "Attack on Titan",
        type: "Anime",
        rating: 9.1,
        image: "images/episodes/aot-s1-e1.jpg"
    },

    {
        title: "Bleach",
        type: "Anime",
        rating: 8.2,
        image: "images/episodes/aot-s1-e2.jpg"
    }

];


// =====================================
// CREATE CARD
// =====================================

function createCard(item) {

    return `

    <div class="anime-card"
         onclick="openDetails('${item.title}', '${item.id}', '${item.type}')">

        <div class="card-image-wrapper">

            <img 
                class="anime-card-image"
                src="${item.image}"
                alt="${item.title}"
            >

            <span class="card-type">
                ${item.type}
            </span>

        </div>


        <div class="anime-card-content">

            <h3 class="anime-card-title">
                ${item.title}
            </h3>


            <div class="anime-card-rating">

                ⭐ ${item.rating}/10

            </div>


        </div>


    </div>

`;

}


// =====================================
// DISPLAY CONTENT
// =====================================

function displayContent(listId, data) {

    const container = document.getElementById(listId);

    if (!container) return;


    container.innerHTML = data
        .map(item => createCard(item))
        .join("");

}


// =====================================
// HOME SECTIONS
// =====================================

displayContent(
    "trendingList",
    qyveronContent
);


displayContent(
    "popularList",
    qyveronContent
);


displayContent(
    "topRatedList",
    qyveronContent
);


// =====================================
// OPEN DETAILS
// =====================================

function openDetails(title, id, type) {

    window.location.href =
        "details.html?id=" +
        encodeURIComponent(id) +
        "&title=" +
        encodeURIComponent(title) +
        "&type=" +
        encodeURIComponent(type || "Unknown");

}
// =====================================
// GLOBAL SEARCH
// =====================================

const globalSearch = document.getElementById("globalSearch");

const searchResultsSection =
    document.getElementById("searchResultsSection");

const searchResultsList =
    document.getElementById("searchResultsList");


if (globalSearch) {

    globalSearch.addEventListener("keydown", async function(event) {

        if (event.key !== "Enter") {
            return;
        }


        const query = this.value.trim();


        if (!query) {

            searchResultsList.innerHTML = "";

            searchResultsSection.style.display = "none";

            return;

        }


        searchResultsSection.style.display = "block";


        searchResultsList.innerHTML = `
            <p>Searching...</p>
        `;


        const results =
            await QYVERON_API.search(
                query,
                "anime"
            );


        if (!results.length) {

            searchResultsList.innerHTML = `
                <p>No results found.</p>
            `;

            return;

        }


        searchResultsList.innerHTML =
            results
                .slice(0, 20)
                .map(item => createCard(item))
                .join("");

    });

}