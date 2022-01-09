import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Habits from "./components/Habits";
import Today from "./components/Today";
import Historic from "./components/Historic";
import Topbar from "./components/Topbar";
import Menu from "./components/Menu";
import "./style/reset.css";
import "./style/style.css";

export default function App() {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [percentageCompleted, setPercentageCompleted] = useState('');

  return(
    <BrowserRouter>
      <Topbar img={userInfo.image} windowLocationPathName={window.location.pathname} />
        <Routes>
          <Route path="/" element={<Login setStageToken={setToken} setStageUserInfo={setUserInfo} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/habits" element={<Habits stageToken={token} />} />
          <Route 
            path="/today" 
            element={
              <Today 
                stageToken={token} 
                stagePercentageCompleted={percentageCompleted} 
                setStagePercentageCompleted={setPercentageCompleted}
              />
            } 
          />
          <Route path="/historic" element={<Historic />} />
        </Routes>
      <Menu percentageCompleted={percentageCompleted} windowLocationPathName={window.location.pathname}/>
    </BrowserRouter>
  );
}