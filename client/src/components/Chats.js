import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";

import "./css/Chats.css";

const Chats = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages &&
      messages.map((message, i) => (
        <Message key={i} message={message} name={name} />
      ))}
  </ScrollToBottom>
);

export default Chats;
