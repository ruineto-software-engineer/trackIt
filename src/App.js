import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Habits from "./components/Habits";
import Today from "./components/Today";
import Historic from "./components/Historic";
import Topbar from "./components/Topbar";
import Menu from "./components/Menu";
import UserContext from "./contexts/UserContext";
import TokenContext from "./contexts/TokenContext";
import PercentageContext from "./contexts/PercentageContext";
import "./style/reset.css";
import "./style/style.css";

export default function App() {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [percentage, setPercentage] = useState('');

  return(
    <UserContext.Provider value={{user, setUser}}>
      <TokenContext.Provider value={{token, setToken}}>
        <PercentageContext.Provider value={{percentage, setPercentage}}>
          <BrowserRouter>
            <Topbar pathname={window.location.pathname} />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/today" element={<Today />} />
                <Route path="/historic" element={<Historic />} />
              </Routes>
            <Menu pathname={window.location.pathname}/>
          </BrowserRouter>
        </PercentageContext.Provider>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}