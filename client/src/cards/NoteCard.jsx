import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/notecard.css"

function NoteCard({note}) {
  return (
    <li key={note._id}>       
        <p> <Link to={`/single/${note._id}`} style={{color:"black"}}>{note.title}</Link> </p>
        <p>{note.lectureName}</p>
        <p>{note.instructorName}</p>
        <p>{new Date(note.createdAt).toLocaleDateString()}</p>
        <p>{note.username}</p>
        <p className='url'><a href={note.url} target="_blank"><i style={{color:"green",fontSize:"24px"}} className="fa-solid fa-share"></i></a></p>
    </li>
  )
}

export default NoteCard;