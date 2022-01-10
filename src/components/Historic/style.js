import Calendar from "react-calendar";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;

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

const ContainerCalendar = styled.div`
  height: 402px;

  margin-bottom: 30px;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  height: 100%;

  margin-top: 11px;

  border: none;
  border-radius: 10px;
`;

const DateTitle = styled.h2`
  font-size: 22.976px;
  line-height: 29px;

  color: #126BA5;
`;

const DateSubtitle = styled.p`
  font-size: 17.976px;
  line-height: 22px;

  margin-bottom: 28px;

  color: 
  ${
    (props) => 
      props.selectedDayHistoric !== '' &&
        props.selectedDayHistoric.selectedDateHabits.length > 0 ?
          "#8FC549" 
        : 
          "#BABABA"
  };
`;

const components = {
  Container,
  Content,
  Title,
  ContainerCalendar,
  StyledCalendar,
  DateTitle,
  DateSubtitle
};

export default components;