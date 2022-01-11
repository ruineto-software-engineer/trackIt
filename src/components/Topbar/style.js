import styled from "styled-components";

const Container = styled.div`
  display:     
    ${(props) => 
        (props.pathname === "/" || props.pathname === "/register") ? 
          "none" 
      : 
          "initial"
    };
`;

const Header = styled.div`
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 1;

  background: #126BA5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  img{
    margin-left: 18px;
  }
`;

const UserImg = styled.div`
  img{
    width: 51px;
    height: 51px;

    border-radius: 98.5px;

    margin-right: 18px;
  }
`;

const UserConfing = styled.div`
  visibility: ${(props) => props.userConfigDisplay ? "hidden" : "visible"};

  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding-left: 20px;

  background-color: #FFFFFF;

  border-radius: 0 0 10px 10px;

  box-shadow: 0px 4px 4px rgb(0 0 0 / 15%);

  height: 70px;
  width: 180px;

  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 2;

  img{
    height: 25px;

    margin-right: 5px;
  }
`;

const components = {
  Header,
  UserImg,
  Container,
  UserConfing
};

export default components;