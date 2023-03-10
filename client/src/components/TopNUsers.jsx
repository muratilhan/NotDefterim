import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "./Spinner";
import { Context } from "../App";
import { useContext, useState } from "react";

function TopNUsers() {
  
  const context = useContext(Context);
  const [isActive, setIsActive] = useState(false);

  if(context.topUsers.length === 0) return <Spinner></Spinner>
  const handleClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div className="topNUsers-container" >
      <div  id="topNUsers" className="search-side topUsers">
        <div className="search-header">
          {" "}
          <h4>TOP 3 </h4>
        </div>
        <div className="top-users-container">
          <ul>
            {context.topUsers.map((user,index) => (
              <li key={user._id}>
                <h5>
                  <img src={require(`../styles/img/spot${index+1}.jpg`)} alt="none" />
                  {user.nameLastname}
                </h5>{" "}
                <span>
                  {user.point}{" "} 
                  <i
                    style={{ color: "orange" }}
                    className="fa-solid fa-star"
                  ></i>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Accordion id="accordion-menu-mobile"
        style={{ width: "100%" }}
        bg="dark"
        className="accordionmenu-item"
      >
        <Accordion.Item eventKey="0" flush="true" style={{ width: "100%" }}>
          <Accordion.Header onClick={handleClick} bg="dark" className="accordion-header">
            <div>
              <h2>Top 3</h2>
              <b><i className={`fa-solid fa-arrow-${isActive ? "up" : "down"}`}></i></b>
            </div>
       
          </Accordion.Header>

          <Accordion.Body flush="true" className="accordion-body">
          <div className="top-users-container">
          <ul>
            {context.topUsers.map((user,index) => (
              <li key={user._id}>
                <h5>
                  {" "}
                  <img src={require(`../styles/img/spot${index+1}.jpg`)} alt="none" />
                  {user.nameLastname}
                </h5>{" "}
                <span>
                  {user.point}{" "}
                  <i
                    style={{ color: "orange" }}
                    className="fa-solid fa-star"
                  ></i>
                </span>
              </li>
            ))}
          </ul>
        </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default TopNUsers;

