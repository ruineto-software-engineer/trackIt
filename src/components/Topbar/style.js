import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  left: 0px;
  top: 0px;

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

const components = {
  Header,
  UserImg
};

export default components;