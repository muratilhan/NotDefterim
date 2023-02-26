import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/share.css"
import {Context} from "../App"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select2 from 'react-select';
import datas from "../datas/Data";
function Share() {
  
  const context = useContext(Context)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title:"",
    lectureName:"",
    instructorName:"",
    username:context.user?.username,
    url:"",
    description:""
  });

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  }
  
  const handleClick = async (e) => {
    e.preventDefault();
    if(form.lectureName.length > 3 && form.url.includes("https") && (form.url.includes("cloud") || form.url.includes("drive"))){
      try{
        const res = await axios.post("https://notdefterim.onrender.com/note/",form,{
          headers: {
            authorization:"Bearer " + context.accessToken
          }})
        localStorage.setItem("user", JSON.stringify(res.data));
        context.setUser(res.data) 
        navigate("/home")
      }catch(err){
          console.log(err)
      }
    }else{
      alert("Hatalı Ders Notu Paylaşımı")
    }
  }
  return (
    <div className='share-container'>
      <Form onSubmit={handleClick} className='share-form'>
        <div className='share-header'>
            <h3>Ders Notu Paylaş</h3>
        </div>
        <Form.Group className="form-group" >
          <h5>Ders Notu Başlığı*</h5>
          <Form.Control required minLength="3" maxLength="15" name="title" value={form.title} onChange={((e)=>handleChange(e))} type="text" placeholder="ör: Final Çıkmış Sorular." />
        </Form.Group>

        <Form.Group required className=" form-group">
            <Form.Label><h5>Dersin Adı*</h5> </Form.Label>
            <Select2 className='select-component'
            options={datas.map(item =>({label:item.name, value: item.value}))}
            onChange={(e)=>setForm({...form,lectureName:e.value})}
            >
          </Select2>
        </Form.Group>

        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label><h5>Dersin Hocası*</h5> </Form.Label>
          <Form.Control required minLength="3" maxLength="15"  name="instructorName" value={form.instructorName} onChange={((e)=>handleChange(e))} type="text" placeholder="ör: Cemal Süreya" />
        </Form.Group>
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label><h5>Drive/Cloud Linki*</h5> </Form.Label>
          <Form.Control required name="url" value={form.url} onChange={((e)=>handleChange(e))} type="text" placeholder="Drive/Cloud linkini buraya yapıştırın" />
        </Form.Group>
        <Form.Group className=" form-group" controlId="formBasicEmail">
          <Form.Label><h5>Ders Notu Açıklaması*</h5> </Form.Label>
          <Form.Control required minLength="5" name="description" value={form.description} onChange={((e)=>handleChange(e))} type="text" placeholder="ör: hoca derste çözdüklerinden soruyor :p"/>
        </Form.Group>
        <Form.Group className=" form-group" controlId="formBasicEmail">
          <Button variant="success" className='py-2' type="submit">
            Paylaş
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Share;