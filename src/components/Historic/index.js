import axios from "axios";
import { Fragment, useState, useEffect, useContext } from "react";
import TokenContext from "../../contexts/TokenContext";
import PercentageContext from "../../contexts/PercentageContext";
import 'react-calendar/dist/Calendar.css';
import Style from "./style";

export default function Historic() {
  const { Container, Content, Title, ContainerCalendar, StyledCalendar } = Style;
  const { token } = useContext(TokenContext);
  const { percentage, setPercentage } = useContext(PercentageContext);
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    promise.then((response) => {
      const habitsDone = response.data.filter((habit) => {
        return habit.done === true;
      })
      
      setPercentage(((habitsDone.length/response.data.length) * 100));
    });
  }, [token, percentage, setPercentage]);

  return(
    <Fragment>
      <Container>
        <Content>
          <Title>Histórico</Title>
          <ContainerCalendar>
            <StyledCalendar
              onChange={onChange}
              value={value}
            />
          </ContainerCalendar>
        </Content>
      </Container>
    </Fragment>
  );
}