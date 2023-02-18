import React from 'react'
import "../styles/footer.css"
import Email from './Email'
import img from "../img/kitap.jpg"
function Footer() {
  return (
    <div className='footer-container' id='footer'>
        <div className="footer-logo">
          <h1>Not<span className="landing-page-title">Defterim</span></h1>
          <ul>
              {["Home","Ders Notları","Hakkında"].map((item)=>(
                <li key={item}> {item} </li>
              )) }
          </ul>
          <p>10.11.2022 - <i className="fa-solid fa-infinity"></i></p>
        </div>
        <div className='footer-img'>
          
          <img src={img} alt="none" />
          
        </div>
        <div className="email-container"> 
            <Email/>
        </div>
    </div>
  )
}

export default Footer