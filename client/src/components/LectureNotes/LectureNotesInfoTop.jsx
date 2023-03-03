import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context } from '../../App';

const LectureNotesInfoTop = () => {
    const context = useContext(Context);

    const handleChange = (string) => {
        if (string === "1") {
          const array = context.filteredNotes.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : -1
          );
          context.setFilteredNotes([...array]);
        } else {
          const array = context.filteredNotes.sort((a, b) =>
            b.createdAt > a.createdAt ? 1 : -1
          );
          context.setFilteredNotes([...array]);
        }
      };
    

  return (
    <div className="lecturenotes-share">
        <Link to="/share" className="share-link">
          {" "}
          <Button className="share-button" variant="success">
            <b> Ders Notu Paylaş</b>
          </Button>
        </Link>
        <div className="lecturenotes-sort">
          <h3>SORT:</h3>
          <select onChange={(e) => handleChange(e.target.value)} name="" id="">
            <option value="2">En Yeni</option>
            <option value="1">En Eski</option>
          </select>
        </div>
      </div>
  )
}

export default LectureNotesInfoTop