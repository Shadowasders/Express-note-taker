const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 4444;
const app = express();
const api = require("./db/db.json");
const fs = require("fs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"))
});

app.get('/api/notes', (req, res) => {
    res.json(api)
});

app.post('/api/notes', (req, res) => {
   let savedNotes = req.body;
   console.log(savedNotes);
   const updatedApi = [...api, savedNotes];
   fs.writeFile("./db/db.json", JSON.stringify(updatedApi), (err) =>
   err ? console.error(err) : res.json("nice! note is here maybe?"));
});

app.listen(PORT, () =>
    console.log(`app listening at http://localhost:${PORT}`)
)