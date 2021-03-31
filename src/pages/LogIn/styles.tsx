import styled from "styled-components";

export const Login = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 110px 0;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  height: 580px;
  padding: 60px 0;
  margin-right: 90px;

  span:first-child {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 10px;
  }

  span:nth-child(2),
  span:nth-child(3) {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 5px;
  }
  img {
    width: 520px;
    height: 320px;
    margin-top: 10px;
  }
`;

export const Frame = styled.div`
  width: 480px;
  height: 580px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 60px 70px;
`;

export const Title = styled.p`
  font-size: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  font-size: 18px;
  cursor: pointer;

  :focus {
    outline: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.8);
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
    font-size: 16px;
    letter-spacing: 0px;
  }
`;

export const CheckBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;

  input {
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    font-size: 18px;
    cursor: pointer;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + label {
    color: rgba(0, 0, 0, 0.8);
    font-size: 14px;
  }

  input[type="checkbox"] + label span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 100%;
    vertical-align: middle;
    margin: -2px 10px 0 0;
    background: white;
    cursor: pointer;
  }

  input[type="checkbox"]:checked + label span {
    width: 16px;
    height: 6px;
    border-radius: 100%;
    background: white;
    border: 6px solid #fbdd0d;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 48px;
  border: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  :disabled {
    color: inherit;
    background-color: #efefef;
  }
`;

export const Line = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  div {
    margin: 0;
    :first-child,
    :last-child {
      width: 10em;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.1);
    }

    :nth-child(2) {
      width: 10%;
      margin-left: 10px;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;

export const SignIn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  a,
  div {
    text-decoration: none;
    font-size: 12.5px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 300px;
  margin-top: 100px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
`;

export const Links = styled.div`
  margin: 25px 0;

  a {
    text-decoration: none;
    margin-right: 20px;
    font-size: 12.5px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);

    :nth-child(2) {
      font-weight: 700;
      color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export const Info = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  span {
    :nth-child(2) {
      margin: 0 5px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;
