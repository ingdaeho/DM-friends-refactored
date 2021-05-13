import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import useInput from "@hooks/useInput";
import * as S from "./styles";
import { loginRequest } from "@features/users/userSlice";
import { RootState } from "@app/rootReducer";

const LogIn = () => {
  const dispatch = useDispatch();
  const { isLoading, error, loginDone } = useSelector((state: RootState) => state.userSlice);
  const [email, setEmail, onChangeEmail] = useInput("");
  const [password, setPassword, onChangePassword] = useInput("");
  const [redirectTo, setRedirectTo] = useState(false);

  const isLoggedIn = sessionStorage.getItem("token");

  useEffect(() => {
    if (error) {
      if (error?.message === "Bad Requests") {
        alert("비밀번호를 확인해주세요");
      } else {
        alert(error.message);
      }
    }
    if (loginDone) {
      alert("로그인 성공");
      setRedirectTo(true);
    }
  }, [error, loginDone]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginRequest({ email, password }));
    },
    [dispatch, email, password],
  );

  if (redirectTo || isLoggedIn) {
    return <Redirect push to="/" />;
  }

  return (
    <S.Login>
      <S.Section>
        <S.Logo>
          <span>동묘앞프렌즈 하나로 충분합니다.</span>
          <span>세계 최고의 거리. 스포티(sporty)함과 캐주얼의 경계를 넘나드는</span>
          <span>과감한 믹스매치 정신을 본받기위해 동묘앞프렌즈가 모였다!</span>
          <img src="images/DM_1.png" alt="loginImage"></img>
        </S.Logo>
        <S.Frame>
          <S.Title>동묘앞프렌즈</S.Title>
          <S.Form onSubmit={onSubmit}>
            <S.Input id="email" type="email" placeholder="이메일주소" onChange={onChangeEmail} />
            <S.Input id="pw" type="password" placeholder="비밀번호" onChange={onChangePassword} />
            <S.CheckBox>
              <input type="checkbox" id="loginCheckbox" />
              <label htmlFor="loginCheckbox">
                <span></span>
                로그인 상태 유지
              </label>
            </S.CheckBox>
            <S.LoginButton style={{ backgroundColor: "#fbdd0d" }}>로그인</S.LoginButton>
            <S.Line>
              <div></div>
              <div>또는</div>
              <div></div>
            </S.Line>
            <S.LoginButton disabled>QR코드 로그인</S.LoginButton>
          </S.Form>
          <S.SignIn>
            <Link to="Signup">회원가입</Link>
            <div>카카오계정 | 비밀번호찾기</div>
          </S.SignIn>
        </S.Frame>
      </S.Section>
      <S.Footer>
        <S.Links>
          <Link to="/">이용약관</Link>
          <Link to="/">개인정보 처리방침</Link>
          <Link to="/">운영정책</Link>
          <Link to="/">고객센터</Link>
          <Link to="/">공지사항</Link>
          <Link to="/">한국어</Link>
        </S.Links>
        <S.Info>
          <span>CopyrightⒸ</span>
          <span>DongMyo Friends.</span>
          <span>All rights reserved.</span>
        </S.Info>
      </S.Footer>
    </S.Login>
  );
};

export default LogIn;
