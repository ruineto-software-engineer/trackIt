import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import Style from "./style";
import Plus from "../../assets/img/plus.svg";
import Dump from "../../assets/img/dump.svg";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

export default function Habits({ stageToken }) {
  const { 
    Container, 
    Content, 
    RegisterContent, 
    RegisterForm,
    RegisterFormContent,
    Input,
    Days,
    RegisterFormFooter,
    CancelButton,
    SaveButton,
    Title, 
    Subtitle, 
    Button 
  } = Style;
  const [listHabits, setListHabits] = useState(null);
  const [isListed, setIsListed] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [arrayWeekDays, setArrayWeekDay] = useState([]);
  const [createdHabit, setCreatedHabit] = useState({});
  const [deletedHabit, setDeletedHabit] = useState('');
  const [reloadDays, setReloadDays] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const weekDays = [
    {
      "id": 0,
      "day": "D"
    },
    {
      "id": 1,
      "day": "S"
    },
    {
      "id": 2,
      "day": "T"
    },
    {
      "id": 3,
      "day": "Q"
    },
    {
      "id": 4,
      "day": "Q"
    },
    {
      "id": 5,
      "day": "S"
    },
    {
      "id": 6,
      "day": "S"
    }
  ];

  useEffect(() =>{
    const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', {
      headers: {
        Authorization: `Bearer ${stageToken}`
      }
    });
    promise.then((response) => {
      setListHabits(response.data);
      setReloadDays(false);

      if(response.data.length >= 3){
        setIsListed(true);
      }
    });
    promise.catch((error) => {
      console.log(error.response);
    });
  }, [stageToken, createdHabit, deletedHabit]);

  if(listHabits === null){
    return "";
  }

  function handleCreateHabit(e) {
    e.preventDefault();
    
    if(arrayWeekDays.length === 0){
      alert("Por gentileza, informe os dias de execução do seu hábito e tente novamente.");
      return;
    }

    setIsloading(true);
    const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
    {
      name: habitName,
      days: arrayWeekDays
    },
    {
      headers: {
        Authorization: `Bearer ${stageToken}`
      }
    })

    setTimeout(() => {
      promise.then((response) => {
        alert(`Parabéns! Seu Hábito - ${habitName} foi criado com sucesso, é hora de começar a trackear!`)

        setIsloading(false);
        setCreatedHabit(response.data);
        setHabitName('');
        setArrayWeekDay([]);
        setDisplayForm(false);
        setReloadDays(true);
      });
    }, 3000);
    setTimeout(() => {
      promise.catch((error) => {
        setIsloading(false);
        console.log(error.response);
        alert(`Não foi possível cadastrar o hábito. Erro ${error.response.status}: ${error.response.data.message}`);
      });
    }, 3000);
  }

  function handleDeleteHabit(idHabit, listHabitsLength) {
    if (window.confirm("Você realmente deseja deletar este hábito?")) {
      const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabit}`,
      {
        headers: {
          Authorization: `Bearer ${stageToken}`
        }
      });
      promise.then(() => {
        alert("Hábito deletado com sucesso!");
        setDeletedHabit(idHabit);

        if(listHabitsLength - 1 < 3){
          setIsListed(false);
        }
      });
      promise.catch(() => {
        alert("Não foi possível deletar o hábito!");
      });
    }else{
      return;
    }
  }

  const listHabitsReader = listHabits.map((listHabit) => {
    return(
      <Fragment key={listHabit.id}>
        <ListedHabit 
          habitTitle={listHabit.name} 
          arrayWeekDays={weekDays} 
          habitWeekDays={listHabit.days}
          handleDeleteHabit={() => handleDeleteHabit(listHabit.id, listHabits.length)} 
        />
      </Fragment>
    );
  });

  const weekDaysReader = weekDays.map((weekDay) => {
    return(
      <Fragment key={weekDay.id}>
        <Day 
          currentDay={weekDay.day}
          currentDayId={weekDay.id}
          stageWeekDay={arrayWeekDays}
          setStageWeekDay={setArrayWeekDay}
          stageReloadDays={reloadDays}
        />
      </Fragment>
    );
  });

  return(
    <Fragment>
      <Container stageIsListed={isListed}>
        <Content>
          <RegisterContent>
            <Title>Meus hábitos</Title>
            <Button onClick={() => setDisplayForm(true)}>
              <img alt="plus.svg" src={Plus}/>
            </Button>
          </RegisterContent>

          <RegisterForm onSubmit={handleCreateHabit} stageDisplayForm={displayForm}>
            <RegisterFormContent>
              <Input 
                placeholder="nome do hábito"
                onChange={(e) => setHabitName(e.target.value)}
                value={habitName}
                stageLoading={isLoading} 
                required 
              />
              <Days stageLoading={isLoading}>
                { weekDaysReader }
              </Days>
            </RegisterFormContent>

            <RegisterFormFooter>
              <CancelButton 
                type="button" 
                stageLoading={isLoading} 
                onClick={() => setDisplayForm(false)}
              >Cancelar</CancelButton>
              <SaveButton type="submit" stageLoading={isLoading}>
                {isLoading ?
                  <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
                :
                  "Salvar"
                }
              </SaveButton>
            </RegisterFormFooter>
          </RegisterForm>

          {listHabitsReader.length === 0 ?
            <Subtitle>
              Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
            </Subtitle>
          :
            listHabitsReader
          }
        </Content>
      </Container>
    </Fragment>
  );
}

function Day({ currentDay, currentDayId, stageWeekDay, setStageWeekDay, stageReloadDays }) {
  const {
    StyledDay
  } = Style;
  const [selectDay, setSelectDay] = useState(false);

  useEffect(() => {
    setSelectDay(false);
  }, [stageReloadDays]);

  function handleChangeSelection(currentSelected, currentDaySelected) {
    if(currentSelected === true){
      setSelectDay(false);
      setStageWeekDay(stageWeekDay.filter((weekDay) => {
        return weekDay !== currentDaySelected;
      }));
    }else{
      setSelectDay(true);
      setStageWeekDay([ ...stageWeekDay, currentDaySelected ]);
    }
  }

  return(
    <Fragment>
      <StyledDay onClick={() => handleChangeSelection(selectDay, currentDayId)} stageSelectDay={selectDay}>{ currentDay }</StyledDay>
    </Fragment>
  );
}

function ListedHabit({ habitTitle, arrayWeekDays, habitWeekDays, handleDeleteHabit }) {
  const {
    StyledDay,
    HabitContainer,
    HabitTitle,
    Days
  } = Style;

  const selectedHabitWeekDays = [];
  for (let i = 0; i < arrayWeekDays.length; i++) {
    const arrayWeekDay = arrayWeekDays[i];

    for (let j = 0; j < habitWeekDays.length; j++) {
      const habitWeeKDay = habitWeekDays[j];
      
      if(arrayWeekDay.id === habitWeeKDay){
        selectedHabitWeekDays.push({ ...arrayWeekDay, "selected": true });
      }
    }
    
    if(selectedHabitWeekDays.findIndex(weekDay => weekDay.id === arrayWeekDay.id) === -1) {
      selectedHabitWeekDays.push({ ...arrayWeekDay, "selected": false });
    }
  }

  const habitWeekReader = selectedHabitWeekDays.map((weekDay) => {
    return(
      <Fragment key={weekDay.id}>
        <StyledDay stageSelectDay={weekDay.selected}>{ weekDay.day }</StyledDay>
      </Fragment>
    );
  })

  return(
    <Fragment>
      <HabitContainer>
        <HabitTitle>{habitTitle}</HabitTitle>
        <Days>
          { habitWeekReader }
        </Days>

        <img alt="dump.svg" src={Dump} onClick={handleDeleteHabit} />
      </HabitContainer>
    </Fragment>
  );
}