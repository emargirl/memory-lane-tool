async function findSongs() {
    let year = document.getElementById("year").value;
    let genre = document.getElementById("genre").value;
    let resultsDiv = document.getElementById("results");

    if (!year) {
        resultsDiv.innerHTML = "<p>Please enter a year between 1950 and 1990.</p>";
        return;
    }

    try {
        let response = await fetch("songs.json");
        let data = await response.json();

        if (data[year]) {
            let songs = data[year];

            // Filter by genre if selected
            if (genre !== "all") {
                songs = songs.filter(song => song.genre === genre);
            }

            // Display results
            if (songs.length > 0) {
                resultsDiv.innerHTML = `<h2>Top Songs from ${year}:</h2>`;
                songs.forEach(song => {
                    resultsDiv.innerHTML += `<div class="song-item">
                        <strong>${song.title}</strong> - ${song.artist} 
                        <a href="${song.youtube}" target="_blank">▶ Play</a>
                    </div>`;
                });
            } else {
                resultsDiv.innerHTML = `<p>No songs found for ${year} in ${genre} genre.</p>`;
            }
        } else {
            resultsDiv.innerHTML = `<p>Sorry, we don't have data for ${year} yet.</p>`;
        }
    } catch (error) {
        console.error("Error fetching songs:", error);
        resultsDiv.innerHTML = "<p>Error loading songs. Try again later.</p>";
    }
}

async function randomSong() {
    let response = await fetch("songs.json");
    let data = await response.json();
    let years = Object.keys(data);
    let randomYear = years[Math.floor(Math.random() * years.length)];
    let randomSongs = data[randomYear];
    let randomSong = randomSongs[Math.floor(Math.random() * randomSongs.length)];

    document.getElementById("results").innerHTML = `<h2>🎲 Random Pick: ${randomYear}</h2>
        <div class="song-item">
            <strong>${randomSong.title}</strong> - ${randomSong.artist} 
            <a href="${randomSong.youtube}" target="_blank">▶ Play</a>
        </div>`;
}
