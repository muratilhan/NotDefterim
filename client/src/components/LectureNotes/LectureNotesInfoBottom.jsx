import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import "../../styles/lecturenotes.css";
import { Context } from "../../App";

const LectureNotesInfoBottom = () => {
    const context = useContext(Context);


    const clearFilter = () => {
        context.setFilteredNotes(context.notes);
        context.setMessage(false);
      };
      const getMyNotes = () => {
        context.setFilteredNotes(
          context.notes.filter((note) => note.username === context.user.username)
        );
      };

  return (
    <div className="infos">
        <Button
          onClick={clearFilter}
          className="share-button"
          variant="outline-dark"
        >
          <b>
            <i className="fa-solid fa-broom clear"></i> Filtreyi Temizle
          </b>
        </Button>
        <Button
          onClick={getMyNotes}
          className="share-button"
          variant="outline-dark"
        >
          <b>Notlarım</b>
        </Button>
      </div>
  )
}

export default LectureNotesInfoBottom