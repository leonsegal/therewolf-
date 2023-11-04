import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export default function Home({ userName, setUserName, room, setRoom, socket }) {
  let navigate = useNavigate();

  function joinRoom() {
    if (room && userName) {
      socket.emit("join_room", { userName, room });

      navigate("/chat", { replace: true });
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={(e) => setUserName(e.target.value)}
        />

        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value="javascript">Javascript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>

        <button
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={()=>joinRoom()}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
