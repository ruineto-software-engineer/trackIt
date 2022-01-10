import axios from "axios";
import { Fragment, useState, useEffect, useContext } from "react";
import moment from 'moment';
import TokenContext from "../../contexts/TokenContext";
import PercentageContext from "../../contexts/PercentageContext";
import 'react-calendar/dist/Calendar.css';
import Style from "./style";

export default function Historic() {
  const { Container, Content, Title, ContainerCalendar, StyledCalendar } = Style;
  const { token } = useContext(TokenContext);
  const { percentage, setPercentage } = useContext(PercentageContext);
  const [historic, setHistoric] = useState(null);
  const [value, onChange] = useState(new Date());
  const [marked, setMarked] = useState([]);

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

  useEffect(() => {
    const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    promise.then((response) => {
      setHistoric(response.data);
    });
    promise.catch((error) => {
      console.log(error.response);
    });
  }, [token]);

  useEffect(() => {
    const arrayMarked = [];
    if(historic !== null){
      for (let i = 0; i < historic.length; i++) {
        const historicDay = historic[i];
        
        for (let j = 0; j < historicDay.habits.length; j++) {
          const historicDayHabits = historicDay.habits[j];
        
          if(historicDayHabits.done === false){
            arrayMarked.push({"date": historicDay.day, "completed": false});

            break;
          }
        }

        if(arrayMarked.findIndex(weekDay => weekDay.date === historicDay.day) === -1) {
          arrayMarked.push({"date": historicDay.day, "completed": true});
        }
      }
    }

    setMarked([ ...arrayMarked ]);
  }, [historic]);

  return(
    <Fragment>
      <Container>
        <Content>
          <Title>Histórico</Title>
          <ContainerCalendar>
            <StyledCalendar
              onChange={onChange}
              value={value}
              tileClassName={({ date, view }) => {
                if(marked.find(x => (x.date === moment(date).format("DD/MM/YYYY")) && x.completed === false)){
                  return 'incompleted'
                }else if(marked.find(x => (x.date === moment(date).format("DD/MM/YYYY")) && x.completed === true)){
                  return 'completed'
                }
              }}
            />
          </ContainerCalendar>
        </Content>
      </Container>
    </Fragment>
  );
}