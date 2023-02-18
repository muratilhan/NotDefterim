import React,{useContext, useEffect, useState} from 'react'
import "../styles/lecturenotes.css"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NoteCard from '../cards/NoteCard';
import { Context } from '../App';
import Notes from './Notes';
import Pagination from './Pagination';

function LectureNotes() {

    const titles = ["Başlık","Dersin Adı","Ders Hocası","Tarih","Paylaşan","URL"]
    const context = useContext(Context)
    const navigate = useNavigate();

    useEffect(()=>{
        if(context.user){
            const fetchNotes = async() => {
            try{
                const res = await axios.get("http://localhost:8888/note/",{
                headers: {
                    authorization:"Bearer " + context.accessToken
                }});
            context.setNotes(res.data)
            context.setFilteredNotes(res.data)
            }catch(err){
                alert("Tekrardan Oturum Açın..")
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                context.setUser(null)
                navigate('/login')
                
            }
        }
        fetchNotes();
        }
    },[context.user])
    
    const handleChange = (string) => {
        if(string === "1"){
             const array = context.filteredNotes.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
             context.setFilteredNotes([...array]);
        }else{
             const array = context.filteredNotes.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)
             context.setFilteredNotes([...array]);
        }
    }
    const clearFilter = () => {
        context.setFilteredNotes(context.notes)
        context.setMessage(false)
    }

  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(10);
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = context.filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  // Change page
  const paginate = (pageNumber) => {setCurrentPage(pageNumber)};
  

  return (
    <div className='lecturenotes-container'>
        <div className='lecturenotes-header'>
            <h3>En Son Eklenen Ders Notları</h3>
        </div>
        <div className='lecturenotes-share'>
        <Link to="/share" className='share-link'> <Button className='share-button' variant="success"><b> Ders Notu Paylaş</b></Button></Link>
            <div className='lecturenotes-sort'>
                <h3>SORT:</h3>
                <select onChange={(e)=>handleChange(e.target.value)} name="" id="">
                    <option value="1">A-Z</option>
                    <option value="2">Z-A</option>
                </select>
            </div>
        </div>
        <div className='infos'> 
            <Button onClick={clearFilter} className='share-button' variant="outline-dark"><b><i className="fa-solid fa-broom clear"></i> Filtreyi Temizle</b></Button>
            <span> <b>NOT:</b> Sıralamada tarih esas alınır</span> 
        </div>
        <div className='message-for-mobile'>
            <h5> İyi Çalışmalar Dileriz  </h5><i style={{color:"pink"}} className="fa-regular fa-face-smile-beam"></i>
        </div>
        <div className='lecturesnotes-main'>
        <table className="table">
            <thead>
                <tr>
                    {titles.map(item=>(
                        <th key={item}> {item === "Açıklama" ? "" : item} </th>
                    ))}
                </tr>
            </thead>    
            
                <Notes notes={currentNotes}></Notes>         
        </table>
        <Pagination  
            notesPerPage={notesPerPage}
            totalNotes={context.filteredNotes.length}
            paginate={paginate}
        />
        </div>
    </div>
  )
}

export default LectureNotes