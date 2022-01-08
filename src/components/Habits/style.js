import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: ${(props) => props.stageIsListed ? "fit-content" : "100%"};
  padding-bottom: 120px;

  display: flex;
  justify-content: center;

  background-color: #F2F2F2;
`;

const Content = styled.div`
  width: 90%;
`;

const RegisterContent = styled.div`
  padding-top: 100px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const RegisterForm = styled.form`
  width: 100%;
  height: 180px;

  margin-top: 20px;
  padding: 18px;

  background: #FFFFFF;
  border-radius: 5px; 
  
  display: ${(props) => props.stageDisplayForm ? "inherit" : "none"};
`;

const RegisterFormContent = styled.div`
  margin-bottom: 29px;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;

  background-color: ${(props) => props.stageLoading ? "#F2F2F2" : "#FFFFFF"};

  pointer-events: ${(props) => props.stageLoading ? "none" : "all"};

  padding: 10px;

  border-radius: 5px;

  border: 1px solid #D5D5D5;

  font-size: 19.976px;
  line-height: 25px;

  color: ${(props) => props.stageLoading ? "#AFAFAF" : "#666666"};

  &::placeholder{
    color: #DBDBDB;
  }
`;

const Days = styled.div`
  margin-top: 8px;

  pointer-events: ${(props) => props.stageLoading ? "none" : "all"};

  display: flex;
  align-items: center;

  gap: 4px;
`;

const StyledDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  padding-bottom: 2px;
  
  background: ${(props) => props.stageSelectDay ? "#CFCFCF" : "#FFFFFF"};
  
  border: ${(props) => props.stageSelectDay ? "1px solid #CFCFCF" : "1px solid #D5D5D5"};
  border-radius: 5px;

  font-size: 19.976px;
  line-height: 25px;
  
  color: ${(props) => props.stageSelectDay ? "#FFFFFF" : "#DBDBDB"};
`;

const RegisterFormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 15px;
`;

const CancelButton = styled.button`
  width: 84px;
  height: 35px;

  pointer-events: ${(props) => props.stageLoading ? "none" : "all"};

  background-color: transparent;

  border-radius: 4.63636px;
  
  font-size: 15.976px;
  line-height: 20px;

  color: #52B6FF;
  
  border: none;
`;

const SaveButton = styled.button`
  width: 84px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${(props) => props.stageLoading ? 0.7 : 1};

  pointer-events: ${(props) => props.stageLoading ? "none" : "all"};
  
  background-color: #52B6FF;

  border-radius: 4.63636px;

  font-size: 15.976px;
  line-height: 20px;

  color: #FFFFFF;

  border: none;
`;

const Title = styled.p`
  font-size: 22.976px;
  line-height: 29px;

  color: #126BA5;
`;

const Subtitle = styled.p`
  margin-top: 28px;

  font-size: 17.976px;
  line-height: 22px;

  color: #BABABA;
`;

const Button = styled.button`
  width: 40px;
  height: 35px;

  border: none;

  background-color: #52B6FF;
  border-radius: 4.63636px;  
`;

const HabitContainer = styled.div`
  width: 100%;
  height: 91px;

  padding: 15px;
  margin: 20px 0 10px 0;

  background: #FFFFFF;
  border-radius: 5px;

  position: relative;

  img{
    width: 15px;

    position: absolute;
    top: 12px;
    right: 12px;
  }
`;

const HabitTitle = styled.h2`
  font-size: 19.976px;
  line-height: 25px;

  color: #666666;
`;

const components = {
  Container,
  Content,
  RegisterContent,
  Input,
  RegisterForm,
  RegisterFormContent,
  Days,
  StyledDay,
  RegisterFormFooter,
  CancelButton,
  SaveButton,
  Title,
  Subtitle,
  Button,
  HabitContainer,
  HabitTitle
};

export default components;