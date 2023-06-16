const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 4444;
const app = express();
const api = require("./db/db.json");
const fs = require("fs");
const { log } = require("console");
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();



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
    const notes = readNotes()
    res.json(notes)
});


function readNotes() {
    return JSON.parse(fs.readFileSync("./db/db.json"))
};  


app.post('/api/notes', (req, res) => {
    const oldNotes = readNotes()
    let { title, text } = req.body;
    const updatedApi = {
        title: title,
        text: text,
        id: uuid
    }
    oldNotes.push(updatedApi);
    fs.writeFile("./db/db.json", JSON.stringify(oldNotes), (err) =>
        err ? console.error(err) : console.log("Nice! note saved"));
    res.json(updatedApi);
});

app.listen(PORT, () =>
    console.log(`app listening at http://localhost:${PORT}`)
)