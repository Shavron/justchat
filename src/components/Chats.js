import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";

import "./css/Chats.css";

const Chats = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.length > 0 &&
      messages.map((message, i) => (
        <Message key={i} chat={message} name={name} />
      ))}
  </ScrollToBottom>
);

export default Chats;
