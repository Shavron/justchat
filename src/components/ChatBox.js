import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import TextContainer from "./TextContainer";
import Chats from "./Chats";
import NavBar from "./NavBar";
import Input from "./Input";
import "./css/ChatBox.css";

let socket;

const ChatBox = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [giphy, setGiphy] = useState(false);
  const ENDPOINT = document.location.origin.includes("localhost")
    ? "http://localhost:5004/"
    : "https://justchatserver.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    if (name != "" && room != "") {
      let _tempMessages = localStorage.getItem(name + "_" + room)
        ? JSON.parse(localStorage.getItem(name + "_" + room))
        : [];
      setMessages(_tempMessages);
    }
  }, [name, room]);

  useEffect(() => {
    if (messages.length > 0 && name != "" && room != "") {
      console.log(messages);
      let _tempMessages = localStorage.getItem(name + "_" + room)
        ? JSON.parse(localStorage.getItem(name + "_" + room))
        : [];
      console.log(_tempMessages);
      localStorage.setItem(name + "_" + room, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    // socket.on("imageConversionByClient", function(data) {
    //   //setImage("data:image/png;base64," + b64(data.buffer));
    // });

    // socket.on("imageConversionByServer", function(data) {
    //   setImage(data);
    // });
  }, []);

  const sendMessage = event => {
    if (event.preventDefault) event.preventDefault();
    socket.emit("sendMessage", message, () => setMessage(""));
    setGiphy(false);
  };

  const sendGiphy = gif => {
    socket.emit("sendMessage", gif, () => setMessage(""));
  };

  return (
    <div className="outerContainer ">
      <div className="container">
        <NavBar room={room} users={users} />
        <Chats messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          giphy={giphy}
          setGiphy={setGiphy}
          sendGiphy={sendGiphy}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default ChatBox;
