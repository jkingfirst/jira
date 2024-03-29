import React, { useState } from "react";
import Login from "pages/unAuthenticatedApp/login/";
import Register from "pages/unAuthenticatedApp/register/";
import { Card, Button } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
// import {Helmet} from 'react-helmet'
import { useDocumentTitle } from "utils/tools";

export default function UnAuthenticatedApp() {
  const [isLogin, setIsLogin] = useState(true);
  const switchLoginOrRegister = () => {
    setIsLogin(!isLogin);
  };
  const [err, setErr] = useState<Error | null>(null);
  useDocumentTitle("注册或登录");
  return (
    <Wrapper>
      {/*<Helmet>*/}
      {/*<title>登录或注册</title>*/}
      {/*</Helmet>*/}
      <Background />
      <ShadowCard>
        <Title>{isLogin ? "请登录" : "请注册"}</Title>
        <Header></Header>
        {isLogin ? <Login /> : <Register />}
        <Button type={"link"} onClick={switchLoginOrRegister}>
          {isLogin ? "去注册" : "去登录"}
        </Button>
      </ShadowCard>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;
export const LongButton = styled(Button)`
  width: 100%;
`;
