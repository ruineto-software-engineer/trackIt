import { Fragment, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Style from "./style";
import LogoMini from "../../assets/img/logo-mini.svg";

export default function Topbar({ pathname }) {
  const { Header, UserImg, Container } = Style;
  const { user } = useContext(UserContext);

  return(
    <Fragment>
      <Container pathname={pathname}>
        <Header>
          <img alt="logo-mini.png" src={LogoMini} />

          <UserImg>
            <img alt="user-img" src={user} />
          </UserImg>
        </Header>
      </Container>
    </Fragment>
  );
}