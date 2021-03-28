import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
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

const SignUp = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupDone, signupError, me } = useSelector((state) => state.users);

  useEffect(() => {
    if (me && me.id) {
      <Redirect to="/" />;
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signupDone) {
      <Redirect to="/" />;
    }
  }, [signupDone]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  const [email, setEmail, onChangeEmail] = useInput("");
  const [nickname, setNickname, onChangeNickname] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [mismatchError, setMissmatchError] = useState(false);
  const [terms, setTerms] = useState<terms[]>([]);
  const checkedAll = terms.reduce((result, el) => (result = result && el.checked), true);

  useEffect(() => {
    axios
      .get("/data/signup.json")
      .then((res) => {
        setTerms(res.data.policies);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMissmatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMissmatchError(e.target.value !== password);
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
    setTerms(terms);
  }, [terms]);

  const handleCheckedBox = useCallback(
    (index: number) => {
      for (let el of terms) {
        if (el.id === index) {
          el.checked = !el.checked;
        }
      }
      setTerms(terms);
      console.log(terms);
    },
    [terms],
  );

  const onSubmit = useCallback(() => {
    if (mismatchError) {
      return;
    }
    dispatch({
      type: SIGNUP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, nickname]);

  console.log(terms);
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
          {mismatchError && <Error>비밀번호가 같지 않습니다.</Error>}
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
        <Button>다음</Button>
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
