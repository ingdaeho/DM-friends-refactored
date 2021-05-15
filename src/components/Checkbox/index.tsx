import React, { FC, memo } from "react";
import * as S from "./styles";

interface CheckboxProps {
  id: string | number;
  labelText?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { id, labelText, checked, onChange } = props;

  return (
    <S.SelectedItem>
      <input type="checkbox" id={`checkBox${id}`} checked={checked} onChange={onChange} />
      <label htmlFor={`checkBox${id}`}>
        <span></span>
      </label>
      {labelText}
    </S.SelectedItem>
  );
};

export default memo(Checkbox);
