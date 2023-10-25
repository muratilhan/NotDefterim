import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/lecturenotes.css"
import Spinner from '../Spinner'

function Notes({currentNotes,activeSpinner}) {

  if(activeSpinner) return <tbody><Spinner/></tbody>   
  return (
    <tbody>{ currentNotes && currentNotes.map((note) => (
        <tr key={note._id}>
            <td data-label="Başlık:"> <Link style={{color:"black"}}  to={`/single/${note._id}`}>{note.title}</Link> </td>
            <td data-label="Dersin Adı:">{note.lectureName}</td>
            <td data-label="Dersin Hocası:"> {note.instructorName} </td>
            <td data-label="Tarih:"> {new Date(note.createdAt).toLocaleDateString()} </td>
            <td data-label="Paylaşan:">{note.username}</td>
            <td data-label="URL:"><a href={note.url} target="_blank"><i style={{color:"green",fontSize:"24px"}} className="fa-solid fa-share"></i></a></td>
        </tr>
        ))}
        </tbody>
  )
}

export default Notes