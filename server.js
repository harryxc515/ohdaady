
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.YOUTUBE_API_KEY;

app.get("/api/song", async (req, res) => {
  try {
    const query = "latest indian hindi song";

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoCategoryId=10&regionCode=IN&maxResults=1&key=${API_KEY}`
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: "No song found" });
    }

    const video = data.items[0];

    res.json({
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      videoId: video.id.videoId,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
