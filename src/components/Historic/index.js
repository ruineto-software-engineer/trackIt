import { Fragment } from "react";
import Style from "./style";

export default function Historic() {
  const { Container, Content, Title, Subtitle } = Style;

  return(
    <Fragment>
      <Container>
        <Content>
          <Title>Histórico</Title>
          <Subtitle>Em breve você poderá ver o histórico dos seus hábitos aqui!</Subtitle>
        </Content>
      </Container>
    </Fragment>
  );
}