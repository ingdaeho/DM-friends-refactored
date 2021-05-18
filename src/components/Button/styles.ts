import styled from "styled-components";

type Props = {
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
};

export const Button = styled.button<Props>`
  width: 100%;
  height: 48px;
  border: white;
  border-radius: 5px;
  background-color: ${({ disabled, bgColor }) => (disabled ? "#efefef" : bgColor)};
  color: ${({ textColor }) => textColor};
  font-size: 16px;
  cursor: pointer;
`;
