import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: ${(props) => props.habitsLoaded ? "fit-content" : "100%"};

  padding-bottom: 120px;

  display: flex;
  justify-content: center;

  background-color: #F2F2F2;
`;

const Content = styled.div`
  width: 90%;
`;

const Date = styled.p`
  padding-top: 100px;

  font-size: 22.976px;
  line-height: 29px;

  color: #126BA5;
`;

const Subtitle = styled.p`
  font-size: 17.976px;
  line-height: 22px;

  margin-bottom: 28px;

  color: ${(props) => props.habitsDone !== 0 ? "#8FC549" : "#BABABA"};
`;

const ListedHabitContainer = styled.div`
  width: 100%;
  height: 94px;
  
  padding: 15px;
  margin-bottom: 10px;

  background-color: #FFFFFF;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HabitTitle = styled.h2`
  font-size: 19.976px;
  line-height: 25px;

  margin-bottom: 7px;

  color: #666666;  
`;

const CurrentSequenceContainer = styled.p`
  font-size: 12.976px;
  line-height: 16px;

  color: #666666;
`;

const HighestSequenceContainer = styled.p`
  font-size: 12.976px;
  line-height: 16px;

  color: #666666;
`;

const CurrentSequence = styled.span`
  color: ${(props) => (props.currentSequenceColor || props.habitDone) ? "#8FC549" : "#666666"};
`;

const HighestSequence = styled.span`
  color: ${(props) => (props.highestSequenceColor || props.habitDone) ? "#8FC549" : "#666666"};
`;

const HabitCheckMarkContainer = styled.div`
  width: 69px;
  height: 69px;

  background-color: ${(props) => props.listedHabitDone ? "#8FC549" : "#EBEBEB"};

  border: 1px solid #E7E7E7;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const components = {
  Container,
  Content,
  Date,
  Subtitle,
  ListedHabitContainer,
  HabitTitle,
  CurrentSequenceContainer,
  HighestSequenceContainer,
  CurrentSequence,
  HighestSequence,
  HabitCheckMarkContainer
};

export default components;