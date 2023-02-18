import React from 'react'
import "../styles/lecturenotes.css"


function Pagination({ notesPerPage, totalNotes, paginate }) {

let pageNumbers = [];

for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
    pageNumbers.push(i);
}
      
  return (
    <div className='pagination-container'>
        <ul className='pagination'>
        {pageNumbers.map((number) => (
            <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-link'>
                <span> {number} </span>
            </button>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Pagination