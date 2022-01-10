import axios from "axios";
import { Fragment, useState, useEffect, useContext } from "react";
import dayjs from 'dayjs';
import TokenContext from "../../contexts/TokenContext";
import PercentageContext from "../../contexts/PercentageContext";
import 'react-calendar/dist/Calendar.css';
import Check from "../../assets/img/check.svg";
import Style from "./style";

export default function Historic() {
  const { 
    Container, 
    Content, 
    Title, 
    ContainerCalendar, 
    StyledCalendar, 
    DateTitle, 
    DateSubtitle,
    ListedHabitContainer,
    HabitTitle,
    HabitDetaisContainer,
    HabitCheckMarkContainer
  } = Style;
  const { token } = useContext(TokenContext);
  const { percentage, setPercentage } = useContext(PercentageContext);
  const [historic, setHistoric] = useState(null);
  const [selectedDayHistoric, setSelectedDayHistoric] = useState('');
  const [value, onChange] = useState(new Date());
  const [marked, setMarked] = useState([]);
  const [habitsPercentage, setHabitsPercentage] = useState('');

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
    console.log("clickedDate: ", clickedDate);

    console.log("date(): ", dayjs(date).date());
    console.log("month(): ", dayjs(date).month());
    console.log("day(): ", dayjs(date).day());

    let dateMonth = dayjs(date).date();
    let month = dayjs(date).month();
    let weekDay = dayjs(date).day();
  
    switch (weekDay) {
      case 1:
        weekDay = 'Segunda';
        break;
  
      case 2:
        weekDay = 'Terça';
        break;
  
      case 3:
        weekDay = 'Quarta';
        break;
  
      case 4:
        weekDay = 'Quinta';
        break;
  
      case 5:
        weekDay = 'Sexta';
        break;
  
      case 6:
        weekDay = 'Sábado';
        break;
  
      case 0:
        weekDay = 'Domingo';
        break;
    
      default:
        break;
    }

    const dateExtendend = `${weekDay}, ${dateMonth < 10 ? 0 + dateMonth.toString() : dateMonth}/${month + 1}`;

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
    setHabitsPercentage(((habitsDone.length/habitsClickedDate.length) * 100));

    console.log("habitsClickedDate: ", habitsClickedDate);
    setSelectedDayHistoric({"selectedDate": dateExtendend, "selectedDateHabits": [ ...habitsClickedDate ]});
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

          <DateTitle>
          { selectedDayHistoric !== '' ?
              selectedDayHistoric.selectedDate
            :
            "Nenhum dia foi selecionado"
          }
          </DateTitle>
          <DateSubtitle selectedDayHistoric={selectedDayHistoric}>
            { selectedDayHistoric !== '' ?
                selectedDayHistoric.selectedDateHabits.length > 0 ? 
                  `${habitsPercentage}% dos hábitos completados`
                :
                  "Não há histórico para o dia selecionado"
            : 
              "Nenhum dia foi selecionado"
            }
          </DateSubtitle>

          { selectedDayHistoric !== '' ?
              selectedDayHistoric.selectedDateHabits.length > 0 &&
                selectedDayHistoric.selectedDateHabits.map((currentHabit) => {
                  return(
                    <Fragment key={currentHabit.id}>
                      <ListedHabitContainer habitTitleLength={currentHabit.length}>
                        <HabitDetaisContainer>
                          <HabitTitle>{ currentHabit.name }</HabitTitle>
                        </HabitDetaisContainer>
                
                        <HabitCheckMarkContainer listedHabitDone={currentHabit.done}>
                          <img alt="check.svg" src={Check}/>
                        </HabitCheckMarkContainer>
                      </ListedHabitContainer>
                    </Fragment>
                  );
                })
            :
              ""
          }        
        </Content>
      </Container>
    </Fragment>
  );
}