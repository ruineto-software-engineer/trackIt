import Calendar from "react-calendar";
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
  height: 100%;
`;

const Title = styled.h2`
  font-size: 22.976px;
  line-height: 29px;

  padding-top: 100px;

  color: #126BA5;  
`;

const ContainerCalendar = styled.div`
  height: 60%;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  height: 100%;

  margin-top: 11px;

  border: none;
  border-radius: 10px;
`;

const components = {
  Container,
  Content,
  Title,
  ContainerCalendar,
  StyledCalendar
};

export default components;