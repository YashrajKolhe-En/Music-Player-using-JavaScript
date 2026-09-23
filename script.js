const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("song-title");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");
const autoplay = document.getElementById("autoplay");

const playlistElement = document.getElementById("playlist");


const songs = [
    {
        title: "Kal Ho Naa Ho",
        artist: "Sonu Nigam",
        src: "music/song1.mp3"
    },
    {
        title: "Kesariya",
        artist: "Arijit Singh",
        src: "music/song2.mp3"
    },
    {
        title: "Zindagi Kuch Toh Bata",
        artist: "Jubin Nautiyal",
        src: "music/song3.mp3"
    }
];

let songIndex = 0;


// Load song
function loadSong(index) {

    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.src;

    updatePlaylist();

    progress.value = 0;
}


// Play song
function playSong() {

    audio.play();

    playBtn.textContent = "⏸";
}


// Pause song
function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";
}


// Play / Pause
playBtn.addEventListener("click", () => {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});


// Previous
prevBtn.addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();

});


// Next
nextBtn.addEventListener("click", () => {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();

});


// Update progress bar
audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const progressPercent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressPercent;

        currentTime.textContent =
            formatTime(audio.currentTime);
    }

});


// Change song position
progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// Show duration
audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


// Volume control
volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// Autoplay
audio.addEventListener("ended", () => {

    if (autoplay.checked) {

        songIndex++;

        if (songIndex >= songs.length) {
            songIndex = 0;
        }

        loadSong(songIndex);
        playSong();

    } else {

        pauseSong();

    }

});


// Format time
function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
}


// Create playlist
function createPlaylist() {

    playlistElement.innerHTML = "";

    songs.forEach((song, index) => {

        const li = document.createElement("li");

        li.textContent =
            `${song.title} - ${song.artist}`;

        li.addEventListener("click", () => {

            songIndex = index;

            loadSong(songIndex);
            playSong();

        });

        playlistElement.appendChild(li);

    });

}


// Highlight active song
function updatePlaylist() {

    const items =
        playlistElement.querySelectorAll("li");

    items.forEach((item, index) => {

        item.classList.toggle(
            "active",
            index === songIndex
        );

    });

}


// Initialize
createPlaylist();
loadSong(songIndex);