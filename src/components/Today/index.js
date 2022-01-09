import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import dayjs from 'dayjs';
import Style from "./style";
import Topbar from "../Topbar";
import Menu from "../Menu";
import Check from "../../assets/img/check.svg";

export default function Today({ stageToken, stageUserInfo }) {
  const { Container, Content, Date, Subtitle } = Style;
  const [habits, setHabits] = useState(null);
  const [habitsLoaded, setHabitsLoaded] = useState(false);
  const [reloadListedHabits, setRealoadListedHabits] = useState(false);
  const dateMonth = dayjs().date();
  const [month, setMonth] = useState(dayjs().month());
  const [weekDay, setWeekDay] = useState(dayjs().day());

  switch (weekDay) {
    case 1:
      setWeekDay('Segunda');
      break;

    case 2:
      setWeekDay('Terça');
      break;

    case 3:
      setWeekDay('Quarta');
      break;

    case 4:
      setWeekDay('Quinta');
      break;

    case 5:
      setWeekDay('Sexta');
      break;

    case 6:
      setWeekDay('Sábado');
      break;

    case 0:
      setWeekDay('Domingo');
      break;
  
    default:
      break;
  }

  useEffect(() => {
    if(month < 10){
      setMonth(`${month}`);
    }
  }, [month]);
  const [date, setDate] = useState(`${weekDay}, ${dateMonth < 10 ? 0 + dateMonth.toString() : dateMonth}/${month + 1}`);

  useEffect(() => {
    setDate(`${weekDay}, ${dateMonth < 10 ? 0 + dateMonth.toString() : dateMonth}/${month + 1}`);
  }, [weekDay, dateMonth, month])
  
  useEffect(() =>{
    const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', 
    {
      headers: {
        Authorization: `Bearer ${stageToken}`
      }
    });
    promise.then((response) => {
      setHabits(response.data);
      setRealoadListedHabits(false);

      if(response.data.length >= 3){
        setHabitsLoaded(true);
      }
    });
    promise.catch((error) => {
      console.log(error.response);
    });
  }, [stageToken, reloadListedHabits]);
 
  if(habits === null){
    return "";
  }

  const habitsReader = habits.map((habit) => {
    return(
      <Fragment key={habit.id}>
        <ListedHabit
          stageToken={stageToken}
          habitId={habit.id}
          habitTitle={habit.name} 
          habitDone={habit.done}
          habitCurrentSequence={habit.currentSequence} 
          habitHighestSequence={habit.highestSequence} 
          setRealoadListedHabits={setRealoadListedHabits}
        />
      </Fragment>
    );
  });

  return(
    <Fragment>
      <Container habitsLoaded={habitsLoaded}>
        <Topbar img={stageUserInfo.image} />
          <Content>
            <Date>{ date }</Date>
            <Subtitle>
              {habitsReader.length === 0 ?
                `Você não tem nenhum hábito a ser feito hoje. Adicione um hábito na guia de "Hábitos" apresentada no Menu no canto inferior da tela.`
              :
                "Nenhum hábito concluído ainda"
              }
            </Subtitle>
            { habitsReader }
          </Content>
        <Menu />
      </Container>
    </Fragment>
  );
}

function ListedHabit({ 
  stageToken,
  habitId, 
  habitTitle, 
  habitDone, 
  habitCurrentSequence, 
  habitHighestSequence,
  setRealoadListedHabits
}) {
  const { 
    ListedHabitContainer,
    HabitTitle,
    CurrentSequenceContainer,
    HighestSequenceContainer,
    CurrentSequence,
    HighestSequence,
    HabitCheckMarkContainer
  } = Style;
  const [currentSequenceColor, setCurrentSequenceColor] = useState(false);
  const [highestSequenceColor, setHighestSequenceColor] = useState(false);

  function handleHabitDone(habitSituation, habitId, habitCurrentSequence, habitHighestSequence) {
    if(habitSituation === false){
      const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/check`,
      { }, 
      {
        headers: {
          Authorization: `Bearer ${stageToken}`
        }
      });
      promise.then(() => {
        setRealoadListedHabits(true);
        setCurrentSequenceColor(true);

        if(habitCurrentSequence === habitHighestSequence){
          setHighestSequenceColor(true);
        }
      });
      promise.catch((error) => {
        console.log(error.response);
      });
    }else{
      const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/uncheck`,
      { }, 
      {
        headers: {
          Authorization: `Bearer ${stageToken}`
        }
      });
      promise.then(() => {
        setRealoadListedHabits(true);
        setCurrentSequenceColor(false);

        if(habitCurrentSequence === habitHighestSequence){
          setHighestSequenceColor(false);
        }
      })
      promise.catch((error) => {
        console.log(error.response);
      });
    }
  }

  return(
    <Fragment>
      <ListedHabitContainer>
        <div>
          <HabitTitle>{ habitTitle }</HabitTitle>
          <CurrentSequenceContainer>
            Sequência atual: <CurrentSequence currentSequenceColor={currentSequenceColor} habitDone={habitDone}>{ habitCurrentSequence } {(habitCurrentSequence > 1 || habitCurrentSequence === 0) ? "dias" : "dia"}</CurrentSequence>
          </CurrentSequenceContainer>
          <HighestSequenceContainer>
            Seu recorde: <HighestSequence highestSequenceColor={highestSequenceColor} habitDone={habitDone}>{ habitHighestSequence } {(habitHighestSequence > 1 || habitHighestSequence === 0) ? "dias" : "dia"}</HighestSequence>
          </HighestSequenceContainer>
        </div>

        <HabitCheckMarkContainer 
          listedHabitDone={habitDone} 
          onClick={() => handleHabitDone(habitDone, habitId, habitCurrentSequence, habitHighestSequence)}
        >
          <img alt="check.svg" src={Check}/>
        </HabitCheckMarkContainer>
      </ListedHabitContainer>
    </Fragment>
  );
}