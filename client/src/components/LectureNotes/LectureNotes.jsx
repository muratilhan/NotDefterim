import React, { useContext, useEffect, useState } from "react";
import "../../styles/lecturenotes.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Context } from "../../App";
import Pagination from "./Pagination";
import LectureNotesInfoBottom from "./LectureNotesInfoBottom";
import MessageForMobile from "./MessageForMobile";
import LectureNotesMain from "./LectureNotesMain";
import LectureNotesInfoTop from "./LectureNotesInfoTop";
import LectureNotesTitle from "./LectureNotesTitle";

function LectureNotes() {
  
  const context = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (context.user) {
      const fetchNotes = async () => {
        try {
          const res = await axios.get(
            "https://notdefterim.onrender.com/note/",
            {
              headers: {
                authorization: "Bearer " + context.accessToken,
              },
            }
          );
          context.setNotes(res.data);
          context.setFilteredNotes(res.data);
        } catch (err) {
          alert("Tekrardan Oturum Açın..");
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          context.setUser(null);
          navigate("/login");
        }
      };
      fetchNotes();
    }
  }, [context.user]);

  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(10);
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = context.filteredNotes.slice(
    indexOfFirstNote,
    indexOfLastNote
  );

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="lecturenotes-container">
      <LectureNotesTitle></LectureNotesTitle>
      <LectureNotesInfoTop></LectureNotesInfoTop>
      <LectureNotesInfoBottom></LectureNotesInfoBottom>
      <MessageForMobile></MessageForMobile>
      <LectureNotesMain currentNotes={currentNotes}  ></LectureNotesMain>
      <Pagination
            notesPerPage={notesPerPage}
            totalNotes={context.filteredNotes.length}
            paginate={paginate}
      />
    </div>
  );
}
export default LectureNotes;
