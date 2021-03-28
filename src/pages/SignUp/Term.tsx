import { VFC } from "react";

interface Props {
  index: number;
  title: string;
  checkedTerms: boolean;
  handleCheckedBox: (e: any) => void;
}

const Term: VFC<Props> = ({ index, title, checkedTerms, handleCheckedBox }) => {
  return (
    <li>
      <input type="checkbox" checked={checkedTerms} id={`title${index}`} onChange={() => handleCheckedBox(index)} />
      <label htmlFor={`title${index}`}>
        <span></span>
        {title}
      </label>
    </li>
  );
};

export default Term;
