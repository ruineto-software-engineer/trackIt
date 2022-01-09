import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding-bottom: 120px;

  display: flex;
  justify-content: center;

  background-color: #F2F2F2;
`;

const Content = styled.div`
  width: 90%;
`;

const Title = styled.h2`
  font-size: 22.976px;
  line-height: 29px;

  padding-top: 100px;

  color: #126BA5;  
`;

const Subtitle = styled.p`
  font-size: 17.976px;
  line-height: 22px;

  margin-top: 17px;

  color: #666666;
`;

const components = {
  Container,
  Content,
  Title,
  Subtitle
};

export default components;