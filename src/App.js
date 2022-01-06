import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Habits from "./components/Habits";
import Today from "./components/Today";
import Historic from "./components/Historic";
import "./style/reset.css";
import "./style/style.css";

export default function App() {
  const [token, setToken] = useState('');

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setStageToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/today" element={<Today stageToken={token} />} />
        <Route path="/historic" element={<Historic />} />
      </Routes>
    </BrowserRouter>
  );
}