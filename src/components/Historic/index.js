import { Fragment } from "react";
import Style from "./style";
import Topbar from "../Topbar";
import Menu from "../Menu";

export default function Historic({ stageUserInfo }) {
  const { Container, Content, Title, Subtitle } = Style;

  return(
    <Fragment>
      <Container>
        <Topbar img={stageUserInfo.image} />
          <Content>
            <Title>Histórico</Title>
            <Subtitle>Em breve você poderá ver o histórico dos seus hábitos aqui!</Subtitle>
          </Content>
        <Menu />
      </Container>
    </Fragment>
  );
}