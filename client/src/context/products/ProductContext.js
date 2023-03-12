import NoteContext from "./NoteContext";
import { useState } from 'react';


const NotesState = (props) => {

  const NotesInitial = []
  const host = "http://localhost:5000";


  const [notes, setNotes] = useState(NotesInitial);

  //  Add Notes
  const addNote = async (title, description, tag) => {
    console.log("Adding a new note")
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }


  // Fetch Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json)
  }

  // Delete a Note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const newNotes = notes.filter((note) => { return note._id !== id })
    const json = await response.json();
    // console.log(json)
    setNotes(newNotes)
  }


  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    console.log({title,description,tag},'1')
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
          break;
        }
    }
    setNotes(newNotes)
    console.log(newNotes)

  }

  return (
    <NoteContext.Provider value={{ notes, getNotes, deleteNote, editNote, addNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NotesState;