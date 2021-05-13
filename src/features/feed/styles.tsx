import styled from "styled-components";

export const WholeContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Nav = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 640px;
  margin-bottom: 20px;
`;

export const Feeds = styled.section`
  width: 640px;
  border: 1px solid black;
  margin-bottom: 30px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CharacterImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  border-radius: 70%;
  overflow: hidden;
`;

export const CharacterName = styled.div`
  margin-top: 3px;
  font-size: 16px;
  letter-spacing: -0.25px;
  font-weight: bolder;

  p {
    font-size: 13px;
    line-height: 1.6;
  }
`;

export const FeedImage = styled.section`
  width: 600px;
  height: 600px;
  overflow: hidden;
`;

export const BottomSection = styled.section`
  margin-top: 10px;
`;

export const ButtonWrapper = styled.section`
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.section`
  h3 {
    font-size: 20px;
    margin-top: 12px;
    font-weight: bolder;
    line-height: 1.2;
  }
  p {
    font-size: 14px;
    margin-top: 10px;
    line-height: 1.4;
  }
`;

export const CommentWrapper = styled.section`
  margin-top: 10px;

  div {
    margin-bottom: 5px;
  }
  span {
    :first-of-type {
      font-weight: bold;
    }
  }
`;
