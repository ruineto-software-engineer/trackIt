import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/br';
import Style from "./style";
import Topbar from "../Topbar";
import Menu from "../Menu";

export default function Today({ stageToken, stageUserInfo }) {
  const { Container, Content, Date, Progress } = Style;
  const [habits, setHabits] = useState(null);
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

    case 7:
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
  const date = `${weekDay}, ${dateMonth < 10 ? 0 + dateMonth.toString() : dateMonth}/${month + 1}`;
  
  useEffect(() =>{
    const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', {
      headers: {
        Authorization: `Bearer ${stageToken}`
      }
    });
    promise.then((response) => {
      setHabits(response.data);
    });
    promise.catch((error) => {
      console.log(error.response);
    });
  }, [stageToken]);
 
  if(habits === null){
    return "";
  }

  const habitsReader = habits.map((habit) => {
    return(
      <Fragment key={habit.id}>
        {habit.id}
      </Fragment>
    );
  });

  return(
    <Fragment>
      <Container>
        <Topbar img={stageUserInfo.image} />
          <Content>
            <Date>{ date }</Date>
            <Progress>
              {habitsReader.length === 0 ?
                `Você não tem nenhum hábito cadastrado ainda. Adicione um hábito na guia de "Hábitos" apresentada no Menu no canto inferior da tela.`
              :
                "Nenhum hábito concluído ainda"
              }
            </Progress>
            { habitsReader }
          </Content>
        <Menu />
      </Container>
    </Fragment>
  );
}