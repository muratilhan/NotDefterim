import React from 'react'
import "../styles/footer.css"
import {Button} from "react-bootstrap"
import emailjs from '@emailjs/browser';
import { useRef } from 'react';


function Email() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_shhswjk', 'template_qs1u3ec', form.current, 'l27wKaMvC4GWStTKb')
      .then((result) => {
          console.log(result.text);
          console.log("email sended")
          Alert('Mesajınız gönderildi..')
      }, (error) => {
          console.log(error.text);
      });
  }


  return (
    <form ref={form} onSubmit={sendEmail} className='email'>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <Button type='submit' variant='success'>Gönder</Button>
    </form>
  )
}

export default Email