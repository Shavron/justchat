import React from "react";
import "./css/NavBar.css";
import "font-awesome/css/font-awesome.min.css";

const NavBar = ({ room, users }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <i className="fa fa-th-large" aria-hidden="true"></i> &nbsp;&nbsp;
      <div style={{ display: "inline-block" }}>
        <p>{room.charAt(0).toUpperCase() + room.slice(1)}</p>

        <p className="sentText colorWhite join__users">
          {" "}
          {users.length ? users.map(u => u.name).join(", ") : ""}
        </p>
      </div>
    </div>

    <div className="rightInnerContainer">
      <a href="/">
        <i
          style={{ color: "#fff" }}
          className="fa fa-times"
          aria-hidden="true"
        ></i>
      </a>
    </div>
    {/* <div className="join__users">
      {users.length ? users.map(u => u.name).join(", ") : ""}
    </div> */}
  </div>
);

export default NavBar;
