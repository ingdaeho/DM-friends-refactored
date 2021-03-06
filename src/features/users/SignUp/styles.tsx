import styled from "styled-components";

export const Signup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 140px;
`;

export const Title = styled.span`
  font-size: 35px;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 590px;
  height: 940px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 70px;
`;

export const UpperSectionTitle = styled.span`
  font-size: 26px;
  margin-bottom: 50px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  span {
    font-size: 13px;
  }

  span:nth-child(2) {
    position: relative;
    top: 28px;
    left: 415px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.2);
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 18px;

  :focus {
    outline: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.8);
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
    font-size: 16px;
  }
`;

export const TermTitle = styled.span`
  margin-top: 20px;
  font-size: 14px;
`;

export const TermContainer = styled.ul`
  width: 100%;
  height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;

  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 15px 0px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  span {
    margin-bottom: 10px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
  }

  div {
    .dmFriends {
      font-weight: 800;
    }
  }
`;

export const Error = styled.span`
  color: #e65f3e;
  font-size: 13px;
`;
