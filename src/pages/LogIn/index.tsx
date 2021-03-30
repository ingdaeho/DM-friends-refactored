import { useEffect, useCallback, useState } from "react";
import useInput from "@hooks/useInput";
import { Link, Redirect } from "react-router-dom";
import {
  Login,
  Section,
  Logo,
  Frame,
  Title,
  Form,
  Input,
  CheckBox,
  LoginButton,
  Line,
  SignIn,
  Footer,
  Links,
  Info,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "@store/reducers/users";

const LogIn = () => {
  const dispatch = useDispatch();
  const { loginDone, loginError } = useSelector((state) => state.users);
  const [email, setEmail, onChangeEmail] = useInput("");
  const [password, setPassword, onChangePassword] = useInput("");
  const [redirectTo, setRedirectTo] = useState(false);

  useEffect(() => {
    if (loginError) {
      if (loginError?.message === "Bad Requests") {
        alert("비밀번호를 확인해주세요");
      } else {
        alert(loginError.message);
      }
    }
    if (loginDone) {
      alert("로그인 성공");
      setRedirectTo(true);
    }
  }, [loginError, loginDone]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginRequestAction({ email, password }));
    },
    [email, password],
  );

  if (redirectTo) {
    return <Redirect to="/" />;
  }

  return (
    <Login>
      <Section>
        <Logo>
          <span>동묘앞프렌즈 하나로 충분합니다.</span>
          <span>세계 최고의 거리. 스포티(sporty)함과 캐주얼의 경계를 넘나드는</span>
          <span>과감한 믹스매치 정신을 본받기위해 동묘앞프렌즈가 모였다!</span>
          <img src="images/DM_1.png" alt="loginImage"></img>
        </Logo>
        <Frame>
          <Title>동묘앞프렌즈</Title>
          <Form onSubmit={onSubmit}>
            <Input id="email" type="email" placeholder="이메일주소" onChange={onChangeEmail} />
            <Input id="pw" type="password" placeholder="비밀번호" onChange={onChangePassword} />
            <CheckBox>
              <input type="checkbox" id="loginCheckbox" />
              <label htmlFor="loginCheckbox">
                <span></span>
                로그인 상태 유지
              </label>
            </CheckBox>
            <LoginButton style={{ backgroundColor: "#fbdd0d" }}>로그인</LoginButton>
            <Line>
              <div></div>
              <div>또는</div>
              <div></div>
            </Line>
            <LoginButton>QR코드 로그인</LoginButton>
          </Form>
          <SignIn>
            <Link to="Signup">회원가입</Link>
            <div>카카오계정 | 비밀번호찾기</div>
          </SignIn>
        </Frame>
      </Section>
      <Footer>
        <Links>
          <Link to="/">이용약관</Link>
          <Link to="/">개인정보 처리방침</Link>
          <Link to="/">운영정책</Link>
          <Link to="/">고객센터</Link>
          <Link to="/">공지사항</Link>
          <Link to="/">한국어</Link>
        </Links>
        <Info>
          <span>CopyrightⒸ</span>
          <span>DongMyo Friends.</span>
          <span>All rights reserved.</span>
        </Info>
      </Footer>
    </Login>
  );
};

export default LogIn;
