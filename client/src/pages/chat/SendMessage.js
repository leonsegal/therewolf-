import styles from "./styles.module.css";
import React, { useState } from "react";

export default function SendMessage({ socket, username, room }) {
  let [message, setMessage] = useState("");

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        className="btn btn-primary"
        onClick={() => {
          if (message) {
            socket.emit("send_message", {
              username,
              room,
              message,
            });

            setMessage("");
          }
        }}
      >
        Send Message
      </button>
    </div>
  );
}
