import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import { Context } from "../../App";
import Spinner from "../Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const context = useContext(Context);
  const [spinner, setSpinner] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setSpinner(true)
    try {
      const res = await axios.post("https://notdefterim.onrender.com/auth/login", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
      context.setUser(res.data.user);
      context.setAccessToken(res.data.accessToken);
      setSpinner(false)
      navigate("/home");
      toast.success("Hoşgeldiniz..",{theme:"dark"});
    } catch (err) {
      setSpinner(false)
      toast.success("Hatalı Giriş.",{theme:"dark"});
    }
  };

  return (
    <div className="auth-container">
      { spinner ? <div className="auth-spinner"><Spinner></Spinner></div>
      :
      <Form onSubmit={handleClick} type="submit" className="auth-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <i class="fa-solid fa-at"></i> Email adresiniz*
          </Form.Label>
          <Form.Control
            required
            name="email"
            value={form.email}
            onChange={(e) => handleChange(e)}
            type="email"
            placeholder=""
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <i className="fa-solid fa-lock"></i> Şifreniz*
          </Form.Label>
          <Form.Control
            minLength="5"
            maxLength="20"
            required
            name="password"
            value={form.password}
            onChange={(e) => handleChange(e)}
            type="password"
            placeholder=""
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Text className="auth-message">
            Hesabınız yok mu? Hemen <Link to="/register">Kayıt ol</Link>.
          </Form.Text>
        </Form.Group>
        <Button variant="dark" type="submit">
          Oturum Aç
        </Button>
      </Form>
      }
      <ToastContainer />
    </div>
  );
}

export default Login;
