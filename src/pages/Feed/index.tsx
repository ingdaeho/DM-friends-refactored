import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_INFO_REQUEST } from "@store/reducers/users";
const Feed = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch({ type: USER_INFO_REQUEST });
  }, []);

  console.log(userData);
  return (
    <div>
      <button>로그아웃</button>
    </div>
  );
};

export default Feed;
