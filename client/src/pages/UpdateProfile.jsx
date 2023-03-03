import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Context } from '../App';
import "../styles/updateprofile.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const [editMode, setEditMode] = useState(false);
  const [modifiable, setModifiable] = useState(false);
  const context = useContext(Context)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nameLastname:context.user?.nameLastname,
    username:context.user?.username,
    password:"",
  })
  console.log(context.user)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(()=>{
console.log(form)
  },[form])
  const handleSave = async (e) => {
    e.preventDefault();
    try{
        console.log(form)
        const res = await axios.put(`https://notdefterim.onrender.com/user/${context.user._id}`, form, {
        headers: {
          authorization: "Bearer " + context.accessToken
        }
        })
        console.log(res)
        localStorage.setItem("user", JSON.stringify(res.data));
        context.setUser(res.data);
        toast.success("Kaydetme Başarılı..",{theme:"dark"});
        setEditMode(false)
    }catch(err){}
  }
  useEffect(()=>{
    console.log(context.user)
  },[context.user])

  const handleDelete = async () => {
    const res = await axios.delete(`https://notdefterim.onrender.com/user/${context.user._id}`, {
      headers: {
        authorization: "Bearer " + context.accessToken
      }
    })
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    context.setUser(null);
    navigate('/login')
  }

  return (
    <div className='share-container'>
      <Form onSubmit={handleSave} className='share-form'>
        <div className='single-note-header'>
            <div className='single-note-title'><h3><i className="fa-brands fa-gripfire torch"></i> Profilim <i  className="fa-brands fa-gripfire torch"></i></h3></div>          
              <Button onClick={handleDelete} variant='danger' className='profileUpdateButton'>Hesabı Sil</Button>
        </div>
        <Form.Group className="form-group-single" >
            <Form.Label><h5>Ad Soyad{editMode ? "*" : ":"}   </h5> </Form.Label>
            {editMode ? <Form.Control minLength="5" required name="nameLastname" value={form.nameLastname} onChange={((e) => handleChange(e))} type="text" />
              : <Form.Label className='single-note-form-label'> <h5> {context.user?.nameLastname} </h5> </Form.Label>}
          </Form.Group>
          <Form.Group className="form-group-single" >
            <Form.Label><h5>Kullanıcı Adı{editMode ? "*" : ":"}   </h5> </Form.Label>
            {editMode ? <Form.Control minLength="5" required name="username" value={form.username} onChange={((e) => handleChange(e))} type="text" />
              : <Form.Label className='single-note-form-label'> <h5> {context.user?.username} </h5> </Form.Label>}
          </Form.Group>
          <Form.Group className="form-group-single" >
            <Form.Label><h5>Şifre{editMode ? "*" : ":"}   </h5> </Form.Label>
            {editMode ? <Form.Control minLength="5" required name="password" value={form.password} onChange={((e) => handleChange(e))} type="text" placeholder='yeni şifrenizi giriniz..' />
              : <Form.Label className='single-note-form-label'> <h5> its a secret </h5> </Form.Label>}
          </Form.Group>
          <Form.Group className="form-group-single" >
            {editMode ? <div className='updateProfileButtons'> <Button variant='danger' onClick={()=>setEditMode(false)}>İptal Et</Button> <Button variant='success' type="submit">Kaydet</Button></div>
              : <div className='updateProfileButtons'> <Button  variant='warning' onClick={()=>setEditMode(true)}>Düzenle</Button></div>}
          </Form.Group>
       </Form>
       <ToastContainer />
    </div>
  )
}

export default UpdateProfile