import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "@store/reducers/users";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { useHistory } from "react-router";

const Feed = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const shouldFetch = sessionStorage.getItem("token");
  const { data: userData } = useSWR(shouldFetch ? "/users" : null, fetcher);

  const LogInOrOut = useCallback(() => {
    if (userData) {
      dispatch(logoutRequestAction());
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [userData]);

  return (
    <div>
      <div>{userData?.userInfo.username}</div>
      <button onClick={LogInOrOut}>{userData ? "로그아웃" : "로그인"}</button>
    </div>
  );
};

export default Feed;
