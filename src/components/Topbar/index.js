import { Fragment } from "react";
import Style from "./style";
import LogoMini from "../../assets/img/logo-mini.svg";

export default function Topbar({ img, windowLocationPathName }) {
  const { Header, UserImg, Container } = Style;

  return(
    <Fragment>
      <Container windowLocationPathName={windowLocationPathName}>
        <Header>
          <img alt="logo-mini.png" src={LogoMini} />

          <UserImg>
            <img alt="user-img" src={img} />
          </UserImg>
        </Header>
      </Container>
    </Fragment>
  );
}