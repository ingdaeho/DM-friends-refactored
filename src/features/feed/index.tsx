import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "@features/users/userSlice";
import { useHistory } from "react-router";
import * as S from "./styles";
import { IFeeds } from "./types";
import { RootState } from "@app/rootReducer";
import { addPage, getFeedsStart } from "./feedSlice";
import useIntersectionObserver from "@hooks/useIntersection";

const Feed = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { feeds, isLoading, error } = useSelector((state: RootState) => state.feedSlice);
  const isLoggedIn = sessionStorage.getItem("token");

  console.log(feeds);

  useEffect(() => {
    dispatch(getFeedsStart());
  }, [dispatch]);

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting && !isLoading;

  useEffect(() => {
    if (isVisible) {
      dispatch(addPage());
      dispatch(getFeedsStart());
    }
  }, [dispatch, isVisible]);

  const LogInOrOut = useCallback(() => {
    if (isLoggedIn) {
      dispatch(logoutRequest(isLoggedIn));
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [dispatch, history, isLoggedIn]);

  return (
    <S.WholeContainer>
      <S.Nav>
        <div></div>
        <button onClick={LogInOrOut}>{isLoggedIn ? "로그아웃" : "로그인"}</button>
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
      {isLoading && <div>로딩중..</div>}
      {error && <div>에러 발생</div>}
      <div ref={ref} />
    </S.WholeContainer>
  );
};

export default Feed;
