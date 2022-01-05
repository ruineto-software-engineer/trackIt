import { Fragment, useState } from "react";
import Style from "./style";
import Logo from "../../assets/img/logo.svg";

export default function Login() {
  const { Form, Container, Hyperlink } = Style;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e) {
    e.preventDefault();
  }

  return(
    <Fragment>
      <Container>
        <img alt="logo.svg" src={Logo}/>

        <Form onSubmit={handleLogin}>
          <input 
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button type="submit">Entrar</button>
        </Form>

        <Hyperlink to="/register">
          Não tem uma conta? Cadastre-se!
        </Hyperlink>
      </Container>
    </Fragment>
  );
}