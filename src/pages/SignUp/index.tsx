import { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import {
  Signup,
  Title,
  Form,
  UpperSectionTitle,
  Label,
  Input,
  TermTitle,
  TermContainer,
  Button,
  Footer,
  Error,
} from "./styles";
import { SIGNUP_REQUEST } from "@store/reducers/users";
import Term from "@pages/SignUp/Term";
import useInput from "@hooks/useInput";
import { terms } from "@typings/db";
import fetcher from "@utils/fetcher";

const SignUp = () => {
  const dispatch = useDispatch();
  const { signupDone, signupError } = useSelector((state) => state.users);

  const shouldFetch = sessionStorage.getItem("token");
  const { data: userData } = useSWR(shouldFetch ? "/users" : null, fetcher);

  const [email, setEmail, onChangeEmail] = useInput("");
  const [nickname, setNickname, onChangeNickname] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [terms, setTerms] = useState<terms[]>([]);
  const [passwordError, setPasswordError] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [redirectTo, setRedirectTo] = useState(false);

  const checkedAll = terms.reduce((result, el) => (result = result && el.checked), true);

  useEffect(() => {
    if (signupDone) {
      alert("가입 완료");
      setRedirectTo(true);
    }
    if (signupError?.message === "duplicated") {
      alert("아이디가 중복됩니다");
    }
  }, [signupDone, signupError]);

  useEffect(() => {
    setTerms(TERMS);
  }, []);

  useEffect(() => {
    if (email && !passwordError && nickname && checkedAll) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [email, passwordError, nickname, terms]);

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
      dispatch({
        type: SIGNUP_REQUEST,
        data: { email, password, confirm_password: password, username: nickname },
      });
    },
    [email, password, nickname],
  );

  if (redirectTo || userData) {
    return <Redirect to="/login" />;
  }

  return (
    <Signup>
      <Title>동묘앞프렌즈</Title>
      <Form onSubmit={onSubmit}>
        <UpperSectionTitle>회원가입</UpperSectionTitle>
        <Label>
          <span>이메일주소</span>
          <Input id="email" type="email" placeholder="이메일 주소 입력" value={email} onChange={onChangeEmail} />
          <div></div>
        </Label>
        <Label style={{ marginTop: 20 }}>
          <span>비밀번호</span>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호(8~32자리)"
            min="8"
            max="32"
            onChange={onChangePassword}
            style={{ marginBottom: 10 }}
          />
          <Input
            id="password-check"
            type="password"
            placeholder="비밀번호 재입력"
            onChange={onChangePasswordCheck}
            style={{ marginBottom: 10 }}
          />
          {passwordError && <Error>비밀번호가 같지 않습니다.</Error>}
        </Label>
        <Label style={{ marginTop: 30 }}>
          <span>닉네임</span>
          <span>{nickname.length}/20</span>
          <Input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
            max="20"
            value={nickname}
            onChange={onChangeNickname}
          />
        </Label>
        <TermTitle>약관 동의</TermTitle>
        <TermContainer>
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
              <Term
                key={index}
                index={index}
                title={terms.title}
                checkedTerms={terms.checked}
                handleCheckedBox={handleCheckedBox}
              />
            );
          })}
        </TermContainer>
        <Button disabled={!formComplete}>회원가입</Button>
      </Form>
      <Footer>
        <span>
          이용약관&nbsp;&nbsp;&nbsp;개인정보&nbsp;&nbsp;&nbsp;처리방침&nbsp;&nbsp;&nbsp;운영정책&nbsp;&nbsp;&nbsp;고객센터&nbsp;&nbsp;&nbsp;공지사항&nbsp;&nbsp;&nbsp;한국어
        </span>
        <div>
          <span>CopyrightⒸ</span>
          <span className="dmFriends">DongMyo Friends.</span>
          <span>All rights reserved.</span>
        </div>
      </Footer>
    </Signup>
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
