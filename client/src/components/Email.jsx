import React from 'react'
import "../styles/footer.css"
import {Button} from "react-bootstrap"
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Email() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    try{
      emailjs.sendForm('service_shhswjk', 'template_qs1u3ec', form.current, 'l27wKaMvC4GWStTKb')
      .then((result) => {
        toast.success("Email Gönderildi..",{theme:"dark"});
        console.log("email sended")
      }, (error) => {
        toast.error("Email Gönderildi..",{theme:"dark"});
      });
    }catch(err){
      toast.error("Başarısız..",{theme:"dark"})
    }
  }


  return (
    <form ref={form} onSubmit={sendEmail} className='email'>
      <label>Name</label>
      <input required type="text" name="user_name" />
      <label>Email</label>
      <input required type="email" name="user_email" />
      <label>Message</label>
      <textarea required name="message" />
      <Button type='submit' variant='success'>Gönder</Button>
      <ToastContainer />
    </form>
  )
}

export default Email