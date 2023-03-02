import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import "../styles/accordionMenu.css"
import { Context } from '../App';
import Select2 from 'react-select';
import datas from "../datas/Data";
function AccordionMenu() {
  const context = useContext(Context)

  const handleChange = (e) => {
    context.setFilteredNotes(context.notes.filter(note => note.lectureName === e.value))
  }
  const handleClear = () => {
    context.setFilteredNotes(context.notes)
  }
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive)
  }


  return (
    <Accordion style={{width:"100%"}} bg="dark" className='accordionmenu-item'>
      <Accordion.Item eventKey="0" flush="true"  style={{width:"100%"}}>
        <Accordion.Header onClick={handleClick} bg="dark" className='accordion-header'> 
       <div >
        <b><h2>Ders Notu Ara</h2></b> 
        <b><i className={`fa-solid fa-arrow-${isActive ? "down" : "up"}`}></i></b>
        </div>
       </Accordion.Header>
       
        <Accordion.Body flush="true" className='accordion-body'>
        <Form.Group className=" form-group" controlId="formBasicEmail">
            <Form.Label className='search-title'><h4>Dersin Adı*</h4> <h4 onClick={handleClear}><i className="fa-solid fa-broom clear"></i></h4> </Form.Label>
            <Select2 className='select-component'
            options={datas.map(item =>({label:item.name, value: item.value}))}
            onChange={handleChange}
            >
          </Select2>
            <span style={{marginTop:"1rem"}} className='search-icon'><i className="fa-solid fa-magnifying-glass"></i></span>
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default AccordionMenu