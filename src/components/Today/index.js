import axios from "axios";
import { Fragment, useState, useEffect, useContext } from "react";
import TokenContext from "../../contexts/TokenContext";
import PercentageContext from "../../contexts/PercentageContext";
import dayjs from 'dayjs';
import ptBr from "dayjs/locale/pt-br";
import Style from "./style";
import Check from "../../assets/img/check.svg";

export default function Today() {
  const { Container, Content, Date, Subtitle } = Style;
  const { token } = useContext(TokenContext);
  const { percentage, setPercentage } = useContext(PercentageContext);
  const [habits, setHabits] = useState(null);
  const [habitsLoaded, setHabitsLoaded] = useState(false);
  const [reloadListedHabits, setRealoadListedHabits] = useState(false);

  let dateMonth = dayjs().date();
  let month = dayjs().month() + 1;
  let weekDay = dayjs().day();
  let weekDayExtended = dayjs(weekDay).locale(ptBr).format('dddd').replace("-feira", "");

  if(dateMonth < 10){
    dateMonth = 0 + dateMonth.toString();
  }
  
  if(month < 10){
    month = 0 + month.toString();
  }

  const [date, setDate] = useState(`${weekDayExtended}, ${dateMonth}/${month}`);
  useEffect(() => {
    setDate(`${weekDayExtended}, ${dateMonth}/${month}`);
  }, [weekDay, weekDayExtended, dateMonth, month])
  
  useEffect(() =>{
    const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    promise.then((response) => {
      setHabits(response.data);
      setRealoadListedHabits(false);

      const habitsDone = response.data.filter((habit) => {
        return habit.done === true;
      })
      setPercentage(((habitsDone.length/response.data.length) * 100));

      if(response.data.length >= 3){
        setHabitsLoaded(true);
      }
    });
    promise.catch((error) => {
      console.log(error.response);
    });
  }, [token, reloadListedHabits, percentage, setPercentage]);
 
  if(habits === null){
    return "";
  }

  const habitsReader = habits.map((habit) => {
    return(
      <Fragment key={habit.id}>
        <ListedHabit
          token={token}
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

  const habitsDone = habits.filter((habit) => {
    return habit.done === true;
  })

  let habitsCompleted = ((habitsDone.length/habitsReader.length) * 100);

  return(
    <Fragment>
      <Container habitsLoaded={habitsLoaded}>
        <Content>
          <Date>{ date }</Date>
          <Subtitle habitsDone={habitsDone.length}>
            {habitsReader.length === 0 ?
              `Você não tem nenhum hábito a ser feito hoje. Adicione um hábito na guia de "Hábitos" apresentada no Menu no canto inferior da tela.`
            :
              habitsDone.length === 0 ?
                "Nenhum hábito concluído ainda"
              :
                `${habitsCompleted.toFixed(0)}% dos hábitos concluídos`
            }
          </Subtitle>
          { habitsReader }
        </Content>
      </Container>
    </Fragment>
  );
}

function ListedHabit({ 
  token,
  habitId, 
  habitTitle, 
  habitDone, 
  habitCurrentSequence, 
  habitHighestSequence,
  setRealoadListedHabits
}) {
  const { 
    ListedHabitContainer,
    HabitDetaisContainer,
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
      <ListedHabitContainer habitTitleLength={habitTitle.length}>
        <HabitDetaisContainer>
          <HabitTitle>{ habitTitle }</HabitTitle>
          <CurrentSequenceContainer>
            Sequência atual: <CurrentSequence currentSequenceColor={currentSequenceColor} habitDone={habitDone}>{ habitCurrentSequence } {(habitCurrentSequence > 1 || habitCurrentSequence === 0) ? "dias" : "dia"}</CurrentSequence>
          </CurrentSequenceContainer>
          <HighestSequenceContainer>
            Seu recorde: <HighestSequence highestSequenceColor={highestSequenceColor} habitDone={habitDone}>{ habitHighestSequence } {(habitHighestSequence > 1 || habitHighestSequence === 0) ? "dias" : "dia"}</HighestSequence>
          </HighestSequenceContainer>
        </HabitDetaisContainer>

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