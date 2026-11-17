const apikey = "f715950eb57b7e86c04614d57a0c6f79";

// Function to search for an artist and fetch their top tracks
function searchArtist() {

    let artist = document.getElementById('artist-search').value;

// Fetch top tracks for the artist
fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(artist)}&api_key=${apikey}&format=json`)
    .then(response => response.json())
    .then(data => {
        console.log("API response:", data);

        let songs = data.toptracks.track;

        let songList = document.getElementById("song-list");

        songList.innerHTML = "";

        for (let i = 0; i < 5 && i < songs.length; i++) {

            let li = document.createElement("li");

            li.textContent = songs[i].name;

            songList.appendChild(li);
    }
});
    //fetch artist info
    fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${apikey}&format=json`)
        .then(response => response.json())
        .then(data => {
            console.log(data.artist);

            let artistName = document.getElementById("artist-name");

            artistName.textContent = data.artist.name;
            
            // Display the number of listeners

            console.log(data.artist.stats.listeners);

            let artistListeners = document.getElementById("listeners");

            artistListeners.textContent = data.artist.stats.listeners;

            // Display similar artists

            console.log(data.artist.similar.artist);

            let similarArtists = document.getElementById("similar-artists");

            similarArtists.innerHTML = "";

            for (let i = 0; i < 5 && i < data.artist.similar.artist.length; i++) {

                let li = document.createElement("li");

                li.textContent = data.artist.similar.artist[i].name;

                similarArtists.appendChild(li);
            }
        });
} 
// Add event listener to trigger search on Enter key press
document.getElementById("artist-search").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchArtist();
    }
});