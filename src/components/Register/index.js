import axios from 'axios';
import { Fragment, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Style from "./style";
import Logo from "../../assets/img/logo.svg";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Register() {
  const { Form, Input, Button, Container, Hyperlink } = Style;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsloading] = useState(false);

  function handleRegister(e) {
    e.preventDefault();

    setIsloading(true);
    const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', {
      email,
      name,
      image,
      password
    });
    promise.then(() => {
      setIsloading(false);
      navigate("/");
    });
    promise.catch((error) => {
      setIsloading(false);
      alert(`Não foi possível efetuar o cadastro. Erro ${error.response.status}: ${error.response.data.message}`);
    });
  }

  return(
    <Fragment>
      <Container>
        <img alt="logo.svg" src={Logo}/>

        <Form onSubmit={handleRegister}>
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
          <Input
            type="text"
            placeholder="nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
            stageLoading={isLoading}
            required
          />
          <Input
            type="text"
            placeholder="foto"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            stageLoading={isLoading}
            required
          />

          <Button type="submit" stageLoading={isLoading}>
            {isLoading ?
              <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
            :
              "Cadastrar"
            }
          </Button>
        </Form>

        <Hyperlink to="/">
          Já tem uma conta? Faça login!
        </Hyperlink>
      </Container>
    </Fragment>
  );
}