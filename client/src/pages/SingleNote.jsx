import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../App';
import "../styles/singlenote.css"
import NoteCard from '../cards/NoteCard';
import { Button, Form } from 'react-bootstrap';
import Select2 from 'react-select';
import datas from "../datas/Data";
function SingleNote() {


  const navigate = useNavigate()
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [note, setNote] = useState({});
  const context = useContext(Context)
  const [editMode, setEditMode] = useState(false);
  const [modifiable, setModifiable] = useState(false);

  const [form, setForm] = useState({
    title: "",
    lectureName: "",
    instructorName: "",
    username: "",
    description: "",
    url: ""
  })

  useEffect(() => {
    if (context.user) {
      const getNote = async () => {
        try {
          const res = await axios.get('https://notdefterim.onrender.com/note/' + path, {
            headers: {
              authorization: "Bearer " + context.accessToken
            }
          })
          if (res.data) {
            setNote(res.data)
          }
        } catch (err) {
          alert("Tekrardan Oturum Açın..")
        }}
      getNote();
    }
  }, [path, context])

  useEffect(() => {
    setForm({
      title: note.title,
      lectureName: note.lectureName,
      instructorName: note.instructorName,
      username: note.username,
      description: note.description,
      url: note.url,
    })
    setModifiable(context.user?.username === note.username ? true : false)
  }, [note, context])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const unableEditMode = () => {
    setEditMode(false)
    setForm({ ...note })
  }

  const handleSave = async () => {
    try{
      if(form.url.includes("https") && (form.url.includes("cloud") || form.url.includes("drive"))){
        const res = await axios.put(`https://notdefterim.onrender.com/note/${note._id}`, form, {
        headers: {
          authorization: "Bearer " + context.accessToken
        }
        })
      }else{
        alert("Hatalı Ders Notu Paylaşımı")
      }
    }catch(err){}
  }
  const handleDelete = async () => {
    const res = await axios.delete(`https://notdefterim.onrender.com/note/${note._id}`, {
      headers: {
        authorization: "Bearer " + context.accessToken
      },
      data: {
        username: context.user?.username
      }
    })
    localStorage.setItem("user", JSON.stringify(res.data));
    context.setUser(res.data)
    navigate("/home")
  }

  return (
    <div className='share-container'>
        <Form onSubmit={handleSave} className='share-form'>
          <div className='single-note-header'>
            <div className='single-note-title'><h3><i className="fa-brands fa-gripfire torch"></i> Ders Notu <i  className="fa-brands fa-gripfire torch"></i></h3></div>

            {!editMode ? <div className='single-note-update'>
              {modifiable ?
                <>
                  <Button onClick={() => setEditMode(true)} variant='dark'> <i className="fa-solid fa-pen-to-square single-note-update-icon"></i> </Button>
                  <Button onClick={handleDelete} variant='dark'> <i className="fa-solid fa-trash single-note-update-icon"></i> </Button>
                </> :
                <></>}
            </div> :
            <div className='single-note-update'>
              <Button style={{ padding: "0.5rem 2rem 0.5rem 1.5rem" }} onClick={() => unableEditMode()} variant='dark'> <i className="fa-solid fa-xmark single-note-update-icon"></i> </Button>
            </div>}
        </div>
          <Form.Group className="form-group-single">
            <Form.Label className="edit-title-label"><h5>Ders Notu Başlığı{editMode ? "*" : ":"} </h5></Form.Label>
            {editMode ?
              <Form.Control required minLength="3" className='single-note-form-label'  maxLength="15" name="title" value={form.title} onChange={((e) => handleChange(e))} type="text" placeholder="ör: Final Çıkmış Sorular." />
              : <Form.Label style={{margin:"0"}} className='single-note-form-label'> <h5>{note.title}</h5> </Form.Label>}
          </Form.Group>

          <Form.Group className="form-group-single">
            <Form.Label ><h5>Dersin Adı{editMode ? "*" : ":"} </h5> </Form.Label>
            {editMode ? 
              <Select2 className='select-component'
              options={datas.map(item =>({label:item.name, value: item.value}))}
              onChange={(e)=>setForm({...form,lectureName:e.value})}
              defaultValue={{label:form.lectureName,value:form.lectureName}}
              >
            </Select2>
              : <Form.Label className='single-note-form-label'> <h5>{note.lectureName}</h5> </Form.Label>}
          </Form.Group>

          <Form.Group className="form-group-single" >
            <Form.Label className="label"><h5>Dersin Hocası{editMode ? "*" : ":"} </h5></Form.Label>
            {editMode ?
              <Form.Control required minLength="3" maxLength="15" name="instructorName" value={form.instructorName} onChange={((e) => handleChange(e))} type="text" placeholder="ör: Final Çıkmış Sorular." />
              : <Form.Label style={{margin:"0"}} className='single-note-form-label'> <h5>{note.title}</h5> </Form.Label>}
          </Form.Group>
          { !editMode && 
          <Form.Group className="form-group-single">
            <Form.Label className='edit-mode-title'><h5>Yayım Tarihi</h5> </Form.Label>
            <Form.Label className='single-note-form-label'> <h5>{new Date(note.createdAt).toLocaleDateString()}</h5> </Form.Label>
          </Form.Group> }
          <Form.Group className="form-group-single" >
            <Form.Label><h5>Drive/Cloud Linki{editMode ? "*" : ":"} </h5> </Form.Label>
            {editMode ? <Form.Control required name="url" value={form.url} onChange={((e) => handleChange(e))} type="text" placeholder="Drive/Cloud linkini buraya yapıştırın" />
              : <Form.Label className='single-note-form-label'><h5><a href={note.url} target="_blank"><i style={{color:"green",fontSize:"24px"}} className="fa-solid fa-share"></i></a></h5> </Form.Label>}
          </Form.Group>
          <Form.Group className="form-group-single" >
            <Form.Label><h5>Ders Notu Açıklaması{editMode ? "*" : ":"}   </h5> </Form.Label>
            {editMode ? <Form.Control minLength="5" required name="description" value={form.description} onChange={((e) => handleChange(e))} type="text" placeholder="ör: hoca derste çözdüklerinden soruyor :p" />
              : <Form.Label className='single-note-form-label'> <h5>{note.description}</h5> </Form.Label>}
          </Form.Group>
          <Form.Group className="form-group-single">{editMode ?
              <Form.Label className="single-edit-button">
                <Button type='submit' variant='success'>Kaydet</Button>
              </Form.Label> : <></>}
          </Form.Group>
       </Form>
    </div>
  )
}

export default SingleNote

