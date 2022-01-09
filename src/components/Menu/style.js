import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = styled.div`
  width: 100%;
  height: 70px;

  display: ${(props) => props.pathname !== "/" ? "flex" : "none"};
  align-items: center;
  justify-content: center;
  
  position: fixed;
  left: 0px;
  bottom: 0px;

  background: #FFFFFF;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  position: relative;
`;

const Hypertext = styled(Link)`
  font-size: 17.976px;
  line-height: 22px;

  text-decoration: none;

  color: #52B6FF;

  margin: 0 36px;
`;

const ContentProgressbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const ContainerCircularProgressbar = styled.div`
  width: 91px;
  height: 91px;

  position: absolute;
  top: -55px;
`;

const components = {
  Footer,
  Container,
  Hypertext,
  ContentProgressbar,
  ContainerCircularProgressbar
};

export default components;