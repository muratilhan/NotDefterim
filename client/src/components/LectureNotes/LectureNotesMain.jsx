import React from 'react'
import Notes from './Notes';

const LectureNotesMain = ({currentNotes}) => {
    const titles = [
        "Başlık",
        "Dersin Adı",
        "Ders Hocası",
        "Tarih",
        "Paylaşan",
        "URL",
      ];
  return (
    <div className="lecturesnotes-main">
        <table className="table">
        <thead>
            <tr>
            {titles.map((item) => (
                <th key={item}> {item === "Açıklama" ? "" : item} </th>
            ))}
            </tr>
        </thead>
        <Notes currentNotes={currentNotes}></Notes>
        </table>
    </div>
  )
}

export default LectureNotesMain