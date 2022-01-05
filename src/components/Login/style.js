import styled from "styled-components";
import { Link } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 33px 0 25px;

  input{
    width: 303px;
    height: 45px;

    background: #FFFFFF;

    border: 1px solid #D5D5D5;
    border-radius: 5px;

    box-sizing: border-box;

    margin-bottom: 6px;
    padding: 10px;
    
    font-size: 19.976px;
    line-height: 25px;

    color: #DBDBDB;

    &::placeholder{
      color: #DBDBDB;
    }
  }

  button{
    width: 303px;
    height: 45px;

    background: #52B6FF;

    border: none;
    border-radius: 4.63636px;

    font-size: 20.976px;
    line-height: 26px;
    text-align: center;

    color: #FFFFFF;

    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

const Hyperlink = styled(Link)`
  font-size: 13.976px;
  line-height: 17px;
  text-decoration-line: underline;

  color: #52B6FF;
`;

const components = {
  Form,
  Container,
  Hyperlink
};

export default components;