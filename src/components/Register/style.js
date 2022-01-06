import styled from "styled-components";
import { Link } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 33px 0 25px;
`;

const Input = styled.input`
  width: 303px;
  height: 45px;

  background-color: ${(props) => props.stageLoading ? "#F2F2F2" : "#FFFFFF"};

  pointer-events: ${(props) => props.stageLoading ? "none" : "all"};

  border: 1px solid #D5D5D5;
  border-radius: 5px;

  box-sizing: border-box;

  margin-bottom: 6px;
  padding: 10px;
  
  font-size: 19.976px;
  line-height: 25px;

  color: ${(props) => props.stageLoading ? "#AFAFAF" : "#DBDBDB"};

  &::placeholder{
    color: #DBDBDB;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 303px;
  height: 45px;

  opacity: ${(props) => props.stageLoading ? 0.7 : 1};

  pointer-events: ${(props) => props.stageLoading ? "none" : "all"};

  background: #52B6FF;

  border: none;
  border-radius: 4.63636px;

  font-size: 20.976px;
  line-height: 26px;
  text-align: center;

  color: #FFFFFF;

  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  margin-top: 55px;

  @media screen and (min-width: 800px) {
    &{
      margin-top: 100px;
    }
  }
`;

const Hyperlink = styled(Link)`
  font-size: 13.976px;
  line-height: 17px;
  text-decoration-line: underline;

  color: #52B6FF;
`;

const components = {
  Form,
  Input,
  Button,
  Container,
  Hyperlink
};

export default components;