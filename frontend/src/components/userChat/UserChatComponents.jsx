import React, { useEffect, useState } from "react";
import "../../chat.css";
import socketIOClient from "socket.io-client"

const UserChatComponents = () => {
  const [socket, setSocket] = useState(false)

  useEffect(() =>{
    const socket = socketIOClient()
    setSocket(socket)
    return () => socket.disconnect() // disconnect when close the page
  },[])

  const clientSubmitChatMsg = (e) =>{
    if (e.keyCode && e.keyCode !== 13) {
      return
    }
    socket.emit("client sends message", "message form client")
  }

  return (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-dots comment"></i>
        <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
        <i className="bi bi-x-circle close"></i>
      </label>

      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Let's Chat - Online</h6>
        </div>

        <div className="chat-form">
          <div className="cht-msg">
            {/* <p>Chat history</p> */}
            {/* for checking */}
            {Array.from({ length: 20 }).map((_, id) => (
              <div key={id}>
                <p>
                  <b>You wrote:</b> Hello, world! This is a toast message.
                </p>
                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>Support wrote: </b>Hello, world! This is a toast message.
                </p>
              </div>
            ))}
            {/* <p>
              <b>You wrote:</b> Hello, world! This is a toast message.
            </p>
            <p className="bg-primary p-3 ms-4 text-light rounded-pill">
              <b>Support wrote: </b>Hello, world! This is a toast message.
            </p> */}
          </div>
          <textarea
            id="clientChatMsg"
            className="form-control"
            placeholder="Your Text Message"
            onKeyUp={(e) => clientSubmitChatMsg(e)}
          ></textarea>

          <button className="btn btn-success btn-block" onClick={(e) => clientSubmitChatMsg(e)}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default UserChatComponents;
