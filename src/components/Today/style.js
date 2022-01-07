import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;

  background-color: #F2F2F2;
`;

const Content = styled.div`
  width: 90%;
`;

const Date = styled.p`
  padding-top: 100px;

  font-size: 22.976px;
  line-height: 29px;

  color: #126BA5;
`;

const Progress = styled.p`
  font-size: 17.976px;
  line-height: 22px;

  color: #BABABA;
`;

const components = {
  Container,
  Content,
  Date,
  Progress
};

export default components;