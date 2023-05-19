const express = require("express");
const fs = require("fs");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const { notes } = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Delete a note
function updateDb(id, notesArray) {
  const deletedNote = id;
  for (let i = 0; i < notesArray.length; i++) {
    if (deletedNote === notesArray[i].id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "/db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2),
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
    }
  }
}

// Create a note
function createNewNote(body, notesArray) {
  const newNote = body;
  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return newNote;
}

// Routes to view, create, and delete notes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

app.post("/api/notes", (req, res) => {
  req.body.id = uuidv4();
  const newNote = createNewNote(req.body, notes);
  res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  const params = req.params.id;
  updateDb(params, notes);
  res.redirect("");
});

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
