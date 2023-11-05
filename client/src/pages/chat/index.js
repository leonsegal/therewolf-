import styles from "./styles.module.css";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

export default function Chat({ socket, username, room }) {
  return (
    <div className={styles.chatContainer}>
      <div>
        <Messages socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
}
