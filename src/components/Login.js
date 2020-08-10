import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./css/Login.css";

export default function Login() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const genrateRoom = (len, charSet) => {
    charSet =
      charSet ||
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var randomString = "";
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    setRoom(name + "__" + randomString);
  };

  return (
    <>
      <div className="joinOuterContainer fixed-bg">
        <div className="joinInnerContainer">
          <h1 className="heading">
            <i class="fa fa-user-secret" aria-hidden="true"></i> &nbsp;
            JustChatMe
          </h1>
          <div>
            <input
              placeholder="Name"
              className="joinInput"
              type="text"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Room"
              className="joinInput mt-20"
              type="text"
              value={room}
              onChange={event => setRoom(event.target.value)}
            />
          </div>
          {/* <button
            className={"button mt-20 genrate"}
            type="button"
            onClick={() => genrateRoom(7)}
          >
            Create Room
          </button> */}
          <Link
            onClick={e => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className={"button mt-20"} type="submit">
              Enter
            </button>
          </Link>
        </div>{" "}
      </div>
    </>
  );
}
