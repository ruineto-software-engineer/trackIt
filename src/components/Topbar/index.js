import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Style from "./style";
import LogOut from "../../assets/img/log-out-outline.svg"
import LogoMini from "../../assets/img/logo-mini.svg";

export default function Topbar({ pathname }) {
  const { Header, UserImg, Container, UserConfing } = Style;
  const { user, Logout } = useContext(UserContext);
  const [userConfig, setUserConfig] = useState(true);
  const navigate = useNavigate();

  function handleUserConfig(userConfigValue) {
    if(userConfigValue){
      setUserConfig(false);
    }else{
      setUserConfig(true);
    }
  }

  function handleLogOut() {
    if(window.confirm("Deseja realmente sair da seção atual?")){
      setUserConfig(true);
      Logout();
      navigate("/");
      
      window.location.reload(true);
    }else{
      return;
    }
  }

  return(
    <Fragment>
      <Container pathname={pathname}>
        <Header>
          <img alt="logo-mini.png" src={LogoMini} onClick={() => navigate("/today")} />

          <UserImg onClick={() => handleUserConfig(userConfig)}>
            <img alt="user-img" src={user} />
          </UserImg>
        </Header>

        <UserConfing userConfigDisplay={userConfig} onClick={handleLogOut}>
          <img alt="LogOut" src={LogOut}/> Sair
        </UserConfing>
      </Container>
    </Fragment>
  );
}