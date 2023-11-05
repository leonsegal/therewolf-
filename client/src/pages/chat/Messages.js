import styles from "./styles.module.css";
import { useEffect, useState } from "react";

export default function Messages({ socket }) {
  let [messagesRecieved, setMessagesReceived] = useState([]);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      let { message, username, createdTime } = data;
      setMessagesReceived((state) => [
        ...state,
        {
          message,
          username,
          createdTime,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <div className={styles.messagesColumn}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta}>{msg.username}: </span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.createdTime)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

// dd/mm/yyyy, hh:mm:ss
function formatDateFromTimestamp(timestamp) {
  let date = new Date(timestamp);

  return date.toLocaleString();
}
