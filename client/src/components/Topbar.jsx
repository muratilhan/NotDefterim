import Container from "react-bootstrap/Container";
import { useContext, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { Context } from "../App";
import kalem from "../styles/img/kalem.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Topbar() {
  const navigate = useNavigate();
  const context = useContext(Context);

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    context.setUser(null);
    navigate("/");
  };



  return (
    <Navbar
      collapseOnSelect
      className="nav-container py-0"
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="#home">
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            <div className="nav-brand">
              <img src={kalem} alt="" />
              <div className="nav-brand-text">
                <span>NOT</span>
                <span>DEFTERİM</span>
              </div>
            </div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Link className="topbar-navs">
              <span>Ders Notları</span>
            </Link>
            <Link className="topbar-navs" to="/hakkinda">
              Hakkında
            </Link>
            <a className="topbar-navs" href="#footer">
              İletişim
            </a>
            <Link className="topbar-navs" to='/updateprofile'>Hesabım</Link>
            <Link className="topbar-navs" to="/login">
              {" "}
              {context.user ? (
                <span onClick={handleClick}>Çıkış Yap</span>
              ) : (
                "Giriş Yap"
              )}{" "}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer></ToastContainer>
    </Navbar>
  );
}

export default Topbar;
