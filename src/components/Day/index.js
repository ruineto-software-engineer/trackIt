import { Fragment, useContext } from "react";
import DayContext from "../../contexts/DayContext";
import Check from "../../assets/img/check.svg";
import Style from "./style";

export default function Day() {
  const { 
    Container, 
    Content,
    DateTitle, 
    DateSubtitle,
    ListedHabitContainer,
    HabitDetaisContainer,
    HabitTitle,
    HabitCheckMarkContainer,
    NoCheck
  } = Style;
  const { day } = useContext(DayContext);

  console.log(day.percentageCompletedHabits);

  return(
    <Fragment>
      <Container dayContent={day}>
        <Content>
          <DateTitle>
            { day !== '' ?
                day.selectedDate
              :
                "Nenhum dia foi selecionado"
            }
          </DateTitle>
          <DateSubtitle selectedDayHistoric={day} habitsPercentage={day.percentageCompletedHabits}>
            { day !== '' ?
                day.selectedDateHabits.length > 0 ? 
                  `${day.percentageCompletedHabits}% dos hábitos completados`
                :
                  "Não há histórico para o dia selecionado"
              : 
                "Nenhum dia foi selecionado"
            }
          </DateSubtitle>

          { day !== '' ?
              day.selectedDateHabits.length > 0 &&
                day.selectedDateHabits.map((currentHabit) => {
                  return(
                    <Fragment key={currentHabit.id}>
                      <ListedHabitContainer habitTitleLength={currentHabit.length}>
                        <HabitDetaisContainer>
                          <HabitTitle>{ currentHabit.name }</HabitTitle>
                        </HabitDetaisContainer>
                
                        <HabitCheckMarkContainer listedHabitDone={currentHabit.done}>
                          { currentHabit.done === true ?
                            <img alt="check.svg" src={Check}/>
                          :
                            <NoCheck>X</NoCheck>
                          }
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