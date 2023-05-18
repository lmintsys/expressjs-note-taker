const express = require("express");
const fs = require("fs");
const path = require("path");

const { notes } = require("./db/db.json");

const app = express();
const PORT = 3001;

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
