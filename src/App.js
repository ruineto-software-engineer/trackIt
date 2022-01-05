import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Habits from "./components/Habits";
import Today from "./components/Today";
import Historic from "./components/Historic";
import "./style/reset.css";
import "./style/style.css";

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/today" element={<Today />} />
        <Route path="/historic" element={<Historic />} />
      </Routes>
    </BrowserRouter>
  );
}