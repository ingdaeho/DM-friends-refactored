import { FC, memo } from "react";
import Checkbox from "@components/Checkbox";

interface Props {
  index: number;
  title: string;
  checkedTerms: boolean;
  handleCheckedBox: (e: any) => void;
}

const Term: FC<Props> = ({ index, title, checkedTerms, handleCheckedBox }) => {
  return (
    <li>
      <Checkbox
        id={`term ${index}`}
        checked={checkedTerms}
        onChange={() => handleCheckedBox(index)}
        labelText={title}
      />
    </li>
  );
};

export default memo(Term);
