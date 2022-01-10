import axios from "axios";
import { Fragment, useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Style from "./style";
import Logo from "../../assets/img/logo.svg";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

export default function Login() {
  const { PersistLogin } = useContext(UserContext);
  const { Form, Input, Button, Container, Hyperlink } = Style;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("token") !== null){
      navigate("/today");
    }
  }, [navigate]);

  function handleLogin(e) {
    e.preventDefault();

    setIsloading(true);
    const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', {
      email,
      password
    });
    setTimeout(() => {
      promise.then((response) => {
        setIsloading(false);

        PersistLogin(response.data.image, response.data.token);
        navigate("/today");
      });
    }, 3000);
    setTimeout(() => {
      promise.catch((error) => {
        setIsloading(false);
        alert(`Não foi possível efetuar o login. Erro ${error.response.status}: ${error.response.data.message}`);
      });
    }, 3000);
  }

  return(
    <Fragment>
      <Container>
        <img alt="logo.svg" src={Logo}/>

        <Form onSubmit={handleLogin}>
          <Input 
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            stageLoading={isLoading}
            required
          />
          <Input
            type="password"
            placeholder="senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            stageLoading={isLoading}
            required
          />

          <Button type="submit" stageLoading={isLoading}>
            {isLoading ?
              <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
            :
              "Entrar"
            }
          </Button>
        </Form>

        <Hyperlink to="/register">
          Não tem uma conta? Cadastre-se!
        </Hyperlink>
      </Container>
    </Fragment>
  );
}