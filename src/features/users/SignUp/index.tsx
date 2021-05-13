import { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";
import { signupRequest } from "@features/users/userSlice";
import Terms from "@features/users/SignUp/Term";
import useInput from "@hooks/useInput";
import { RootState } from "@app/rootReducer";
import { ITerms } from "@features/users/types";

const SignUp = () => {
  const dispatch = useDispatch();
  const { isLoading, error, signupDone } = useSelector((state: RootState) => state.userSlice);

  const [email, setEmail, onChangeEmail] = useInput("");
  const [nickname, setNickname, onChangeNickname] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [terms, setTerms] = useState<ITerms[]>([]);
  const [passwordError, setPasswordError] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [redirectTo, setRedirectTo] = useState(false);

  const isLoggedIn = sessionStorage.getItem("token");
  const checkedAll = terms.reduce((result, el) => (result = result && el.checked), true);

  useEffect(() => {
    setTerms(TERMS);
  }, [isLoggedIn]);

  useEffect(() => {
    if (signupDone) {
      alert("가입 완료");
      setRedirectTo(true);
    }
    if (error?.message === "Request failed with status code 409") {
      alert("아이디가 중복됩니다");
    }
  }, [error, signupDone]);

  useEffect(() => {
    if (email && !passwordError && nickname && checkedAll) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [email, passwordError, nickname, terms, checkedAll]);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setPasswordError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const handleAllCheckedBoxes = useCallback(() => {
    terms.reduce((result, el) => (result = result && el.checked), true)
      ? terms.map((el) => {
          el.checked = false;
          return el;
        })
      : terms.map((el) => {
          el.checked = true;
          return el;
        });
    setTerms([...terms]);
  }, [terms]);

  const handleCheckedBox = useCallback(
    (index: number) => {
      for (let el of terms) {
        if (el.id === index) {
          el.checked = !el.checked;
        }
      }
      setTerms([...terms]);
    },
    [terms],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signupRequest({ email, password, confirm_password: password, username: nickname }));
    },
    [dispatch, email, password, nickname],
  );

  if (redirectTo || isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <S.Signup>
      <S.Title>동묘앞프렌즈</S.Title>
      <S.Form onSubmit={onSubmit}>
        <S.UpperSectionTitle>회원가입</S.UpperSectionTitle>
        <S.Label>
          <span>이메일주소</span>
          <S.Input id="email" type="email" placeholder="이메일 주소 입력" value={email} onChange={onChangeEmail} />
          <div></div>
        </S.Label>
        <S.Label style={{ marginTop: 20 }}>
          <span>비밀번호</span>
          <S.Input
            id="password"
            type="password"
            placeholder="비밀번호(8~32자리)"
            min="8"
            max="32"
            onChange={onChangePassword}
            style={{ marginBottom: 10 }}
          />
          <S.Input
            id="password-check"
            type="password"
            placeholder="비밀번호 재입력"
            onChange={onChangePasswordCheck}
            style={{ marginBottom: 10 }}
          />
          {passwordError && <S.Error>비밀번호가 같지 않습니다.</S.Error>}
        </S.Label>
        <S.Label style={{ marginTop: 30 }}>
          <span>닉네임</span>
          <span>{nickname.length}/20</span>
          <S.Input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
            max="20"
            value={nickname}
            onChange={onChangeNickname}
          />
        </S.Label>
        <S.TermTitle>약관 동의</S.TermTitle>
        <S.TermContainer>
          <li>
            <input type="checkbox" id="checkAllBoxes" checked={checkedAll} onChange={handleAllCheckedBoxes} />
            <label htmlFor="checkAllBoxes">
              <span></span>
              전체동의
            </label>
          </li>
          <div className="formPolicyBar"></div>
          {terms.map((terms, index) => {
            return (
              <Terms
                key={index}
                index={index}
                title={terms.title}
                checkedTerms={terms.checked}
                handleCheckedBox={handleCheckedBox}
              />
            );
          })}
        </S.TermContainer>
        <S.Button disabled={!formComplete}>회원가입</S.Button>
      </S.Form>
      <S.Footer>
        <span>
          이용약관&nbsp;&nbsp;&nbsp;개인정보&nbsp;&nbsp;&nbsp;처리방침&nbsp;&nbsp;&nbsp;운영정책&nbsp;&nbsp;&nbsp;고객센터&nbsp;&nbsp;&nbsp;공지사항&nbsp;&nbsp;&nbsp;한국어
        </span>
        <div>
          <span>CopyrightⒸ</span>
          <span className="dmFriends">DongMyo Friends.</span>
          <span>All rights reserved.</span>
        </div>
      </S.Footer>
    </S.Signup>
  );
};

export default SignUp;

const TERMS = [
  {
    id: 0,
    title: "만 14세 이상입니다.(필수)",
    checked: false,
  },
  {
    id: 1,
    title: "이용약관(필수)",
    checked: false,
  },
  {
    id: 2,
    title: "개인정보처리방침(필수)",
    checked: false,
  },
  {
    id: 3,
    title: "이벤트, 프로모션 알림 메일 및 SMS 수신",
    checked: false,
  },
];
