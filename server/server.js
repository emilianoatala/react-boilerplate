const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

app.get("*.js", (req, res, next) => {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  next();
});

app.use(express.static("public"));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
});

app.listen(port, () => console.log("Listen on port: " + port));
