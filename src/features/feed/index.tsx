import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutRequest } from "@features/users/userSlice";
import useSWR, { useSWRInfinite } from "swr";
import fetcher from "@utils/fetcher";
import { useHistory } from "react-router";
import * as S from "./styles";
import { IFeeds } from "./types";

const LIMIT = 5;

const Feed = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const shouldFetch = sessionStorage.getItem("token");
  const { data: userData } = useSWR(shouldFetch ? "/users" : null, fetcher);
  const { data: feedData, size, setSize } = useSWRInfinite((index) => `/feeds?limit=5&page=${index}`, fetcher);

  const feeds = feedData ? feedData.flat() : [];
  const isEmpty = feeds?.length === 0;
  const isReachingEnd = isEmpty || feeds?.length < LIMIT * size;

  const onScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    let scrollBottom = scrollTop + clientHeight;

    if (scrollBottom === scrollHeight && !isReachingEnd) {
      setSize((prevIndex) => prevIndex + 1);
    }
  }, [setSize, isReachingEnd]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [onScroll]);

  const LogInOrOut = useCallback(() => {
    if (userData) {
      dispatch(logoutRequest(userData));
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userData]);

  return (
    <S.WholeContainer>
      <S.Nav>
        <div>{userData?.userInfo.username}</div>
        <button onClick={LogInOrOut}>{userData ? "로그아웃" : "로그인"}</button>
      </S.Nav>
      {feeds.map((feed: IFeeds, idx: number) => {
        return (
          <S.Feeds key={idx}>
            <S.Header>
              <S.CharacterImage src={feed.feed_images?.image_url} />
              <S.CharacterName>
                {feed.characters?.name}
                <p>{feed.created_at?.substring(0, 10)}</p>
              </S.CharacterName>
            </S.Header>
            <S.FeedImage>
              <img src={feed.feed_images?.image_url} alt="feed_image" />
            </S.FeedImage>
            <S.BottomSection>
              <S.ButtonWrapper>
                <div>
                  <button>{feed.isLiked ? "red" : null}좋아요 버튼</button>
                  <button>댓글 버튼</button>
                </div>
                <button>공유하기</button>
              </S.ButtonWrapper>
              <p>{feed.likes?.length} likes</p>
              <S.Content>
                <h3>{feed.title}</h3>
                <p>{feed.contents}</p>
              </S.Content>
              <S.CommentWrapper>
                <div>댓글 {feed.feed_comments ? feed.feed_comments.length : 0}개</div>
                <span>{feed.feed_comments?.[0]?.users.username}</span> <span>{feed.feed_comments?.[0]?.contents}</span>
              </S.CommentWrapper>
            </S.BottomSection>
          </S.Feeds>
        );
      })}
      {isReachingEnd ? "끝입니다" : null}
    </S.WholeContainer>
  );
};

export default Feed;
