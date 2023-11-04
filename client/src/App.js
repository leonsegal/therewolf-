import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Home from "./pages/home";

let port = 4000;
let socket = io.connect(`http://localhost:${port}`);

export default function App() {
  let [userName, setUserName] = useState("");
  let [room, setRoom] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                userName={userName}
                setUserName={setUserName}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
