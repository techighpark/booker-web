import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import styled from "styled-components";
import { popUpIdVar, popUpVar } from "../../apollo";
import { Post } from "../Feed/Post";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Inner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 40px;
  width: 600px;
  height: 100%;
  max-height: 800px;
  background-color: rgba(0, 0, 0, 0.8);
  button {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`;

const SEE_POST_QUERY = gql`
  query seePost($postId: Int!) {
    seePost(postId: $postId) {
      id
      photo
      user {
        username
        avatar
      }
      book {
        id
        title
        author {
          fullName
        }
      }
      isLiked
      totalLikes
      caption
      hashtags {
        id
        hashtag
      }
      totalComments
      comments {
        id
        payload
        isMine
        user {
          username
          avatar
        }
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const PopupPost = ({ popUp, postId }) => {
  const { data, loading } = useQuery(SEE_POST_QUERY, {
    variables: { postId },
  });
  const onClick = () => {
    popUpVar(false);
  };

  const post = data?.seePost;

  return popUp ? (
    <Container>
      <Inner>
        <button onClick={onClick}>close</button>
        {loading ? "" : <Post {...post} />}
      </Inner>
    </Container>
  ) : (
    ""
  );
};
