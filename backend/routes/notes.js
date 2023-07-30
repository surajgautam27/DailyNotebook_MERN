const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1: Get all The notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// Route 2 : Add a new Note Using Post "api/notes/addnote login required"

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid Description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//Route 3: Update an existing Note Using : POST /updatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
   
 
  const newNote = {};
//creating note
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
// find the note to be update
let note = await Note.findById(req.params.id)
if(!note)
{
   return res.status(404).send("Not Found")
}
if(note.user.toString() !== req.user.id)
{
   return res.status(401).send("Not allowed")
}

note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},
{new:true})
res.json({note})
} catch (error) {
   console.error(error.message);
   res.status(500).send("Internal Server Error");
}
});

//Route 4 : detete note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
   
   try {
 
 let note = await Note.findById(req.params.id)
 if(!note)
 {
    return res.status(404).send("Not Found")
 }
 if(note.user.toString() !== req.user.id)
 {
    return res.status(401).send("Not allowed")
 }
 
 note = await Note.findByIdAndDelete(req.params.id)
 res.json({"success":"Note Has been Deleted ",note :note})
 } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
 }
 });
module.exports = router;
