import React, { useEffect } from "react";
import ReactEmoji from "react-emoji";
import "./css/Message.css";
import moment from "moment";

const Message = ({ message: { message, user }, name }) => {
  const trimmedName = name.trim().toLowerCase();
  const isSentByCurrentUser = user === trimmedName ? true : false;

  function b64(e) {
    var t = "";
    var n = new Uint8Array(e);
    var r = n.byteLength;
    for (var i = 0; i < r; i++) {
      t += String.fromCharCode(n[i]);
    }
    return window.btoa(t);
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      {/* <p className="sentText pr-10">{trimmedName}</p> */}

      {message.type == "text" ? (
        <div className="messageBox backgroundBlue">
          <p className="sentText colorWhite">{user}</p>
          <p className="messageText colorWhite">
            {ReactEmoji.emojify(message.text)}
          </p>
          <p className="sentText rt colorWhite timefont">
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            &nbsp; {moment(message.sendAt).format("lll")}
          </p>
        </div>
      ) : (
        <>
          {/* <img src={`data:image/png;base64, ${b64(message.text)}`} width="30px" /> */}
          <img src={message.text} style={{ maxWidth: "150px" }} />
        </>
      )}
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      {message.type == "text" ? (
        <div className="messageBox backgroundLight">
          <p className="sentText">{user}</p>
          <p className="messageText colorDark">
            {ReactEmoji.emojify(message.text)}
          </p>
          <p className="sentText rt timefont">
            <i class="fa fa-clock-o" aria-hidden="true"></i> &nbsp;
            {moment(message.sendAt).format("lll")}
          </p>
        </div>
      ) : (
        <img src={message.text} style={{ maxWidth: "150px" }} />
      )}
    </div>
  );
};

export default Message;
