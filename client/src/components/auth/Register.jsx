import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/auth.css"

function Register() {

  const navigate = useNavigate();
  const [activateMode, setActivateMode] = useState(false);
  const [form, setForm] = useState({
    nameLastname:"",
    username:"",
    email:"",
    password:"",
    activationCode:null
  })
  const [verificationCode, setVerificationCode] = useState(null)
  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if(parseInt(form.activationCode) !== verificationCode){
      alert("Hatalı Kod Girişi")
    }
    else{
      try{  
        const res = await axios.post("https://notdefterim.onrender.com/auth/register",form)
        navigate('/login');
        window.location.reload();
      }catch(err){
        alert("hatalı giriş") 
      }
    }
  }

  const emailVerification = async (e) => {
    e.preventDefault();
    const email = "murattilhann08@gmail.com"
    const res = await axios.post("https://notdefterim.onrender.com/verificationCode/", { form })
    setVerificationCode(res.data)
    setActivateMode(true);
  }
  return (
    <div className='auth-container'>
        <Form onSubmit={handleClick} className='auth-form'>
          <Form.Group className="mb-3" >
            <Form.Label><i className="fa-solid fa-user"></i> İsim Soyisim*</Form.Label>
            <Form.Control minLength="5" maxLength="15" name='nameLastname' required type="text" placeholder="" onChange={(e)=>handleChange(e)}/>
          </Form.Group>

          <Form.Group className="mb-1" controlId="">
            <Form.Label><i className="fa-solid fa-fingerprint"></i> Kullanıcı Adı*</Form.Label>
            <Form.Control minLength="5" maxLength="15" name='username' required type="text" placeholder="" onChange={(e)=>handleChange(e)}/>
            <Form.Text className='auth-message'>
                Bu alan eşsiz olmak zorundadır.
            </Form.Text>
          </Form.Group>

          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><i className="fa-solid fa-at"></i> E-mail Adresiniz*</Form.Label>
            <Form.Control minLength="5" name='email' required type="email" placeholder="" onChange={(e)=>handleChange(e)}/>
            <Form.Text className='auth-message'>
                  E-mail adresinizi hiçkimseyle paylaşmayacağız.
          </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label><i className="fa-solid fa-lock"></i> Şifreniz*</Form.Label>
            <Form.Control minLength="5" name='password'  maxLength="20" required type="password" placeholder="" onChange={(e)=>handleChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Text>
              Hesabın varsa hemen <Link to="/login">Oturum Aç</Link>.
            </Form.Text>
          </Form.Group>

          { activateMode ? 
          <>
            <Form.Group>
              <Form.Text style={{color:"green"}}>Mailinize gelen 5 basamaklı kodu giriniz.</Form.Text>
              <Form.Control minLength="5" maxLength="5" name='activationCode' required type="number" placeholder="doğrulama kodu" onChange={(e)=>handleChange(e)}/>
            </Form.Group> 
            <Button type="submit" className='py-2 my-1' variant="dark"  >
               Kayıt Ol
            </Button>
          </> :
            <Button onClick={emailVerification} className='py-2' variant="dark" >
              Gönder
            </Button>  }
          
        </Form>
    </div>
  );
}

export default Register;