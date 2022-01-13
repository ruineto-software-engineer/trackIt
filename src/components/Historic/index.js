import axios from "axios";
import { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import ptBr from "dayjs/locale/pt-br";
import TokenContext from "../../contexts/TokenContext";
import PercentageContext from "../../contexts/PercentageContext";
import DayContext from "../../contexts/DayContext";
import 'react-calendar/dist/Calendar.css';
import Style from "./style";

export default function Historic() {
  const { 
    Container, 
    Content,
    Title, 
    ContainerCalendar, 
    StyledCalendar
  } = Style;
  const { token } = useContext(TokenContext);
  const { percentage, setPercentage } = useContext(PercentageContext);
  const { setDay } = useContext(DayContext);
  const [historic, setHistoric] = useState(null);
  const [value, onChange] = useState(new Date());
  const [marked, setMarked] = useState([]);
  const navigate = useNavigate();

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

  function handleClickDay(date) {
    const clickedDate = dayjs(date).format("DD/MM/YYYY");

    let dateMonth = dayjs(date).date();
    let month = dayjs(date).month() + 1;
    let weekDay = dayjs(date).locale(ptBr).format('dddd').replace("-feira", "");
  
    if(dateMonth < 10){
      dateMonth = 0 + dateMonth.toString();
    }
    
    if(month < 10){
      month = 0 + month.toString();
    }

    const dateExtendend = `${weekDay}, ${dateMonth}/${month}`

    let habitsClickedDate = [];
    for (let i = 0; i < historic.length; i++) {
      const historicElement = historic[i];
      
      if(historicElement.day === clickedDate){
        habitsClickedDate = [ ...historicElement.habits ];

        break;
      }
    }

    const habitsDone = habitsClickedDate.filter((habit) => {
      return habit.done === true;
    })
    setDay(
      {
        "selectedDate": dateExtendend, 
        "selectedDateHabits": [ ...habitsClickedDate ],
        "percentageCompletedHabits": ((habitsDone.length/habitsClickedDate.length) * 100).toFixed(0)
      }
    );
    navigate(`/Day/${dateMonth}`);
  }

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
                if(marked.find(x => (x.date === dayjs(date).format("DD/MM/YYYY")) && x.completed === false)){
                  return 'incompleted'
                }else if(marked.find(x => (x.date === dayjs(date).format("DD/MM/YYYY")) && x.completed === true)){
                  return 'completed'
                }
              }}
              formatDay ={(locale, date) => dayjs(date).format('DD')}
              onClickDay={(date) => handleClickDay(date)}
            />
          </ContainerCalendar>
        </Content>
      </Container>
    </Fragment>
  );
}