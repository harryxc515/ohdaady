
const titleEl = document.querySelector(".track-title");
const artistEl = document.querySelector(".artist-name");
const albumArt = document.querySelector(".album-art");

async function loadSong() {
  const res = await fetch("/api/song");
  const data = await res.json();

  titleEl.textContent = data.title;
  artistEl.textContent = data.channel;

  albumArt.innerHTML = `
    <iframe width="300" height="200"
      src="https://www.youtube.com/embed/${data.videoId}?autoplay=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  `;
}

loadSong();
