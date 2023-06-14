const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 4444;
const app = express();
const api = require("./db/db.json");
const fs = require("fs");
const { log } = require("console");


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
    let pastNotes = JSON.parse(fs.readFileSync("./db/db.json", (err, data) => {
        if (err) throw err;
        // console.log(data);
    }))
    console.log(pastNotes + "look at this");
    let { title, text } = req.body;
    // console.log(req.body)
    const updatedApi = {
        title: title,
        text: text
    }
    let testArray = [];
    testArray.push(updatedApi)
    console.log(testArray);
    fs.writeFile("./db/db.json", JSON.stringify(testArray), (err) =>
        err ? console.error(err) : console.log("Nice! note saved"));
    res.json(updatedApi);
});

app.listen(PORT, () =>
    console.log(`app listening at http://localhost:${PORT}`)
)