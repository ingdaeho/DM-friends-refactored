import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutRequest } from "@store/reducers/users";
import useSWR, { useSWRInfinite } from "swr";
import fetcher from "@utils/fetcher";
import { useHistory } from "react-router";
import {
  WholeContainer,
  Nav,
  Feeds,
  Header,
  CharacterImage,
  CharacterName,
  FeedImage,
  BottomSection,
  ButtonWrapper,
  Content,
  CommentWrapper,
} from "./styles";
import { feeds } from "@typings/db";

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
    <WholeContainer>
      <Nav>
        <div>{userData?.userInfo.username}</div>
        <button onClick={LogInOrOut}>{userData ? "로그아웃" : "로그인"}</button>
      </Nav>
      {feeds.map((feed: feeds, idx: number) => {
        return (
          <Feeds key={idx}>
            <Header>
              <CharacterImage src={feed.feed_images?.image_url} />
              <CharacterName>
                {feed.characters?.name}
                <p>{feed.created_at?.substring(0, 10)}</p>
              </CharacterName>
            </Header>
            <FeedImage>
              <img src={feed.feed_images?.image_url} alt="feed_image" />
            </FeedImage>
            <BottomSection>
              <ButtonWrapper>
                <div>
                  <button>{feed.isLiked ? "red" : null}좋아요 버튼</button>
                  <button>댓글 버튼</button>
                </div>
                <button>공유하기</button>
              </ButtonWrapper>
              <p>{feed.likes?.length} likes</p>
              <Content>
                <h3>{feed.title}</h3>
                <p>{feed.contents}</p>
              </Content>
              <CommentWrapper>
                <div>댓글 {feed.feed_comments ? feed.feed_comments.length : 0}개</div>
                <span>{feed.feed_comments?.[0]?.users.username}</span> <span>{feed.feed_comments?.[0]?.contents}</span>
              </CommentWrapper>
            </BottomSection>
          </Feeds>
        );
      })}
      {isReachingEnd ? "끝입니다" : null}
    </WholeContainer>
  );
};

export default Feed;
