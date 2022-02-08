require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dns = require("dns");
const validUrl = require("valid-url");

let originalUrl, shortUrl;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", (req, res) => {
  originalUrl = req.body.url;
  if (validUrl.isWebUri(originalUrl)) {
    shortUrl = Math.floor(Math.random() * 10000 + 1);
    res.json({
      original_url: originalUrl,
      short_url: shortUrl,
    });
  } else {
    res.json({ error: "invalid url" });
  }
});

app.get(`/api/shorturl/:${shortUrl}`, (req, res) => {
  res.redirect(`${originalUrl}`);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
