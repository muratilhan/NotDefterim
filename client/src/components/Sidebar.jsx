import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "../styles/sidebar.css";
import { Context } from "../App";
import { Link } from "react-router-dom";
import AccordionMenu from "./AccordionMenu";
import TopNUsers from "./TopNUsers";
import Select2 from 'react-select';
import datas from "../datas/Data";
import logo from '../styles/img/logo.png'

function Sidebar() {
  const context = useContext(Context);

  const handleChange = (e) => {
    const available = context.notes.find(
      (note) => note.lectureName === e.value
    );
    if (available) {
      context.setFilteredNotes(
        context.notes.filter((note) => note.lectureName === e.value)
      );
      context.setMessage(false);
    } else {
      context.setFilteredNotes([]);
      context.setMessage(true);
    }
  };
  const handleClear = () => {
    context.setFilteredNotes(context.notes);
    context.setMessage(false);
  };

  useEffect(() => {}, [context]);

  const handleFilter = () => {};
  
  return (
    <div className="sidebar-container">
      <div className="sidebar-profil">
        <Link className="sidebar-profil-items">
          <img style={{borderRadius:"50%"}} src={logo} alt="" />
          <div>
            <h4> {context.user?.nameLastname} </h4>
            <h6>
              <i style={{ color: "orange" }} className="fa-solid fa-star"></i>{" "}
              Puan: {context.user?.point}{" "}
            </h6>
          </div>
        </Link>
      </div>
      <div className="sidebar-info">
        <span>Bilgi:</span> Not Paylaşmak 10 puan değerindedir.{" "}
      </div>
      <div className="search-side">
        <div className="search-header">
          {" "}
          <h4>Ders Notu Ara</h4>
        </div>
        <Form.Group className="mb-3 form-group" controlId="formBasicEmail">
          <Form.Label className="search-title">
            <h4>Dersin Adı*</h4>{" "}
            <h4 onClick={handleClear}>
              <i className="fa-solid fa-broom clear"></i>
            </h4>{" "}
          </Form.Label>
          <Select2 className='select-component'
            options={datas.map(item =>({label:item.name, value: item.value}))}
            onChange={handleChange}
            >
          </Select2>
          {context.message && (
            <p style={{ color: "red", margin: "0" }}>
              Ders Notu Bulunamadı <i className="fa-solid fa-exclamation"></i>
            </p>
          )}
          <span style={{ marginTop: "0.5rem" }} className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </Form.Group>
      </div>
      <div
        style={{ width: "100%", backgroundColor: "black" }}
        className="accordionmenu"
      >
        <AccordionMenu></AccordionMenu>
      </div>
      <TopNUsers></TopNUsers>
    </div>
  );
}

export default Sidebar;
