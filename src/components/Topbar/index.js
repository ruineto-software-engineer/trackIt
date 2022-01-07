import { Fragment } from "react";
import Style from "./style";
import LogoMini from "../../assets/img/logo-mini.svg";

export default function Topbar({ img }) {
  const { Header, UserImg } = Style;

  return(
    <Fragment>
      <Header>
        <img alt="logo-mini.png" src={LogoMini} />

        <UserImg>
          <img alt="user-img" src={img} />
        </UserImg>
      </Header>
    </Fragment>
  );
}