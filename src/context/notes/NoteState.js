import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
  const host="http://localhost:5000"
const noteInitial =[]
const [notes , setNotes] = useState(noteInitial)
//Get Notes
const getNote = async (title, description, tag)=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`,{
    method:'GET',
    headers:{
      'content-type':'application/json',
      'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMzJiMzRhMzNlMWRiYTMzZmUwODAwIn0sImlhdCI6MTY5MDUzMDcyNH0.NEc6bFI7rpefADtU6otgVON4mSqnDRcawGT5oP4vq0A'

    },

  })
  const json = await response.json()
  console.log(json)
  setNotes(json)


}
//Add a note
const addNote = async (title, description, tag)=>{
  const response = await fetch(`${host}/api/notes/addnote`,{
    method:'POST',
    headers:{
      'content-type':'application/json',
      'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMzJiMzRhMzNlMWRiYTMzZmUwODAwIn0sImlhdCI6MTY5MDUzMDcyNH0.NEc6bFI7rpefADtU6otgVON4mSqnDRcawGT5oP4vq0A'

    },
    body: JSON.stringify({title,description,tag})
  })
  //const json= response.json()
  const note = await response.json()
  setNotes(notes.concat(note)) 

}
//Delete note 
const deleteNote = async (id)=>{
  
  const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
    method:'DELETE',
    headers:{
      'content-type':'application/json',
      'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMzJiMzRhMzNlMWRiYTMzZmUwODAwIn0sImlhdCI6MTY5MDUzMDcyNH0.NEc6bFI7rpefADtU6otgVON4mSqnDRcawGT5oP4vq0A'
    },

  })
  const json = await response.json()
  console.log(json)
  console.log("Deleting the note with id" + id);
  const newNotes = notes.filter((note)=>{ return note._id!==id})
  setNotes(newNotes)
}

// Edit Note
const editNote =async (id,title,description,tag)=>{

  const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
    method:'PUT',
    headers:{
      'content-type':'application/json',
      'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMzJiMzRhMzNlMWRiYTMzZmUwODAwIn0sImlhdCI6MTY5MDUzMDcyNH0.NEc6bFI7rpefADtU6otgVON4mSqnDRcawGT5oP4vq0A'

    },
    body: JSON.stringify({title,description,tag})
  })
 //const json = response.json()
 
 let newNotes = JSON.parse(JSON.stringify(notes))
  for(let index=0; index<newNotes.length;index++)
  {
    const element = newNotes[index]
    if(element._id===id)
    {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag; 
      break;
    }
  }
  setNotes(newNotes);
}
  return(
<noteContext.Provider value={{notes,addNote , deleteNote, editNote,getNote}}>
    {props.children}
    </noteContext.Provider>
)
}
export default NoteState;