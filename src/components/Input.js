import React, { PropTypes } from "react";
import Picker from "react-giphy-component";
import "./css/Input.css";
import "font-awesome/css/font-awesome.min.css";

const Input = ({
  setMessage,
  sendMessage,
  message,
  giphy,
  setGiphy,
  sendGiphy
}) => {
  const log = gif => {
    sendGiphy(gif.preview_gif.url);
    setGiphy(false);
  };
  return (
    <>
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={event =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <div className="send__attachment" onClick={e => setGiphy(!giphy)}>
          <i class="fa fa-paperclip" aria-hidden="true"></i>
        </div>
        <div
          className="sendButton"
          id="sendButton"
          onClick={e => sendMessage(e)}
        >
          <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
        </div>
      </form>
      <div>
        {giphy && (
          <Picker
            onSelected={log}
            visible={false}
            modal={true}
            apiKey="0ZaOm5b89zFYmuF3W5wyHjskHc9nPTGj"
          />
        )}
      </div>
    </>
  );
};
export default Input;
