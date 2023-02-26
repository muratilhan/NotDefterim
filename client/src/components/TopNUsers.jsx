import axios from "axios";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";

function TopNUsers() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const getTopUsers = async () => {
      const res = await axios.get("https://notdefterim.onrender.com/user/topthree");
      setTopUsers(res.data.reverse());
    };
    getTopUsers();
  }, []);

  return (
    <div className="topNUsers-container" >
      <div  id="topNUsers" className="search-side topUsers">
        <div className="search-header">
          {" "}
          <h4>TOP 3 </h4>
        </div>
        <div className="top-users-container">
          <ul>
            {topUsers.map((user,index) => (
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
          <Accordion.Header bg="dark" className="accordion-header">
            <h2>Top 3</h2>
          </Accordion.Header>

          <Accordion.Body flush="true" className="accordion-body">
          <div className="top-users-container">
          <ul>
            {topUsers.map((user,index) => (
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

