import "./App.css";
import { useState } from "react";
import Home from "./pages/home";
import Chat from "./pages/chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

let port = 4000;
let socket = io.connect(`http://localhost:${port}`);

export default function App() {
  let [username, setUserName] = useState("");
  let [room, setRoom] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUserName={setUserName}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
