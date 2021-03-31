import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoRequstAction, logouRequestAction } from "@store/reducers/users";
import { Redirect } from "react-router";

const Feed = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      dispatch(userInfoRequstAction());
    }
  }, []);

  const LogOut = useCallback(() => {
    dispatch(logouRequestAction());
  }, []);

  if (!userData) {
    return <Redirect to="login" />;
  }

  return (
    <div>
      <button onClick={LogOut}>로그아웃</button>
    </div>
  );
};

export default Feed;
