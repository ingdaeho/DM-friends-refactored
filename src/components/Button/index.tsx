import * as S from "./styles";

type ButtonProps = {
  bgColor?: string;
  text: string;
  disabled?: boolean;
  textColor?: string;
};

const Button = (props: ButtonProps) => {
  const { bgColor, text, textColor, disabled } = props;

  return (
    <S.Button bgColor={bgColor} textColor={textColor} disabled={disabled}>
      {text}
    </S.Button>
  );
};

export default Button;
